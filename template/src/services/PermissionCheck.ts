import React from 'react'
import { Platform, Text } from 'react-native'
import {
  check,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions'

import logger from '@/infrastructures/common/logger'
import i18n from '@/locales/i18n'
import Dialogs from '@/services/Dialogs'

export type PermissionResult = PermissionStatus

const LocationPermission = Platform.OS === 'ios' ?
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE :
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
const CameraPermission = Platform.OS === 'ios' ?
  PERMISSIONS.IOS.CAMERA :
  PERMISSIONS.ANDROID.CAMERA
const PhotoPermission = Platform.OS === 'ios' ?
  PERMISSIONS.IOS.PHOTO_LIBRARY :
  Platform.OS === 'android' && Platform.Version >= 33 ?
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

export interface IPermissionCheckCallbacks {
  onBlockedPermissionSetting: () => void|Promise<void>
  onAllowPermissionRequest: (result: PermissionResult) => void|Promise<void>
  onCancelPermissionRequest: () => void|Promise<void>
  onUnavailablePermissionSetting: () => void|Promise<void>
}

export type PermissionType = 'location'|'camera'|'photo'|'push_notification'


class PermissionCheck {

  private static _getPermissionName = (type: PermissionType) => {
    switch (type) {
      case 'location':
        return LocationPermission
      case 'camera':
        return CameraPermission
      case 'photo':
        return PhotoPermission
    }
  }
  static checkPermission = async (type: PermissionType, explain: boolean, callbacks: IPermissionCheckCallbacks) => {
    return new Promise<PermissionStatus>((resolve) => {
      const permissions = this._getPermissionName(type)
      if (permissions === undefined) {
        void callbacks.onUnavailablePermissionSetting()

        return
      }
      void check(permissions).then((result) => {
        logger.log(`checkForPermission ${type} - ${permissions}`, result)
        switch (result) {
          case RESULTS.LIMITED:
            void callbacks.onAllowPermissionRequest(result)
            break
          case RESULTS.GRANTED:
            void callbacks.onAllowPermissionRequest(result)
            break
          case RESULTS.UNAVAILABLE:
            this._explainToUnavailablePermissionRequest(type, result, callbacks)
            break
          case RESULTS.BLOCKED:
            if (explain) this._explainToBlockedPermissionRequest(type, result, callbacks)
            break
          case RESULTS.DENIED:
            if (explain) {
              this._explainToShowPermissionRequest(type, callbacks)
            } else {
              void this._requestPermissionCb(type, callbacks)
            }
            break
        }
      })
    })
  }

  private static _explainToUnavailablePermissionRequest = (type: PermissionType, result: PermissionStatus, callbacks: IPermissionCheckCallbacks) => {
    Dialogs.confirm({
      clickBackdropDismiss: false,
      title: `${i18n.t('permission:'+type.toString()+'.permission_request_title_'+Platform.OS)}`,
      content: `${i18n.t('permission:'+type.toString()+'.permission_blocked_'+Platform.OS)}`,
      confirmText: `${i18n.t('permission:permission_setting')}`,
      onCancel: () => {
        void callbacks.onCancelPermissionRequest()
      },
      onConfirm: () => {
        void callbacks.onUnavailablePermissionSetting()
      },
    })
  }

  private static _explainToBlockedPermissionRequest = (type: PermissionType, result: PermissionStatus, callbacks: IPermissionCheckCallbacks) => {
    Dialogs.confirm({
      clickBackdropDismiss: false,
      title: `${i18n.t('permission:'+type.toString()+'.permission_request_title_'+Platform.OS)}`,
      content: `${i18n.t('permission:'+type.toString()+'.permission_blocked_'+Platform.OS)}`,
      confirmText: `${i18n.t('permission:permission_setting')}`,
      onCancel: () => {
        logger.log('explainToBlockedPermissionRequest onCancel')
        void callbacks.onCancelPermissionRequest()
      },
      onConfirm: () => {
        logger.log('explainToBlockedPermissionRequest onConfirm')
        void callbacks.onBlockedPermissionSetting()
      },
    })
  }

  private static _explainToShowPermissionRequest = (type: PermissionType, callbacks: IPermissionCheckCallbacks) => {
    logger.log('explainToShowPermissionRequest')
    Dialogs.confirm({
      clickBackdropDismiss: false,
      title: `${i18n.t('permission:'+type.toString()+'.permission_request_title_'+Platform.OS)}`,
      content: `${i18n.t('permission:'+type.toString()+'.permission_request_message_'+Platform.OS)}`,
      onCancel: () => {
        logger.log('explainToShowPermissionRequest onCancel')
        void callbacks.onCancelPermissionRequest()
      },
      onConfirm: () => {
        logger.log('explainToShowPermissionRequest onConfirm')
        void this._requestPermissionCb(type, callbacks)
      },
    })
  }

  private static _requestPermissionCb = async (type: PermissionType, callbacks: IPermissionCheckCallbacks) => {
    const result = await this._requestPermission(type)
    void callbacks.onAllowPermissionRequest(result)
  }

  private static _requestPermission = async (type: PermissionType) => {
    const permission = this._getPermissionName(type)
    if (permission === undefined) {

      return RESULTS.UNAVAILABLE
    }
    const result = await request(permission, {
      title: i18n.t('permission:'+type.toString()+'.permission_request_title_'+Platform.OS),
      message: i18n.t('permission:'+type.toString()+'.permission_request_message_'+Platform.OS),
      buttonPositive: i18n.t('general:button.confirm'),
      buttonNegative: `${i18n.t('general:button.cancel')}`,
    })

    logger.log(`requestPermission ${type} result ${result}`)

    return result
  }


  /*
  static checkLocationPermission = async (explain: boolean, callbacks: IPermissionCheckCallbacks) => {
    return new Promise<PermissionStatus>((resolve) => {

      void check(LocationPermission).then((result) => {
        logger.log(`checkForLocationPermission ${result}`, explain)
        switch (result) {
          case RESULTS.GRANTED:
            break
          case RESULTS.UNAVAILABLE:
            // user disable feature
            this.explainToUnavailableLocationPermissionRequest(result, callbacks)
            break
          case RESULTS.BLOCKED:
            // ask user to enable on setting
            if (explain) this.explainToBlockedLocationPermissionRequest(result, callbacks)
            break
          case RESULTS.DENIED:
            // request for permission
            // result = await requestPermission(permissionToRequest);
            if (explain) {
              this.explainToShowLocationPermissionRequest(callbacks)
            } else {
              void this.requestLocationPermissionCb(callbacks)
            }
            break
        }
        resolve(result)
      })
    })
  }

  static explainToUnavailableLocationPermissionRequest = (result: PermissionStatus, callbacks: IPermissionCheckCallbacks) => {
    logger.log('explainToUnavailableLocationPermissionRequest result', result)
    Dialogs.confirm({
      clickBackdropDismiss: false,
      title: `${i18n.t('permission:location_permission_request_title_'+Platform.OS)}`,
      content: `${i18n.t('permission:location_permission_blocked_'+Platform.OS)}`,
      confirmText: `${i18n.t('permission:permission_setting')}`,
      onCancel: () => {
        void callbacks.onUnavailablePermissionSetting()
      },
      onConfirm: () => {
        void callbacks.onCancelPermissionRequest()
      },
    })
  }

  static explainToBlockedLocationPermissionRequest = (result: PermissionStatus, callbacks: IPermissionCheckCallbacks) => {
    logger.log('explainToBlockedLocationPermissionRequest result', result)
    Dialogs.confirm({
      clickBackdropDismiss: false,
      title: `${i18n.t('permission:location_permission_request_title_'+Platform.OS)}`,
      content: `${i18n.t('permission:location_permission_blocked_'+Platform.OS)}`,
      confirmText: `${i18n.t('permission:permission_setting')}`,
      onCancel: () => {
        void callbacks.onBlockedPermissionSetting()
      },
      onConfirm: () => {
        void callbacks.onCancelPermissionRequest()
      },
    })
  }

  static explainToShowLocationPermissionRequest = (callbacks: IPermissionCheckCallbacks) => {
    Dialogs.confirm({
      clickBackdropDismiss: false,
      title: `${i18n.t('permission:location_permission_request_title_'+Platform.OS)}`,
      content: `${i18n.t('permission:location_permission_request_message_'+Platform.OS)}`,
      onCancel: () => {
        void callbacks.onCancelPermissionRequest()
      },
      onConfirm: () => {
        void this.requestLocationPermissionCb(callbacks)
      },
    })
  }

  static requestLocationPermissionCb = async (callbacks: IPermissionCheckCallbacks) => {
    const result = await this.requestLocationPermission()
    void callbacks.onAllowPermissionRequest(result)
  }

  static requestLocationPermission = async () => {
    const result = await request(LocationPermission, {
      title: i18n.t('permission:location_permission_request_title_'+Platform.OS),
      message: i18n.t('permission:location_permission_request_message_'+Platform.OS),
      buttonPositive: i18n.t('general:button.confirm'),
      buttonNegative: `${i18n.t('general:button.cancel')}`,
    })

    logger.log(`requestPermission result ${result}`)

    return result
   }
   */
}

export default PermissionCheck

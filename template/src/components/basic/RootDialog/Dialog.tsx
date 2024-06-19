/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BackHandler, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import DialogManager, {
  Dialog as RootDialog,
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from '@/components/basic/RootDialog'
import logger from '@/infrastructures/common/logger'
import i18n from '@/locales/i18n'

interface IDialogAction {
  label: string
  onPress: () => void
  buttonStyle?: ViewStyle
  textStyle?: TextStyle
  isCancel?: boolean
}
interface IDialogShowConfig {
  title?: string
  content: string | React.ReactElement
  actions?: IDialogAction[]
  clickBackdropDismiss?: boolean
}
interface IDialogConfirmConfig extends Omit<IDialogShowConfig, 'actions'> {
  confirmText?: string
  onConfirm?: () => void
  onCancel?: () => void
}
interface IDialogInfoConfig extends Omit<IDialogShowConfig, 'actions'> {
  confirmText?: string
  onConfirm?: () => void
}

interface IDialogApiErrorConfig {
  title?: string
  message: string
  onCancel?: () => void
  allowRetry: boolean
  onRetry?: () => unknown
}

export const confirm = ({
  clickBackdropDismiss,
  confirmText,
  content,
  onCancel,
  onConfirm,
  title,
}: IDialogConfirmConfig) => {
  logger.log('confirm dialog called')
  const { t } = i18n
  const e = BackHandler.addEventListener('hardwareBackPress', () => {
    return true
  })
  show({
    title,
    content,
    clickBackdropDismiss,
    actions: [
      {
        label: t('general:button.cancel'),
        onPress: () => {
          DialogManager.dismiss()
          onCancel?.()
          e?.remove()
        },
        isCancel: true,
      },
      {
        label: confirmText || t('general:button.confirm'),
        onPress: () => {
          DialogManager.dismiss(() => {onConfirm?.()})
          e?.remove()
        },
      },
    ],
  })
}

export const info = ({ clickBackdropDismiss, confirmText, content, onConfirm, title }: IDialogInfoConfig) => {
  const { t } = i18n
  const e = BackHandler.addEventListener('hardwareBackPress', () => {
    return true
  })
  show({
    title,
    content,
    clickBackdropDismiss,
    actions: [
      // {
      //   label: t('general:button.cancel'),
      //   onPress: () => {
      //     DialogManager.dismiss()
      //     onCancel?.()
      //   },
      //   isCancel: true,
      // },
      {
        label: confirmText || t('general:button.confirm'),
        onPress: () => {
          logger.log('info dialog pressed confirm')
          DialogManager.dismiss()
          onConfirm?.()
          e?.remove()
        },
      },
    ],
  })
}

export const apiError = ({ allowRetry, message, onCancel, onRetry, title }: IDialogApiErrorConfig) => {
  const { t } = i18n
  const e = BackHandler.addEventListener('hardwareBackPress', () => {
    return true
  })
  const actions: IDialogAction[] = [
    {
      label: t('general:button.cancel'),
      onPress: () => {
        DialogManager.dismiss()
        onCancel?.()
        e?.remove()
      },
      isCancel: true,
    },
  ]
  if (allowRetry) {
    actions.push({
      label: t('general:button.retry'),
      onPress: () => {
        DialogManager.dismiss()
        onRetry?.()
        e?.remove()
      },
    })
  }
  show({
    title: title,
    content: message,
    clickBackdropDismiss: false,
    actions,
  })
}

export const show = ({ actions, clickBackdropDismiss, content, title }: IDialogShowConfig, callback: () => void = () => { }) => {
  const titleElement = title !== undefined ?
    <DialogTitle
      title={title}
    /> :
    undefined

  const contentElement = typeof content === 'string' ? (
    <Text>
      {content}
    </Text>
  ) : content

  const onClickBackdrop = () => {
    if (clickBackdropDismiss) {
      DialogManager.dismiss()
    }
  }

  let footerElement
  if (actions !== undefined && actions.length > 0) {
    footerElement = (
      <DialogFooter
        style={{
          padding: 10,
          justifyContent: 'flex-end',
        }}
      >
        {actions.map(({ buttonStyle= {}, isCancel, label, onPress, textStyle }, index) => {
          const _buttonStyle = Object.assign(buttonStyle, index > 0 ? { marginLeft: 10 } : {})

          return (
            <DialogButton
              key={`button${index}`}
              // label={label}
              // mode={'contained'}
              // onPress={onPress}
              // labelStyle={{
              //   // color: '#000',
              // }}
              isCancel={isCancel}
              text={label}
              onPress={() => {
                onPress()
              }}
              type={'round'}
              textStyle={textStyle}
              style={_buttonStyle}
            />
          )
        })}
      </DialogFooter>
    )
  }

  DialogManager.show({
    width: 0.8,
    visible: true,
    modalTitle: titleElement,
    children: (
      <DialogContent>
        {contentElement}
      </DialogContent>
    ),
    footer: footerElement,
    onTouchOutside: onClickBackdrop,
  }, () => {
    // callback on show
  })
}

export const dismiss = (callback: () => void|Promise<void> = () => { }) => {
  DialogManager.dismiss(() => {
    // dismiss callback
    void callback()
  })
}

export const dismissAll = (callback: () => void |Promise<void>= () => { }) => {
  DialogManager.dismissAll(() => {
    // dismiss callback
    void callback()
  })
}

const Dialog = {
  confirm,
  info,
  show,
  dismiss,
  dismissAll,
  apiError,
}

export default Dialog

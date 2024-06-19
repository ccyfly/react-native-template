import * as momont from 'moment'
import React from 'react'
import RootSiblings from 'react-native-root-siblings'

import logger from '@/infrastructures/common/logger'
import Timeout from '@/infrastructures/common/Timeout'

import { BaseDialog, Handle as Dialog } from './components/BaseDialog'
// import Dialog from './Dialog';
import type { DialogProps } from './type'

const DESTROY_TIMEOUT: number = 500


class Manager {

  dialogs: RootSiblings[]
  dialogsRef: Dialog[]
  constructor() {
    this.dialogs = []
    this.dialogsRef = []
  }

  get currentDialog() {
    return this.dialogs[this.dialogs.length - 1]
  }

  addRef = (ref: Dialog) => {
    this.dialogsRef.push(ref)
  }

  add = (props: DialogProps, callback: () => void): void => {

    const dialog = new RootSiblings(
      <BaseDialog
        ref={(ref) => {
          if (ref) {
            this.addRef(ref)
          }
        }}
        {...props}
      />,
      callback)
    // dialog.id = momont().getTimestamp()
    this.dialogs.push(dialog)
  }

  destroy(): void {
    const dialog = this.dialogs.pop()
    logger.log('destroy dialog')
    setTimeout(() => {
      dialog?.destroy()
    }, DESTROY_TIMEOUT)
  }

  onDialogDismissed = (onDismissed: () => void = () => {}): void => {
    onDismissed()
    this.destroy()
  }

  update = (props: DialogProps, callback: () => void = () => {}): void => {
    this.currentDialog.update(
      (
        <BaseDialog
          {...props}
        />
      ),
      callback,
    )
  }

  show = (props: DialogProps, callback: () => void = () => {}): void => {
    this.add({
      ...props,
      visible: true,
    }, callback)
  }

  dismiss = (callback: () => void = () => {}): void => {
    // this.update({
    //   visible: false,
    // }, callback);
    logger.log('dialogmanager dismiss')
    const d = this.dialogsRef.pop()
    const onDismissed = () => {
      this.destroy()
      const timeout = new Timeout<string>({ ms: DESTROY_TIMEOUT/2 })
      void timeout.start()
        .catch(() => {
          // timeout
        })
        .finally(() => {
          callback()
        })
    }
    if (d) {
      d.dismiss(onDismissed)
    } else {
      onDismissed()
    }
  }

  dismissAll = (callback: () => void = () => {}): void => {
    this.dialogs.forEach(() => {
      this.dismiss(callback)
    })
  }
}

export default Manager

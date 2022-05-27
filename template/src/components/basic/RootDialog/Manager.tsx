import React from 'react'
import RootSiblings from 'react-native-root-siblings'

import Timeout from '@/infrastructures/common/Timeout'

import Dialog from './components/BaseDialog'
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
      <Dialog
        ref={this.addRef}
        {...props}
      />,
      callback)
    this.dialogs.push(dialog)
  }

  destroy(): void {
    const dialog = this.dialogs.pop()
    setTimeout(() => {
      dialog?.destroy()
    }, DESTROY_TIMEOUT)
  }

  onDialogDismissed = (onDismissed: () => void = () => {
    // TODO:
  }): void => {
    onDismissed()
    this.destroy()
  }

  update = (props: DialogProps, callback: () => void = () => {
    // TODO:
  }): void => {
    this.currentDialog.update(
      (
        <Dialog
          {...props}
        />
      ),
      callback,
    )
  }

  show = (props: DialogProps, callback: () => void = () => {
    // TODO:
  }): void => {
    this.add({
      ...props,
      visible: true,
    }, callback)
  }

  dismiss = (callback: () => void = () => {
    // TODO:
  }): void => {
    // this.update({
    //   visible: false,
    // }, callback);
    const d = this.dialogsRef.pop()
    d?.dismiss()
    this.destroy()
    const timeout = new Timeout<string>({
      ms: 500,
    })
    void timeout.start()
      .catch(() => {
        // timeout
      })
      .finally(() => {
        callback()
      })
  }

  dismissAll = (callback: () => void = () => {
    // TODO:
  }): void => {
    this.dialogs.forEach(() => {
      this.dismiss(callback)
    })
  }
}

export default Manager

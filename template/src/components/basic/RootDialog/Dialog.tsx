import React, { Component } from 'react'
import Sibling from 'react-native-root-siblings'

import BaseDialog from './components/BaseDialog'
import type { DialogProps } from './type'

type State = {
  visible: boolean
}

export default class Dialog extends Component<DialogProps, State> {
  constructor(props: DialogProps) {
    super(props)

    this.state = {
      visible: props.visible,
    }
  }

  componentDidMount() {
    const { visible } = this.state
    if (visible) {
      this.createModal()
    }
  }

  componentDidUpdate(prevProps: DialogProps, prevState: State) {
    // update visible state and create dialog if visible is true
    if (prevState.visible !== this.props.visible) {
      // will use getDerivedStateFromProps in future, then don't need to setState
      // on componentDidUpdate
      // eslint-disable-next-line
      this.setState({ visible: this.props.visible });
      if (this.props.visible) {
        this.createModal()
      }
    }
    // always re-render if sibling is not null
    if (this.sibling) {
      this.updateModal()
    }
  }

  handleDismiss = () => {
    const { onDismiss } = this.props
    if (onDismiss) {
      onDismiss()
    }
    this.destroyModal()
  }

  sibling: Sibling | null = null

  createModal() {
    // Protect against setState happening asynchronously
    if (!this.sibling) {
      this.sibling = new Sibling(this.renderModal())
    }
  }

  updateModal() {
    this.sibling?.update(this.renderModal())
  }

  destroyModal() {
    this.sibling?.destroy()
    this.sibling = null
  }

  renderModal() {
    return (
      <BaseDialog
        {...this.props}
        onDismiss={this.handleDismiss}
        visible={this.state.visible}
      />
    )
  }

  render() {
    return null
  }
}

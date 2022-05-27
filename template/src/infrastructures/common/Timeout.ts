class Timeout<T> {
  timeout: number
  timeoutID: NodeJS.Timeout|undefined
  constructor(config: { ms?: number } = {}) {
    this.timeout = config.ms || 10000
    this.timeoutID = undefined
  }

  public start() {
    return new Promise<T>((resolve, reject) => {
      this.timeoutID = setTimeout(() => {
        reject('timeout')
        // this.clear();
      }, this.timeout)
    })
  }

  public clear() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (this.timeoutID !== undefined) {
      clearTimeout(this.timeoutID)
      this.timeoutID = undefined
    }
  }
}

export default Timeout

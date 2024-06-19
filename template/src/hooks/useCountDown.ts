import { useCallback } from 'react'

import logger from '@/infrastructures/common/logger'

import useBoolean from './useBoolean'
import useCounter from './useCounter'
import useInterval from './useInterval'

// New interface IN & OUT
type CountdownOption = {
  countStart: number
  intervalMs?: number
  isIncrement?: boolean
  countStop?: number
}
type CountdownControllers = {
  startCountdown: () => void
  stopCountdown: () => void
  resetCountdown: () => void
}

/**
 * New interface with default value
 *
 * @param  {CountdownOption} countdownOption
 * @param  {number} countdownOption.countStart - the countdown's starting number, initial value of the returned number.
 * @param  {?number} countdownOption.countStop -  `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param  {?number} countdownOption.intervalMs - `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} countdownOption.isIncrement - `false` by default, true if the countdown is increment.
 * @returns [counter, CountdownControllers]
 */

const useCountdown = (
  countdownOption:  CountdownOption,
): [number, CountdownControllers] => {
  /**
   * Use to determine the API call is a deprecated version.
   */
  let isDeprecated = false

  let countStart
  let intervalMs
  let isIncrement: boolean | undefined
  let countStop: number | undefined

  if ('seconds' in countdownOption) {
    logger.warn(
      '[useCountdown:DEPRECATED] new interface is already available (see https://usehooks-ts.com/react-hook/use-countdown), the old version will retire on usehooks-ts@3.',
    )

    isDeprecated = true
    countStart = countdownOption.countStart
    intervalMs = countdownOption.intervalMs
    isIncrement = countdownOption.isIncrement
  } else {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;({ countStart, countStop, intervalMs, isIncrement } = countdownOption)
  }

  // default values
  intervalMs = intervalMs ?? 1000
  isIncrement = isIncrement ?? false
  countStop = countStop ?? 0

  const { count, decrement, increment, reset: resetCounter } = useCounter(countStart)

  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const { setFalse: stopCountdown, setTrue: startCountdown, value: isCountdownRunning } = useBoolean(false)

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown()
    resetCounter()
  }

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown()

      return
    }

    if (isIncrement) {
      increment()
    } else {
      decrement()
    }
  }, [
    count, countStop, decrement, increment, isIncrement, stopCountdown,
  ])

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null)

  return [
    count,
    {
      startCountdown,
      stopCountdown,
      resetCountdown,
    } as CountdownControllers,
  ]
}

export default useCountdown

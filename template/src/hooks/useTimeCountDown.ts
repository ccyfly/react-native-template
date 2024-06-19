import React, { useCallback, useEffect, useState } from 'react'

import useBoolean from '@/hooks/useBoolean'
import useInterval from '@/hooks/useInterval'
import logger from '@/infrastructures/common/logger'

type CountdownControllers = {
  isCountdownRunning: boolean
  startCountdown: () => void
  stopCountdown: () => void
  resetCountdown: () => void
}
type CountdownOption = {
  /*
    * The initial value of the countdown in seconds
   */
  countStart: number
  intervalMs?: number
  isIncrement?: boolean
  countStop?: number
}

const useTimeCountDown = (
  countdownOption:  CountdownOption,
): [number, CountdownControllers] => {

  const { countStart, countStop = 0, intervalMs = 1000, isIncrement = false } = countdownOption

  const [count, setCount] = useState(countStart)
  const [timestampStart, setTimestampStart] = useState(0)
  // const [lastTimestamp, setLastTimestamp] = useState(0)
  const { setFalse: stopCountdown, setTrue: startCountdown, value: isCountdownRunning } = useBoolean(false)

  // const runStart = () => {
  //   const startTime = Date.now()
  //   setTimestampStart(startTime)
  //   // setLastTimestamp(startTime)
  // }

  useEffect(() => {
    if (isCountdownRunning) {
      const startTime = Date.now()
      setTimestampStart(startTime)
    } else {
      // TODO:
    }
  }, [isCountdownRunning])

  const resetCounter = () => {
    setCount(countStart)
  }

  const countdownCallback = useCallback(() => {
    const timeDiff = Date.now() - timestampStart
    const nextCount = Math.round(!isIncrement ? countStart - timeDiff / 1000 : count + timeDiff / 1000)
    if (!isIncrement) {
      if (nextCount <= countStop) {
        setCount(countStop)
        stopCountdown()

        return
      }
    } else {
      if (nextCount >= countStop) {
        setCount(countStop)
        stopCountdown()

        return
      }
    }
    setCount(nextCount)
  }, [count, countStop, timestampStart, isIncrement, stopCountdown])

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null)

  const resetCountdown = () => {
    stopCountdown()
    resetCounter()
  }

  return [
    count, {
      isCountdownRunning,
      stopCountdown,
      startCountdown,
      resetCountdown,
    },
  ]
}

export default useTimeCountDown

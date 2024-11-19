'use client'

import { useCallback, useEffect, useState } from 'react'

import { getStatusFromFlow } from '@/lib/utils'
import { initializeSocket } from '@/utils/socket'
import { Data, Pump, PumpStatus } from '@/utils/types'

import { MAX_FLOW } from '@/utils/constants'
import { Socket } from 'socket.io-client'
import { PumpCard } from './pump-card'

const SIMULATION_INTERVAL = 10000
const MAX_FLOW_CHANGE = 10
const MIN_FLOW = 0

export const PumpCardList = ({ initialData }: { initialData: Data }) => {
  const [pumps, setPumps] = useState<Pump[]>([
    {
      name: "Bomba MQTT",
      unit: "L/s",
      status: "normal",
      flow: 0,
      lastUpdated: new Date(),
    },
    {
      name: "Bomba 1",
      unit: "L/s",
      status: getStatusFromFlow(70),
      flow: 70,
      lastUpdated: new Date(),
    },
    {
      name: "Bomba 2",
      unit: "L/s",
      status: getStatusFromFlow(40),
      flow: 40,
      lastUpdated: new Date(),
    },
    {
      name: "Bomba 3",
      unit: "L/s",
      status: getStatusFromFlow(90),
      flow: 90,
      lastUpdated: new Date(),
    },
    {
      name: "Bomba 4",
      unit: "L/s",
      status: getStatusFromFlow(10),
      flow: 10,
      lastUpdated: new Date(),
    },
    {
      name: "Bomba 5",
      unit: "L/s",
      status: getStatusFromFlow(50),
      flow: 50,
      lastUpdated: new Date(),
    },
  ])

  const updatePumpData = (data: { value: number; timestamp: string; status: PumpStatus }) => {
    setPumps((prevPumps) => {
      const newPumps = [...prevPumps]
      newPumps[0] = {
        ...newPumps[0],
        flow: data.value,
        status: data.status,
        lastUpdated: new Date(data.timestamp),
      }
      return newPumps
    })
  }

  useEffect(() => {
    updatePumpData(initialData)

    const socket: Socket = initializeSocket()

    socket.on('pump-update', (data: { value: number; timestamp: string; status: PumpStatus }) => {
      updatePumpData(data)
    })

    return () => {
      socket.off('pump-update')
    }
  }, [initialData])

  //TODO: Remove this
  const generateRandomFlowChange = useCallback(
    (currentFlow: number): number => {
      const change =
        Math.floor(Math.random() * (MAX_FLOW_CHANGE * 2 + 1)) - MAX_FLOW_CHANGE
      const newFlow = Math.max(
        MIN_FLOW,
        Math.min(MAX_FLOW, currentFlow + change),
      )
      return newFlow
    },
    [],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setPumps((prevPumps) => {
        return prevPumps.map((pump, index) => {
          if (index === 0) return pump

          const newFlow = generateRandomFlowChange(pump.flow)
          return {
            ...pump,
            flow: newFlow,
            status: getStatusFromFlow(newFlow),
            lastUpdated: new Date(),
          }
        })
      })
    }, SIMULATION_INTERVAL)

    return () => clearInterval(interval)
  }, [generateRandomFlowChange])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-6 mb-auto">
      {pumps.map((pump) => (
        <div key={pump.name} className="">
          <PumpCard pump={pump} />
        </div>
      ))}
    </div>
  )
}

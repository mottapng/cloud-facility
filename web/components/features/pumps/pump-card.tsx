import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { memo } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gauge } from '@/components/ui/gauge'
import { capitalizeFirstLetter } from '@/lib/utils'
import { MAX_FLOW, STATUS_COLORS, STATUS_COLORS_HEX } from '@/utils/constants'
import { translateStatus } from '@/utils/translate'
import { Pump } from '@/utils/types'

interface PumpCardProps {
  pump: Pump
}

export const PumpCard = memo(({ pump }: PumpCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
        <CardTitle className="text-base font-medium">{pump.name}</CardTitle>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <span
            className={`w-2 h-2 mt-[3px] rounded-full animate-pulse ${
              STATUS_COLORS[pump.status]
            }`}
          />
          <span className="text-sm font-medium capitalize">
            {capitalizeFirstLetter(translateStatus(pump.status))}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Gauge
          value={pump.flow}
          max={MAX_FLOW}
          size="lg"
          strokeColor={STATUS_COLORS_HEX[pump.status]}
        />
        <div className="text-2xl font-bold text-center mt-2">
          {pump.flow} {pump.unit}
        </div>
        <p className="text-xs text-muted-foreground">Vazão atual da bomba</p>

        <p className="text-xs text-muted-foreground mt-4 text-start w-full">
          Atualizado{' '}
          {formatDistance(pump.lastUpdated, new Date(), {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
      </CardContent>
    </Card>
  )
})

PumpCard.displayName = 'PumpCard'

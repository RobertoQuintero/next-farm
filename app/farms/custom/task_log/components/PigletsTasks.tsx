import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext } from 'react'

export const PigletsTasks = () => {
  const {tasks} = useContext(FarmsContext)
  return (
    <AccordionElement title='Lechones'>
      {
        tasks.filter(f=>f.id_lot_piglets)?.map(t=><p key={t.id_pig}>{t.description}</p>)
      }
    </AccordionElement>
  )
}

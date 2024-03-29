import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext } from 'react'

export const PigsTasks = () => {
  const {tasks} = useContext(FarmsContext)
  return (
    <AccordionElement title='Gestantes'>
      {
        tasks.filter(f=>f.id_pig)?.map(t=><p key={t.id_pig}>{t.description}</p>)
      }
    </AccordionElement>
  )
}

import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext } from 'react'
import { TaskElementRow } from '../../history/components'
import styles from '../../history/components/pig.module.css'

interface Props{
  changeAction:number
}

export const PigletsTasks = ({changeAction}:Props) => {
  const {tasks} = useContext(FarmsContext)
  return (
    <AccordionElement title='Lechones'>
      <div className={styles.birthContainer}>
      <div className={styles.taskRow} style={{fontWeight:'bold'}}>
          <p >Fecha</p>
          <p>Aplicó</p>
          <p>Descripción</p>
          <p >Comentario</p>
        </div>
        {
          tasks.filter(f=>f.id_lot_piglets).length
          ?tasks.filter(f=>changeAction===1?f.id_lot_piglets:f.id_lot_piglets&&!f.done).map(t=><TaskElementRow task={t} key={t.id_task}/>)
          :<></>
        }
      </div>
    </AccordionElement>
  )
}

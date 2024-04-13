import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext } from 'react'
import { TaskElementRow } from '../../history/components'
import styles from '../../history/components/pig.module.css'

interface Props{
  changeAction:number
}

export const PigsTasks = ({changeAction}:Props) => {
  const {tasks} = useContext(FarmsContext)

  return (
    <AccordionElement title='Gestantes'>
      <div className={styles.birthContainer} style={{width:'100%'}}>
      <div className={styles.birthRow} style={{fontWeight:'bold'}}>
          <p >Fecha</p>
          <p>Aplicó</p>
          <p>Descripción</p>
        </div>
        {
          tasks.filter(f=>f.id_pig).length
          ?tasks.filter(f=>changeAction===1?f.id_pig:f.id_pig&&!f.done).map(t=><TaskElementRow task={t} key={t.id_task}/>)
          :<></>
        }
      </div>
   
     
    </AccordionElement>
  )
}

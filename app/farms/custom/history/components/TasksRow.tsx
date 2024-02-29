import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { IPig } from '@/interfaces'
import { TaskElementRow } from '.'
import styles from './pig.module.css'

export const TasksRow = () => {
  const {getTasks,pig,tasks} = useContext(FarmsContext)

  useEffect(() => {
    if(pig){
      getTasks(pig?.id_pig!,'pig')
    }else{
      const newPig= JSON.parse(Cookies.get('pig')!) as IPig
      getTasks(newPig.id_pig,'pig')
    }
  }, [])
  
  return (
    <AccordionElement title='Actividades'>
      <>
      <div className={styles.birthContainer}>
      <div className={styles.birthRow} style={{fontWeight:'bold'}}>
          <p >Fecha</p>
          {/* <p >Hasta</p> */}
          <p>Aplicó</p>
          <p>Descripción</p>
        </div>
        {
          tasks.filter(t=>t.status&&!t.id_lot_piglets).length
          ?tasks.filter(t=>t.status&&!t.id_lot_piglets).map(t=><TaskElementRow task={t} key={t.id_task}/>)
          :<></>
        }
      </div>
      </>
    </AccordionElement>
  )
}

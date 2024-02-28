import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { IPiglets } from '@/interfaces'
import { TaskElementRow } from '../../history/components'
import styles from '../../history/components/pig.module.css'

export const TasksRowPiglets = () => {
  const {getTasks,tasks,piglet} = useContext(FarmsContext)

  useEffect(() => {
    if(piglet){
      getTasks(piglet?.id_lot_piglets!,'lot')
    }else{
      const newPig= JSON.parse(Cookies.get('piglet')!) as IPiglets
      getTasks(newPig.id_lot_piglets,'lot')
    }
  }, [])
  

  return (
    <AccordionElement title='Actividades'>
      <>
      <div className={styles.birthContainer}>
      <div className={styles.birthRow} style={{fontWeight:'bold'}}>
          <p >Fecha</p>
          <p >Hasta</p>
          <p>Aplicó</p>
          <p>Descripción</p>
        </div>
        {
          tasks.filter(t=>t.status&&!t.id_pig).length
          ?tasks.filter(t=>t.status&&!t.id_pig).map(t=><TaskElementRow task={t} key={t.id_task}/>)
          :<></>
        }
      </div>
      </>
    </AccordionElement>
  )
}

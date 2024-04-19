import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { IPig } from '@/interfaces'
import { TaskElementRow } from '.'
import styles from './pig.module.css'
import { Button } from '@mui/material'
import { UiContext } from '@/app/context/ui/UiContext'

export const TasksRow = () => {
  const {getTasks,pig,tasks,setFarmAction,setPiglet} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  useEffect(() => {
    if(pig){
      getTasks(pig?.id_pig!,'pig')
    }else{
      const newPig= JSON.parse(Cookies.get('pig')!) as IPig
      getTasks(newPig.id_pig,'pig')
    }
  }, [])

  const onClick =() =>{
    setFarmAction('ADD-TASK')
    setPiglet(undefined)
    // setComment(undefined)
    toggleModal()
 };
  
  return (
    <AccordionElement title='Actividades'>
      <>
      <div style={{textAlign:'right'}}>
        <Button size='small'  onClick={onClick} >Agregar</Button>
      </div>
      <div className={styles.birthContainer}>
      <div className={styles.taskRow} style={{fontWeight:'bold'}}>
          <p >Fecha</p>
          <p>Aplicó</p>
          <p>Descripción</p>
          <p>Comentario</p>
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

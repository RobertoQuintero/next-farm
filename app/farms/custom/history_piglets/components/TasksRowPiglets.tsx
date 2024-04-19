import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { IPiglets } from '@/interfaces'
import { TaskElementRow } from '../../history/components'
import styles from '../../history/components/pig.module.css'
import { Button } from '@mui/material'
import { UiContext } from '@/app/context/ui/UiContext'

export const TasksRowPiglets = () => {
  const {getTasks,tasks,piglet,setFarmAction,setPig} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  useEffect(() => {
    if(piglet){
      getTasks(piglet?.id_lot_piglets!,'lot')
    }else{
      const newPig= JSON.parse(Cookies.get('piglet')!) as IPiglets
      getTasks(newPig.id_lot_piglets,'lot')
    }
  }, [])

  const onClick =() =>{
    setFarmAction('ADD-TASK')
    setPig(undefined)
    toggleModal()
 };

  return (
    <AccordionElement title='Actividades'>
      <>
      <div style={{textAlign:'right'}}>
        <Button size='small'  onClick={onClick} >Agregar</Button>
      </div>
      <div className={styles.birthContainer} style={{width:'100%'}}>
      <div className={styles.taskRow} style={{fontWeight:'bold'}}>
          <p >Fecha</p>
          <p>Aplicó</p>
          <p>Descripción</p>
          <p >Comentario</p>
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

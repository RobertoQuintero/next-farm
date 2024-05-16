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
  }, [pig])

  const onClick =() =>{
    setFarmAction('ADD-TASK')
    setPiglet(undefined)
    toggleModal()
 };
  
  return (
    <AccordionElement title='Actividades'>
      <>
      <div style={{textAlign:'right'}}>
        <Button size='small'  onClick={onClick} >Agregar</Button>
      </div>
      <div className={styles.birthContainer}>
      <div  style={{fontWeight:'bold',display:'flex',fontSize:'14px'}}>
          <p style={{width:'90px'}}>Fecha</p>
          <p style={{width:'90px'}}>Aplicó</p>
          <p style={{width:'210px'}}>Descripción</p>
          <p style={{width:'90px'}}>Comentario</p>
        </div>
        
          {
            tasks.filter(t=>!t.id_lot_piglets).length
            ?<div style={{display:'flex',flexDirection:'column'}}>
            {
                tasks.filter(t=>!t.id_lot_piglets).map(t=><TaskElementRow task={t} key={t.id_task}/>)
            }
          </div>
            :<></>
          }
        
      </div>
      </>
    </AccordionElement>
  )
}

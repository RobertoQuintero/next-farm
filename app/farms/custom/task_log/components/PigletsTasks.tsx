import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useState } from 'react'
import { TaskElementRow } from '../../history/components'
import styles from '../../history/components/pig.module.css'
import { ITask } from '@/interfaces'

interface Props{
  changeAction:number
}

export const PigletsTasks = ({changeAction}:Props) => {
  const {tasks} = useContext(FarmsContext)
  const [desc, setDesc] = useState<boolean | undefined>(true)
  const [description, setDescription] = useState<boolean | undefined>(true)

  const compareDates=(a:ITask, b:ITask)=> {
    const token= desc?1:-1
    if (new Date(a.start_date) < new Date(b.start_date)) {
      return -1*token;
    }
    if (new Date(a.start_date) > new Date(b.start_date)) {
      return 1*token;
    }
    return 0;
  }
  
  const compareDescription=(a:ITask, b:ITask)=> {
    const token= description?1:-1
    if (a?.description! < b?.description!) {
      return -1*token;
    }
    if (a?.description! > b?.description!) {
      return 1*token;
    }
    return 0;
  }

  return (
    <AccordionElement title='Lechones'>
      <div className={styles.birthContainer}>
      <div className={styles.taskRow} style={{fontWeight:'bold'}}>
      <p onClick={()=>{
            setDescription(undefined)
            setDesc(prev=>!prev)
            }} style={{cursor:'pointer'}}>Fecha</p>
          <p>Aplicó</p>
          <p onClick={()=>{
            setDesc(undefined)
            setDescription(prev=>!prev)
            }} style={{cursor:'pointer'}}>Descripción</p>
          <p >Comentario</p>
        </div>
        {
          tasks.filter(f=>f.id_lot_piglets).length
          ? description===undefined 
            ?tasks
            .filter(f=>changeAction===1?f.id_lot_piglets:f.id_lot_piglets&&!f.done)
            .sort(compareDates)
            .map(t=><TaskElementRow task={t} key={t.id_task}/>)
            :tasks
            .filter(f=>changeAction===1?f.id_lot_piglets:f.id_lot_piglets&&!f.done)
            .sort(compareDescription)
            .map(t=><TaskElementRow task={t} key={t.id_task}/>)
          :<></>
        }
      </div>
    </AccordionElement>
  )
}

import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useState } from 'react'
import { TaskElementRow } from '../../history/components'
import styles from '../../history/components/pig.module.css'
import { ITask } from '@/interfaces'

interface Props{
  changeAction:number
}

export const PigsTasks = ({changeAction}:Props) => {
  const {tasks} = useContext(FarmsContext)
  const [desc, setDesc] = useState<boolean | undefined>(true)
  const [description, setDescription] = useState<boolean | undefined>(true)
  const [ubication, setUbication] = useState<boolean | undefined>(true)

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

  const compareUbication=(a:ITask, b:ITask)=> {
    const token= ubication?1:-1
    if (a?.pig_ubication! < b?.pig_ubication!) {
      return -1*token;
    }
    if (a?.pig_ubication! > b?.pig_ubication!) {
      return 1*token;
    }
    return 0;
  }


  return (
    <AccordionElement title='Gestantes'>
      <div className={styles.birthContainer} style={{width:'100%'}}>
      <div  style={{fontWeight:'bold',display:'flex',fontSize:'14px'}}>
          <p onClick={()=>{
            setDescription(undefined)
            setUbication(undefined)
            setDesc(prev=>!prev)
            }} style={{cursor:'pointer',width:'90px'}}>Fecha</p>
          <p style={{cursor:'pointer',width:'90px'}}
              
              onClick={()=>{
                setDesc(undefined)
                setDescription(undefined)
                setUbication(prev=>!prev)
                }}
          >Ubicación</p>
          <p style={{width:'90px'}}>Aplicó</p>
          <p onClick={()=>{
            setDesc(undefined)
            setUbication(undefined)
            setDescription(prev=>!prev)
            }} style={{cursor:'pointer',width:'200px'}}>Descripción</p>
        </div>
        {
          tasks.filter(f=>f.id_pig).length
          ?desc!==undefined 
            ?tasks
            .filter(f=>changeAction===1?f.id_pig:f.id_pig&&!f.done)
            .sort(compareDates)
            .map(t=><TaskElementRow task={t} key={t.id_task} report />)
            :ubication!==undefined
              ?tasks
              .filter(f=>changeAction===1?f.id_pig:f.id_pig&&!f.done)
              .sort(compareUbication)
              .map(t=><TaskElementRow task={t} key={t.id_task} report/>)
              :tasks
              .filter(f=>changeAction===1?f.id_pig:f.id_pig&&!f.done)
              .sort(compareDescription)
              .map(t=><TaskElementRow task={t} key={t.id_task} report/>)
          :<></>
        }
      </div>
   
     
    </AccordionElement>
  )
}

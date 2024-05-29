import { AccordionElement, DatePickerElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import React, { useContext, useState } from 'react'
import { TaskElementRow } from '../../history/components'
import styles from '../../history/components/pig.module.css'
import { ITask } from '@/interfaces'
import { Button, MenuItem, TextField } from '@mui/material'
import { addZero } from '@/utils'
import Cookies from 'js-cookie'
import { AuthContext } from '@/app/context/auth/AuthContext'

const actions =[
  {
    id_action:1,
    action:'Todas'
  },
  {
    id_action:2,
    action:'Por realizar'
  },
] as {id_action:number,action:string}[]

interface Props{
  changeAction:number
}

export const PigsTasks = () => {
  const {searchedTasks,setTaskStartDate,setTaskEndDate,taskStartDate,taskEndDate,getAllTasks} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  const [desc, setDesc] = useState<boolean | undefined>(true)
  const [description, setDescription] = useState<boolean | undefined>(true)
  const [ubication, setUbication] = useState<boolean | undefined>(true)
  const [changeAction, setChangeAction] = useState(1)
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

  const onAdd = async() =>{
    const start=addZero(taskStartDate!) 

    const end=new Date(taskEndDate!)
     end.setDate(end.getDate()+1)
    await getAllTasks({startDate:start,endDate:addZero(end),id_farm:idFarm! || +Cookies.get('id_farm')!,id:'id_pig'})
};

  return (
    // <AccordionElement title='Gestantes'>
    <>
    <div className='actionCreateContainer'>

<div style={{display:'flex', gap:'.5rem',alignItems:'center'}}>
  <DatePickerElement date={taskStartDate} setDate={setTaskStartDate}/>
  <DatePickerElement date={taskEndDate} setDate={setTaskEndDate}/>
  <TextField
    sx={{width:'140px'}}
    size="small"
    label='Filtrar'
    value={changeAction}
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
      
      setChangeAction(+e.target.value)
    }}
    select >
    {
      actions.map(item=>(
        <MenuItem 
          key={item.id_action} 
          value={item.id_action}>
          {item.action}
        </MenuItem>))
    }
  </TextField>
  </div>
  <Button 
    onClick={onAdd}
    variant='contained' 
    color='success'
    size='small'>Buscar</Button>
  </div>
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
          searchedTasks.filter(f=>f.id_pig).length
          ?desc!==undefined 
            ?searchedTasks
            .filter(f=>changeAction===1?f.id_pig:f.id_pig&&!f.done)
            .sort(compareDates)
            .map(t=><TaskElementRow task={t} key={t.id_task} report />)
            :ubication!==undefined
              ?searchedTasks
              .filter(f=>changeAction===1?f.id_pig:f.id_pig&&!f.done)
              .sort(compareUbication)
              .map(t=><TaskElementRow task={t} key={t.id_task} report/>)
              :searchedTasks
              .filter(f=>changeAction===1?f.id_pig:f.id_pig&&!f.done)
              .sort(compareDescription)
              .map(t=><TaskElementRow task={t} key={t.id_task} report/>)
          :<></>
        }
      </div>
    </>
   
     
    // </AccordionElement>
  )
}

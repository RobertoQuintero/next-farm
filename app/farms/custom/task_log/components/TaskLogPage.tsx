'use client'
import { Button, MenuItem, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { PigletsTasks, PigsTasks } from '.'
import { DatePickerElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { addZero } from '@/utils'
import { AuthContext } from '@/app/context/auth/AuthContext'
import Cookies from 'js-cookie'

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

const TaskLogPage = () => {
  const {getAllTasks,setTasks,getPigs,pigs,piglets,getPiglets} = useContext(FarmsContext)
  const {idFarm,logged} = useContext(AuthContext)
  const [startDate, setstartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [changeAction, setChangeAction] = useState(1)

  const onAdd = async() =>{
      const start=addZero(startDate!) 

      const end=new Date(endDate!)
       end.setDate(end.getDate()+1)

      await getAllTasks({startDate:start,endDate:addZero(end),id_farm:idFarm! || +Cookies.get('id_farm')!})

  };
  useEffect(() => {
    setTasks([])
  }, [])

  useEffect(() => {
    if(!pigs.length&&idFarm){
      getPigs(idFarm!)
    }
  }, [logged])
  useEffect(() => {
    if(!piglets.length&&idFarm){
      getPiglets(idFarm!)
    }
  }, [logged])
  
  

  return (
    <>
     <div className='actionCreateContainer'>

        <div style={{display:'flex', gap:'.5rem'}}>
          <DatePickerElement date={startDate} setDate={setstartDate}/>
          <DatePickerElement date={endDate} setDate={setEndDate}/>
          <TextField
          sx={{width:'150px'}}
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
      <div>
        <PigsTasks changeAction={changeAction}/>
        <PigletsTasks changeAction={changeAction}/>
      </div>
  
    </>
  )
}

export default TaskLogPage
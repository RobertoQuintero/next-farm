'use client'
import { Button, MenuItem, Switch, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { PigletsTasks, PigsTasks } from '.'
import { DatePickerElement, DeleteComponent } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { addZero } from '@/utils'
import { AuthContext } from '@/app/context/auth/AuthContext'
import Cookies from 'js-cookie'
import AppModal from '@/app/components/AppModal'
import { UpdateTask } from '../../components'
import { UiContext } from '@/app/context/ui/UiContext'
import { ITask } from '@/interfaces'

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
  const {getAllTasks,setTasks,getPigs,pigs,piglets,getPiglets,farmAction,farmsLoading,farmsError,task,updateTasks,setTaskStartDate,setTaskEndDate,taskStartDate,taskEndDate} = useContext(FarmsContext)
  const {idFarm,logged} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
  const [changeAction, setChangeAction] = useState(1)
  const [checked, setChecked] = useState(false);

  const onAdd = async() =>{
      const start=addZero(taskStartDate!) 

      const end=new Date(taskEndDate!)
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

  const onDelete = async() =>{
    const newTask={...task, status:false} as ITask
    // console.log(newTask)
    // return
    const ok= await updateTasks(newTask)
    if(ok){
      const start=addZero(taskStartDate!) 

      const end=new Date(taskEndDate!)
       end.setDate(end.getDate()+1)
      await getAllTasks({startDate:start,endDate:addZero(end),id_farm:idFarm! || +Cookies.get('id_farm')!})
     toggleModal()
    }
 };

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setChecked(event.target.checked);
};
  
  return (
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
        <div style={{position:'relative'}}>
        <p style={{position:'absolute',top:-10,fontSize:'14px'}}>{checked?'Lechones':'Gestantes'}</p>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </div>
        </div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Buscar</Button>
      </div>
      <div>
        {
          !checked
            ?<PigsTasks changeAction={changeAction}/>
            :<PigletsTasks changeAction={changeAction}/>
        }
      </div>
      <AppModal>
        {
            farmAction==='UPDATE-TASK'?<UpdateTask fromTask/>:<></>
          }
          {
            farmAction==='DELETE-TASK'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
          }
      </AppModal>
  
    </>
  )
}

export default TaskLogPage
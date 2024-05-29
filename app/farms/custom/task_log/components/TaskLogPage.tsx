'use client'
import {  Switch } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { PigletsTasks, PigsTasks } from '.'
import {  DeleteComponent } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { addZero } from '@/utils'
import { AuthContext } from '@/app/context/auth/AuthContext'
import Cookies from 'js-cookie'
import AppModal from '@/app/components/AppModal'
import { UpdateTask } from '../../components'
import { UiContext } from '@/app/context/ui/UiContext'
import { ITask } from '@/interfaces'

const TaskLogPage = () => {
  const {getAllTasks,setTasks,getPigs,pigs,piglets,getPiglets,farmAction,farmsLoading,farmsError,task,updateTasks,taskStartDate,taskEndDate,taskPigletStartDate,taskPigletEndDate} = useContext(FarmsContext)
  const {idFarm,logged} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
  const [changeAction, setChangeAction] = useState(1)
  const [checked, setChecked] = useState(false);

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
      const start=addZero(newTask.id_pig? taskStartDate!:taskPigletStartDate!) 

      const end=new Date(newTask.id_pig?taskEndDate!:taskPigletEndDate!)
       end.setDate(end.getDate()+1)
       let id=''
       if(checked){
         id='id_lot_piglets'
        }else{
        id='id_pig'
      }
      await getAllTasks({startDate:start,endDate:addZero(end),id_farm:idFarm! || +Cookies.get('id_farm')!,id})
     toggleModal()
    }
 };

 

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setChecked(event.target.checked);
};
  
  return (
    <>
    <div style={{position:'relative'}}>
        <p style={{position:'absolute',top:-10,fontSize:'14px'}}>{checked?'Lechones':'Gestantes'}</p>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </div>
     
      <div>
        {
          !checked
            ?<PigsTasks />
            :<PigletsTasks />
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
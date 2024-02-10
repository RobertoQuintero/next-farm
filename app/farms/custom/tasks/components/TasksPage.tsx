'use client'
import {  AccessErrorComponent, BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { PostUpdateTask, TaskRow } from '.'
import { ITask } from '@/interfaces'

const TasksPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {tasks,setTask,setFarmAction,farmAction,farmsLoading,farmsError,task,postTask} = useContext(FarmsContext)

  const onAdd = () =>{
    setTask(undefined)
    setFarmAction(undefined)
    toggleModal()
  };

  const onDelete = async() =>{
    const newTask={...task, status:false} as ITask
    const ok=await postTask(newTask)
    if(ok){
      toggleModal()
      setTask(undefined)
      setFarmAction(undefined)
    }
  };

  return (
    <>
     <div className='actionCreateContainer'>
        <AccessErrorComponent/>
        <BackButton/>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          tasks.filter(t=>t.status).length
            ?tasks.filter(t=>t.status).map(a=><TaskRow task={a} key={a.id_task}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction==='OPEN' || farmAction===undefined
            ?<PostUpdateTask/>
            :<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
        }
      </AppModal>
    </>
  )
}

export default TasksPage
'use client'
import {  AccessErrorComponent, BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useState } from 'react'
import { PostUpdateTask, TaskRow } from '.'
import { ITask } from '@/interfaces'
import Link from 'next/link'

const TasksPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {tasks,setTask,setFarmAction,farmAction,farmsLoading,farmsError,task,postTask,stages} = useContext(FarmsContext)
  const [error, setError] = useState(false)

  const onAdd = () =>{
    setError(false)
    if(!stages.length){
      setError(true)
      return
    }
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
        <div style={{display:'flex',alignItems:'center',gap:'1rem',color:'red'}}>
        {
            error?<p style={{fontSize:'14px'}}>Debe añadir etapas <Link href='/farms/custom/stages' style={{textDecoration:'underline'}}>Click!</Link></p>:<></>
          }
          <Button 
            onClick={onAdd}
            variant='contained' 
            color='success'
            size='small'>Nuevo</Button>
        </div>
      </div>
      <div>
        {
          tasks.filter(t=>t.status).length
            ?tasks.filter(t=>t.status).map(a=><TaskRow task={a} key={a.id_task}/>)
            :<EmptyPage title='Tareas'/>
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
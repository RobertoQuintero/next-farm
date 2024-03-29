'use client'
import {  AccessErrorComponent, BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useState } from 'react'
import { PostUpdateTask, TaskRow } from '.'
import { IPigTask } from '@/interfaces'
import Link from 'next/link'

const TasksPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {tasks,setTask,setFarmAction,farmAction,farmsLoading,farmsError,task,postTask,pigTask,pigTasks,setPigTask,pigStages} = useContext(FarmsContext)
  const [error, setError] = useState(false)

  const onAdd = () =>{
    setError(false)
    if(!pigStages.length){
      setError(true)
      return
    }
    setPigTask(undefined)
    setFarmAction(undefined)
    toggleModal()
  };

  const onDelete = async() =>{
    const newTask={...pigTask, status:false} as IPigTask
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
      <div style={{paddingBottom:'2rem'}}>
        {
          pigTasks.filter(t=>t.status).length
            ?pigTasks.filter(t=>t.status).map(a=><TaskRow task={a} key={a.id_pig_task}/>)
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
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
import OnRefreshButton from '../../components/OnRefreshButton'
import { AuthContext } from '@/app/context/auth/AuthContext'
import Cookies from 'js-cookie'

const TasksPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {user,idFarm} = useContext(AuthContext)
  const {setTask,setFarmAction,farmAction,farmsLoading,farmsError,postTask,pigTask,pigTasks,setPigTask,pigStages,getPigTask} = useContext(FarmsContext)
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
    const newTask={
      ...pigTask,
       status:false,
       days_diff:0,
       id_user:user?.id_user
      } as IPigTask

    // console.log(newTask)
    // return
    const ok=await postTask(newTask)
    if(ok){
      toggleModal()
      setTask(undefined)
      setFarmAction(undefined)
    }
  };

  const onRefresh = async() =>{
    await getPigTask(idFarm!||+Cookies.get('id_farm')!)
    
  };

  return (
    <>
     <div className='actionCreateContainer'>
        <AccessErrorComponent/>
        <div style={{display:'flex',gap:'.5rem'}}>
          <BackButton/>
          <OnRefreshButton onRefresh={onRefresh}/>
        </div>
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
        <div style={{display:'flex',paddingLeft:'.5rem',fontSize:'14px', fontWeight:'bold',gap:'.5rem', }}>
          <p style={{width:'100px'}}>Tipo</p>
          <p style={{width:'100px'}}>Etapa</p>
          <p style={{width:'250px'}}>Descripción</p>
          <p style={{width:'120px'}}>Días</p>
          <p style={{width:'110px'}}>Cambio etapa</p>
          <p style={{width:'100px'}}>Movimiento</p>
        </div>
        {
          pigTasks?.filter(t=>t.status).length
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
'use client'
import {  AccessErrorComponent, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { PostUpdateStallion, StallionRow } from '.'
import { IStallion } from '@/interfaces'

const StallionsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {stallions,farmAction,setFarmAction,setStallion,postStallion,stallion,farmsLoading,farmsError} = useContext(FarmsContext)
  const onAdd = async() =>{
    setFarmAction(undefined)
    setStallion(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
     const newStallion={
      ...stallion,
      status:false
     } as IStallion

     const ok=await postStallion(newStallion)
     if(ok){
      toggleModal()
     }
  };

  return (
    <>
     <div className='actionCreateContainer'>
     <AccessErrorComponent/>
        <div></div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          stallions.filter(s=>s.status).length
            ?stallions.filter(s=>s.status).map(a=><StallionRow stallion={a} key={a.id_stallion}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction==='EDIT' || farmAction===undefined
            ?<PostUpdateStallion/>
            :<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
        }
      </AppModal>
    </>
  )
}

export default StallionsPage
'use client'
import {  AccessErrorComponent, BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useState } from 'react'
import { PostUpdateStallion, StallionRow } from '.'
import { IStallion } from '@/interfaces'
import Link from 'next/link'

const StallionsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {stallions,farmAction,setFarmAction,setStallion,postStallion,stallion,farmsLoading,farmsError,races} = useContext(FarmsContext)
  const [error, setError] = useState(false)

  const onAdd = async() =>{
    if(!races.length){
      setError(true)
      return
    }
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
        <BackButton/>
        <div style={{display:'flex',alignItems:'center',gap:'1rem',color:'red'}}>
          {
            error?<p style={{fontSize:'14px'}}>Debe agregar una raza <Link href='/farms/custom/races' style={{textDecoration:'underline'}}>Click!</Link></p>:<></>
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
          stallions.filter(s=>s.status).length
            ?stallions.filter(s=>s.status).map(a=><StallionRow stallion={a} key={a.id_stallion}/>)
            :<EmptyPage title='Sementales'/>
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
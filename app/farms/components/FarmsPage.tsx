'use client'
import { EmptyPage, LoadingComponent } from '@/app/components';
import AppModal from '@/app/components/AppModal';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { FarmCard } from './FarmCard';
import { PostUpdateFarm } from './PostUpdateFarm';
import { UiContext } from '@/app/context/ui/UiContext';
import { AuthContext } from '@/app/context/auth/AuthContext';
import { useRouter } from 'next/navigation';

const FarmsPage = () => {
  const router= useRouter()
  const {farms,setFarm,farmsLoading} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const {user} = useContext(AuthContext)
  
  useEffect(() => {
    if(user?.id_role!==1){
      router.push('/farms/custom')
    }
  }, [])

  if(farmsLoading){
    return <LoadingComponent/>
  }
  
  
  const onAdd = async() =>{
     setFarm(undefined)
     toggleModal()
  };

  return (
    <>
      <div className='onAdd'>
        <Button
          size='small'
          variant='contained'
          color='success'
          onClick={onAdd}
        >
          Nuevo</Button>
      </div>
      <div style={{paddingTop:'1rem'}}>
          {
            farms?.length && user?.id_role===1
              ?farms.map(f=><FarmCard farm={f} key={f.id_farm}/>)
              : <EmptyPage/>
          }
      </div>
      <AppModal>
        <PostUpdateFarm/>
      </AppModal>
    </>
  )
}

export default FarmsPage
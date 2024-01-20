'use client'
import { EmptyPage } from '@/app/components';
import AppModal from '@/app/components/AppModal';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { FarmCard } from './FarmCard';
import { PostUpdateFarm } from './PostUpdateFarm';
import { UiContext } from '@/app/context/ui/UiContext';

const FarmsPage = () => {
  const {farms,setFarm} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  
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
            farms?.length
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
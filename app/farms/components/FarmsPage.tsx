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

// Al seleccionar granja que apazca un titulo de navegacion
// Cambiar el link de la palabra al boton
// Al añadir un cerdo filtrar las etapas segun el tipo de cerdo seleccionado
// En la lista de cerdos cambiar el boton editar x Ver
// al añadir roles solo mostrar los accesos que no se tienen
// select id_access, description from cat.Access_routes as t1
// where t1.id_access not in (select id_access from mod.Role_access_routes as t2
// where t2.id_role=3 and id_farm=1)
// order by id_access

const FarmsPage = () => {
  const router= useRouter()
  const {farms,setFarm,farmsLoading,getFarms} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const {user} = useContext(AuthContext)
  
  useEffect(() => {
    if(user?.id_role!==1){
      router.push('/farms/custom')
    }
    if(!farms.length){
      getFarms(user?.id_user!)
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
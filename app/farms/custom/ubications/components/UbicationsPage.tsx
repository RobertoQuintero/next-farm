'use client'
import { BackButton, DeleteComponent, EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { PostUpdateUbication, UbicationRow } from '.'
import { IUbication } from '@/interfaces'
import OnRefreshButton from '../../components/OnRefreshButton'
import { AuthContext } from '@/app/context/auth/AuthContext'
import Cookies from 'js-cookie'

const UbicationsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {ubications,setUbication,setFarmAction,farmAction,farmsLoading,farmsError,ubication,postUbication,getUbications} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  
  
  const onAdd = async() =>{
    setUbication(undefined)
    setFarmAction(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
     const newUbication={
      ...ubication,
      status:false
     } as IUbication

     const ok= await postUbication(newUbication)
     if(ok){
      toggleModal()
     }
  };
  const onRefresh = async() =>{
    await getUbications(idFarm!||+Cookies.get('id_farm')!)
    
  };

  if(farmsLoading){
    return <LoadingComponent/>
  }

  return (
    <>
     <div className='actionCreateContainer'>
      <div style={{display:'flex',gap:'.5rem'}}>
      <BackButton/>
      <OnRefreshButton onRefresh={onRefresh}/>
      </div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        <div className='ubicationRow uHeader'>
          <p>Modificado</p>
          <p>Tipo</p>
          <p>Ubicación</p>
        </div>
        {
          ubications.filter(u=>u.status).length
            ?ubications.filter(u=>u.status).map(a=><UbicationRow ubication={a} key={a.id_ubication}/>)
            :<EmptyPage title='Ubicaciones'/>
        }
      </div>
      <AppModal>
        {
          farmAction===undefined || farmAction==='OPEN'
            ?<PostUpdateUbication/>
            :<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
        }

      </AppModal>
    </>
  )
}

export default UbicationsPage
'use client'
import { DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { PostUpdateUbication, UbicationRow } from '.'
import { IUbication } from '@/interfaces'

const UbicationsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {ubications,setUbication,setFarmAction,farmAction,farmsLoading,farmsError,ubication,postUbication} = useContext(FarmsContext)

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

  return (
    <>
     <div className='actionCreateContainer'>
        <div></div>
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
            :<EmptyPage/>
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

'use client'
import { BackButton, DeleteComponent, EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PigCard, PostUpdatePig } from '.'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { IPig } from '@/interfaces'

const FarmPage = () => {
  const {toggleModal,isModalOpen} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {farmsLoading,pigs,getPigs,setPig,setFarmAction,farmAction,farmsError,pig,postPig} = useContext(FarmsContext)

  useEffect(() => {
    let id= idFarm
    if(!idFarm){
     id= Number(localStorage.getItem('id_farm'))
    }
    getPigs(id!)
  }, [])
  
  if(farmsLoading && !isModalOpen){
    return <LoadingComponent/>
  }
  const onAdd = async() =>{
    setFarmAction(undefined)
    setPig(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
     const newPig={...pig,status:false} as IPig
     const ok= await postPig(newPig)
     if(ok){
      toggleModal()
     }
  };

  return (
    <>
     <div className='actionCreateContainer'>
        <div>
          <BackButton/>
        </div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        <div className="pigData pigDataHeader">
          <p>Número</p>
          <p>Ubicación</p>
          <p>Raza</p>
          <p>Situación</p>
        </div>
        {
          pigs.filter(p=>p.status).length
            ?pigs.filter(p=>p.status).map(a=><PigCard pig={a} key={a.id_pig}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction==='EDIT' || farmAction===undefined ? <PostUpdatePig/>:<></>
        }
        {
          farmAction==='DELETE'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
        }
      </AppModal>
    </>
  )
}

export default FarmPage
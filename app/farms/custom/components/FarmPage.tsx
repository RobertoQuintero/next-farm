'use client'
import { AccessErrorComponent,  BackToFarms, DeleteComponent, EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PigCard, PostUpdatePig } from '.'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { IPig } from '@/interfaces'
import Cookie from 'js-cookie'

const FarmPage = () => {
  const {toggleModal,isModalOpen} = useContext(UiContext)
  const {idFarm,user} = useContext(AuthContext)
  const {farmsLoading,pigs,getPigs,setPig,setFarmAction,farmAction,farmsError,pig,postPig,getFarm,farm} = useContext(FarmsContext)

  useEffect(() => {
    if(idFarm){
      getFarm(idFarm)
      getPigs(idFarm)
    }else{
      let id= Number(Cookie.get('id_farm'))
      getFarm(id!)
      getPigs(id!)
    }    
  }, [idFarm])

  
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
      <AccessErrorComponent/>
        <div>
          {user?.id_role===1&&<BackToFarms/>}
        </div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <p style={{textAlign:'center',padding:'0 0 1rem 0',fontWeight:'bold'}}>{farm?.name}</p>
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
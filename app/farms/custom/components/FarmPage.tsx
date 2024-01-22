
'use client'
import { BackButton, EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PigCard, PostUpdatePig } from '.'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'

const FarmPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {farmsLoading,pigs,getPigs,setPig} = useContext(FarmsContext)

  useEffect(() => {
    getPigs(idFarm!)
  }, [])
  
  const onAdd = async() =>{
    setPig(undefined)
     toggleModal()
  };

  if(farmsLoading){
    return <LoadingComponent/>
  }



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
        {
          pigs.length
            ?pigs.map(a=><PigCard pig={a} key={a.id_pig}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        <PostUpdatePig/>
      </AppModal>
    </>
  )
}

export default FarmPage
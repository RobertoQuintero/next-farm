'use client'
import { BackButton, EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'

const GrowingPigsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getGrowingPigs,growing_pigs} = useContext(FarmsContext)
  const {user} = useContext(AuthContext)

  useEffect(() => {
    getGrowingPigs(user?.id_user!)
  }, [])
  

  const onAdd = async() =>{
     toggleModal()
  };

  const onDelete = async() =>{

    // const new ={
    //   status:false
    // } as 
     
    // const ok=await post(new)
    //  if(ok){
    //   toggleModal()
    //  }
  };

  return (
    <>
     <div className='actionCreateContainer'>
        {/* <BackButton/> */}
        <div></div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          growing_pigs.length
            ?growing_pigs.map(a=><p key={a.id_growing_lot}>{a.ubication}</p>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        <></>
        {
          // action==='EDIT' || action===undefined
              // ?<PostUpdate/>
              // :<DeleteComponent onDelete={onDelete} loading={} error={}/>
        }
      </AppModal>
    </>
  )
}

export default GrowingPigsPage
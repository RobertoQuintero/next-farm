'use client'
import { BackButton, EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { GrowingPigCard, GrowingPigsChangeStage, GrowingPigsCloseConfirm } from '.'

const GrowingPigsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getGrowingPigs,growing_pigs,farmAction} = useContext(FarmsContext)
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
      <h3 style={{padding:'0 0 1rem',textAlign:'center'}} >Crecimiento</h3>
      <div 
        // style={{display:'flex',fontWeight:'bold',fontSize:'14px',paddingLeft:'.5rem'}}
        className='pigData'
        style={{padding:'0 0 0 .4rem',fontWeight:'bold'}}
        >
        <p >Ingresado</p>
        <p>Salida</p>
        <p>Ubicación</p>
        <p>Cantidad</p>
        <p>Peso prom.</p>
        <p>Etapa</p>
      </div>
        {
          growing_pigs.filter(g=>!g.closed).length
            ?growing_pigs.filter(g=>!g.closed).map(a=><GrowingPigCard growingPig={a} key={a.id_growing_lot}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        <></>
        {
          farmAction==='STAGE'?<GrowingPigsChangeStage/>:<></>
        }
        {
          farmAction==='CLOSE'?<GrowingPigsCloseConfirm />:<></>
        }
      </AppModal>
    </>
  )
}

export default GrowingPigsPage
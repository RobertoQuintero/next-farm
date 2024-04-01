'use client'
import { BackButton, EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { GrowingPigCard, GrowingPigsChangeStage, GrowingPigsCloseConfirm } from '.'
import { IGrowingPigs } from '@/interfaces/growing_pigs'

const GrowingPigsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getGrowingPigs,growing_pigs,farmAction,farmsLoading,farmsError,postGrowingPigs,growing_pig} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)

  useEffect(() => {
    getGrowingPigs(idFarm!)
  }, [])
  

  const onAdd = async() =>{
     toggleModal()
  };

  const onDelete = async() =>{

    const newGrowing ={
      ...growing_pig,
      status:false
    } as IGrowingPigs
     
    const ok=await postGrowingPigs(newGrowing)
     if(ok){
      toggleModal()
     }
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
          growing_pigs.filter(g=>!g.closed&&g.status).length
            ?growing_pigs.filter(g=>!g.closed&&g.status).map(a=><GrowingPigCard growingPig={a} key={a.id_growing_lot}/>)
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
        {
          farmAction==='DELETE'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
        }
      </AppModal>
    </>
  )
}

export default GrowingPigsPage
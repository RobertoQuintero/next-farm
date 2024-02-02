'use client'
import { EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { StageRow } from '.'
import { PostUpdateStage } from './PostUpdateStage'

const StagesPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {stages,setStage,setFarmAction,farmAction} = useContext(FarmsContext)

  const onAdd = async() =>{
    setFarmAction(undefined)
    setStage(undefined)
     toggleModal()
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
        {
          stages.length
            ?stages.map(a=><StageRow stage={a} key={a.id_stage}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction==='EDIT' || farmAction===undefined ?<PostUpdateStage/>:<></>
        }
        {
          farmAction==='FORM'?<p></p>:<></>
        }
        
      </AppModal>
    </>
  )
}

export default StagesPage
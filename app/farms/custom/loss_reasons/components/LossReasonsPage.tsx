'use client'
import { BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { LossReasonRow } from '.'
import { PostUpdateLossReason } from './PostUpdateLossReason'
import { ILossReason } from '@/interfaces'

const LossReasonsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {lossReasons,setLossReason,setFarmAction,farmAction,farmsLoading,farmsError,lossReason,postLossReason} = useContext(FarmsContext)

  const onAdd = async() =>{
    setLossReason(undefined)
    setFarmAction(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
    const newLossReason={
      ...lossReason,
      status:false
    } as ILossReason
     
    const ok= await postLossReason(newLossReason)
    if(ok){
      toggleModal()
    }
  };

  return (
    <>
     <div className='actionCreateContainer'>
        <BackButton/>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          lossReasons.filter(l=>l.status).length
            ?lossReasons.filter(l=>l.status).map(a=><LossReasonRow lossReason={a} key={a.id_loss_reason}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction==='EDIT' || farmAction===undefined 
            ?<PostUpdateLossReason/>
            :<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
        }
      </AppModal>
    </>
  )
}

export default LossReasonsPage
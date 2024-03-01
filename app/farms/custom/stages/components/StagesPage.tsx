'use client'
import { BackButton, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { useContext } from 'react'
import { StageRow } from '.'
// import { PostUpdateStage } from './PostUpdateStage'

const StagesPage = () => {

  const {farmAction,pigStages} = useContext(FarmsContext)

  // const onCharge = async() =>{
  //    getNewStages()
  // };

  return (
    <>
     <div className='actionCreateContainer'>
        <BackButton/>
        {/* {
          !stages.length 
            ? <Button 
            onClick={onCharge}
            variant='contained' 
            color='warning'
            size='small'>Cargar</Button>
            :<></>
        } */}
      </div>
      <div>
        {
          pigStages.length
            ?pigStages.map(a=><StageRow stage={a} key={a.id_pig_stage}/>)
            :<EmptyPage title='Etapas'/>
        }
      </div>
      <AppModal>
        {
          // farmAction==='EDIT' || farmAction===undefined ?<PostUpdateStage/>:<></>
        }
        {
          farmAction==='FORM'?<p></p>:<></>
        }
      </AppModal>
    </>
  )
}

export default StagesPage
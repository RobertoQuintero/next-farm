'use client'
import { BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { PostUpdateRace, RaceRow } from '.'
import { IRace } from '@/interfaces'

const RacesPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {races,farmAction,farmsLoading,farmsError,setRace,setFarmAction,postRace,race} = useContext(FarmsContext)

  const onAdd = async() =>{
    setRace(undefined)
    setFarmAction(undefined)
    toggleModal()
  };

  const onDelete = async() =>{
    const newRace ={
      ...race,
      status:false
    } as IRace
     
    const ok=await postRace(newRace)
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
          races.filter(r=>r.status).length
            ?races.filter(r=>r.status).map(a=><RaceRow race={a} key={a.id_race}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        <></>
        {
          farmAction==='EDIT' || farmAction===undefined
              ?<PostUpdateRace/>
              :<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
        }
      </AppModal>
    </>
  )
}

export default RacesPage
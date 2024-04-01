'use client'
import { EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PigletsCard, PostUpdateGrowingPigs, PostUpdatePiglets } from '.'
import { IPiglets } from '@/interfaces'
import { AuthContext } from '@/app/context/auth/AuthContext'

const PigletsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {piglets,setFarmAction,farmAction,getCode,farmsLoading,farmsError,piglet,postPiglets,getPiglets} = useContext(FarmsContext)
  useEffect(() => {
    getPiglets(idFarm!)
  }, [])
  

  const onAdd = async() =>{
    await getCode('lot')
    setFarmAction(undefined)
    toggleModal()
  };

  const onDelete = async() =>{

    const newPiglet ={
      ...piglet,
      status:false
    } as IPiglets
     
    const ok=await postPiglets(newPiglet)
     if(ok){
      toggleModal()
     }
  };

  return (
    <>
     <div className='actionCreateContainer' >
        <div></div>     
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <h3 style={{padding:'0 0 1rem',textAlign:'center'}} >Lechones</h3>
      <div>
      <div style={{display:'flex',fontWeight:'bold',fontSize:'14px',paddingLeft:'.5rem'}}>
        <p style={{width:'100px'}}>Ingresado</p>
        <p style={{width:'50px'}}>Días</p>
        <p style={{width:'100px'}}>Ubicación</p>
        <p style={{width:'50px'}}>Cantidad</p>
      </div>
        {
          piglets.filter(p=>!p.closed&&p.status).length
            ?piglets.filter(p=>!p.closed&&p.status).map(a=><PigletsCard piglet={a} key={a.id_lot_piglets}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction===undefined
              ?<PostUpdatePiglets/>
              :<></>
        }
        {
          farmAction==='CLOSE'
              ?<PostUpdateGrowingPigs/>
              :<></>
        }
        {
          farmAction==='DELETE'
              ?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
              :<></>
        }
      </AppModal>
    </>
  )
}

export default PigletsPage
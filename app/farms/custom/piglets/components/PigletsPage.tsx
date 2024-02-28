'use client'
import { BackButton, EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { PigletsCard } from '.'

const PigletsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {piglets} = useContext(FarmsContext)

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
      <div style={{display:'flex',fontWeight:'bold',fontSize:'14px',paddingLeft:'.5rem'}}>
        <p style={{width:'100px'}}>Ingresado</p>
        <p style={{width:'50px'}}>Días</p>
        <p style={{width:'100px'}}>Ubicación</p>
        <p style={{width:'50px'}}>Cantidad</p>
      </div>
        {
          piglets.length
            ?piglets.map(a=><PigletsCard piglet={a} key={a.id_lot_piglets}/>)
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

export default PigletsPage
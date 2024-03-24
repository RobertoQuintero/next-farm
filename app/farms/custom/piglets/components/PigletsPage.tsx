'use client'
import { BackButton, EmptyPage,DeleteComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { PigletsCard, PostUpdateGrowingPigs, PostUpdatePiglets } from '.'

const PigletsPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {piglets,setFarmAction,farmAction,getCode} = useContext(FarmsContext)

  const onAdd = async() =>{
    await getCode('lot')
    setFarmAction(undefined)
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
     <div className='actionCreateContainer' >
        {/* <BackButton/> */}
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
          piglets.filter(p=>!p.closed).length
            ?piglets.filter(p=>!p.closed).map(a=><PigletsCard piglet={a} key={a.id_lot_piglets}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction===undefined
              ?<PostUpdatePiglets/>
              :<PostUpdateGrowingPigs/>
        }
      </AppModal>
    </>
  )
}

export default PigletsPage
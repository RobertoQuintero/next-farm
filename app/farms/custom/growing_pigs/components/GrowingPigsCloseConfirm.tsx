import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { Button } from '@mui/material'
import React, { useContext } from 'react'

export const GrowingPigsCloseConfirm = () => {
  const {toggleModal} = useContext(UiContext)
  const{growing_pig,postGrowingPigs}= useContext(FarmsContext)
  const onClick = async() =>{
    console.log(growing_pig)
    const growing={
      ...growing_pig,
      closed:true
    } as IGrowingPigs

    const ok = await postGrowingPigs(growing)
    if(ok){
      toggleModal()
    }
  };

  return (
    <div style={{width:'270px',textAlign:'center'}}>
      <p>¿Desea Cerrar y Finalizar la venta de esa ubicacion?</p>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Button size='small' onClick={toggleModal}>Cancelar</Button>
        <Button size='small' onClick={onClick}>Aceptar</Button>
      </div>
    </div>
  )
}

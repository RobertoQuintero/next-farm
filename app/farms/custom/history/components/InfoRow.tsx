import React, { useContext } from 'react'
import { AccordionElement } from '.';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import { UiContext } from '@/app/context/ui/UiContext';

export const InfoRow = () => {
  const {pig,setFarmAction} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick =() =>{
     setFarmAction('EDIT')
     toggleModal()
  };

  return (
    <AccordionElement title='Información' open>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <p>Código: <strong>{pig?.code}</strong></p>
          <p>Ingresado: <strong>{new Date(pig?.added_date!).toLocaleString().split(',')[0]}</strong></p>
          <p>Raza: <strong>{pig?.pig_race}</strong></p>
          <p>Ubicación: <strong>{pig?.pig_ubication}</strong></p>
          <p>Padre: <strong>{pig?.stallion}</strong></p>
          <p>Situación: <strong>{pig?.pig_stage}</strong></p>
        </div>
        <div>
          <Button size='small' color='warning' onClick={onClick} variant='contained'>Editar</Button>
        </div>
      </div>
    </AccordionElement>
  )
}

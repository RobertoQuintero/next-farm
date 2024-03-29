import React, { useContext} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import styles from './pig.module.css'
import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';

export const InfoRow = () => {
  const {pig,setFarmAction} = useContext(FarmsContext)
  const {toggleModal} = useUi()

  const onClick =(action:string) =>{
     setFarmAction(action)
     toggleModal()
  };

  return (
    <AccordionElement title='Información' open>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{fontSize:'15px'}}>
          <p>Código: <strong>{pig?.code}</strong></p>
          <p>Ingresado: <strong>{new Date(pig?.added_date!).toLocaleString().split(',')[0]}</strong></p>
          <p>Raza: <strong>{pig?.pig_race}</strong></p>
          <p>Ubicación: <strong>{pig?.pig_ubication}</strong></p>
          <p>Padre: <strong>{pig?.stallion}</strong></p>
          <p>Peso: <strong>{pig?.pig_weight}</strong></p>
          {
            !(pig?.id_pig_stage===1 || pig?.id_pig_stage===2 || pig?.id_pig_stage===6)
              ?<p>Situación: <strong >{pig?.pig_stage}</strong></p>
              :<p>Situación: <strong className={styles.stage} onClick={()=>onClick(pig?.id_pig_stage===6?'LACTATION':'CROSSING')}>{pig?.pig_stage}</strong></p>
          }
          <p>ID: <strong>{pig?.bar_code}</strong></p>
        </div>
        <div>
          <Button size='small' color='warning' onClick={()=>onClick('EDIT')} variant='contained'>Editar</Button>
        </div>
      </div>
    </AccordionElement>
  )
}

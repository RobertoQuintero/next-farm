import React, { useContext, useEffect } from 'react'
import { AccordionElement, BirthElementRow } from '.';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import styles from './pig.module.css'

export const BirthsRow = () => {
  const {pig,getBirths,births} = useContext(FarmsContext)

  useEffect(() => {
    getBirths(pig?.id_pig!)
  }, [])
  


  return (
    <AccordionElement title='Historial de Partos'>
      <div className={styles.birthRow} style={{fontWeight:'bold'}}>
        <p >Monta</p>
        <p >Tipo</p>
        <p>Semental</p>
        <p>Confirma</p>
        <p>(+/-)</p>
        <p>Parto</p>
        <p>H. vivos</p>
        <p>H. muertos</p>
        <p>Comentario</p>
      </div>
      <>
        {
          births.length
            ?births.map(a=><BirthElementRow birth={a} key={a.id_birth}/>)
            :<></>
        }
      </>
    </AccordionElement>
  )
}

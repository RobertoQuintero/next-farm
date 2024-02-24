import React, { useContext, useEffect } from 'react'
import {  BirthElementRow } from '.';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import styles from './pig.module.css'
import { AccordionElement } from '@/app/components';
import Cookies from 'js-cookie'
import { IPig } from '@/interfaces';

export const BirthsRow = () => {
  const {pig,getBirths,births} = useContext(FarmsContext)

  useEffect(() => {
    if(pig){
      getBirths(pig?.id_pig!)
    }else{
      const newPig= JSON.parse(Cookies.get('pig')!) as IPig
      getBirths(newPig.id_pig)
    }
  }, [])
  
  return (
    <AccordionElement title='Historial de Partos'>
      <div className={styles.birthContainer}>
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
            births.filter(b=>b.status).length
              ?births.filter(b=>b.status).map(a=><BirthElementRow birth={a} key={a.id_birth}/>)
              :<></>
          }
        </>

      </div>
    </AccordionElement>
  )
}

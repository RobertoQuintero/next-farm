import { IBirth } from '@/interfaces'
import React, { useContext } from 'react'
import styles from './pig.module.css'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { useUi } from '@/app/context/ui/useUi'
import { addZero, buildDateReverse } from '@/utils'


interface Props{
  birth:IBirth;
  i:number;
}
export const BirthElementRow = ({birth,i}:Props) => {
  const {pig,setBirth,setFarmAction,births} = useContext(FarmsContext)
  const {toggleModal}= useUi()

  const onConfirm = (action:string) =>{
     setBirth(birth)
     setFarmAction(action)
     toggleModal()
  };

  return (
    <div className={styles.birthRow}>
      <p>{addZero(new Date(buildDateReverse(birth.crossing_date as string))).split('-').reverse().join('/')}</p>
      <p>{birth.fertilization_type}</p>
      <p>{birth.stallion}</p>
      {
        pig?.id_pig_stage===3&& !birth.closed&&i===births.length
          ?<p onClick={()=>onConfirm('CONFIRM')} className={styles.underline}>{addZero(new Date(buildDateReverse(birth.confirm_date as string))).split('-').reverse().join('/')}</p>
          :<p >{addZero(new Date(buildDateReverse(birth.confirm_date as string))).split('-').reverse().join('/')}</p>
      }
      {
        pig?.id_pig_stage===4&& !birth.closed&&i===births.length
        ?<p onClick={()=>onConfirm('PREGNED')} className={styles.underline}>{birth.is_positive?'Positivo':'Negativo'}</p>
        :<p>{birth.is_positive?'Positivo':'Negativo'}</p>
        
      }
      {
        pig?.id_pig_stage===5&& !birth.closed&&i===births.length
        ?<p onClick={()=>onConfirm('BIRTH')} className={styles.underline}>{addZero(new Date(buildDateReverse(birth.birth_date as string))).split('-').reverse().join('/')}</p>
        :<p>{addZero(new Date(buildDateReverse(birth.birth_date as string))).split('-').reverse().join('/')}</p>
        
      }
      
      <p>{birth.alive}</p>
      <p>{birth.dead}</p>
      <p onClick={()=>onConfirm('COMMENT')} className={styles.comment}>... {birth.comment?.length?<span>{birth.comment}</span>:''}</p>
      <p>{birth.birth_type}</p>
      
    </div>
  )
}

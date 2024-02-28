import { IBirth } from '@/interfaces'
import React, { useContext } from 'react'
import styles from './pig.module.css'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { useUi } from '@/app/context/ui/useUi'


interface Props{
  birth:IBirth
}
export const BirthElementRow = ({birth}:Props) => {
  const {pig,setBirth,setFarmAction} = useContext(FarmsContext)
  const {toggleModal}= useUi()

  const onConfirm = (action:string) =>{
     setBirth(birth)
     setFarmAction(action)
     toggleModal()
  };

  return (
    <div className={styles.birthRow}>
      <p>{new Date(birth.crossing_date).toLocaleString().split(',')[0]}</p>
      <p>{birth.fertilization_type}</p>
      <p>{birth.stallion}</p>
      {
        pig?.id_pig_stage===3&& !birth.closed
          ?<p onClick={()=>onConfirm('CONFIRM')} className={styles.underline}>{new Date(birth.confirm_date).toLocaleString().split(',')[0]}</p>
          :<p >{new Date(birth.confirm_date).toLocaleString().split(',')[0]}</p>
      }
      {
        pig?.id_pig_stage===4&& !birth.closed
        ?<p onClick={()=>onConfirm('PREGNED')} className={styles.underline}>{birth.is_positive?'Positivo':'Negativo'}</p>
        :<p>{birth.is_positive?'Positivo':'Negativo'}</p>
        
      }
      {
        pig?.id_pig_stage===5&& !birth.closed
        ?<p onClick={()=>onConfirm('BIRTH')} className={styles.underline}>{new Date(birth.birth_date).toLocaleString().split(',')[0]}</p>
        :<p>{new Date(birth.birth_date).toLocaleString().split(',')[0]}</p>
        
      }
      
      <p>{birth.alive}</p>
      <p>{birth.dead}</p>
      <p onClick={()=>onConfirm('COMMENT')} className={styles.comment}>... {birth.comment?.length?<span>{birth.comment}</span>:''}</p>
      <p>{birth.birth_type}</p>
      
    </div>
  )
}

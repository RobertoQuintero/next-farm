import { IBirth } from '@/interfaces'
import React from 'react'
import styles from './pig.module.css'

interface Props{
  birth:IBirth
}
export const BirthElementRow = ({birth}:Props) => {
  return (
    <div className={styles.birthRow}>
      <p>{new Date(birth.crossing_date).toLocaleString().split(',')[0]}</p>
      <p>{birth.fertilization_type}</p>
      <p>{birth.stallion}</p>
      <p>{new Date(birth.confirm_date).toLocaleString().split(',')[0]}</p>
      <p>{birth.is_positive?'Positivo':'Negativo'}</p>
      <p>{new Date(birth.birth_date).toLocaleString().split(',')[0]}</p>
      <p>{birth.alive}</p>
      <p>{birth.dead}</p>
      <p>{birth.description}</p>
    </div>
  )
}

import { ILoss } from '@/interfaces'
import { addZero, buildDateReverse } from '@/utils'
import React from 'react'

interface Props{
  element:ILoss
}

export const LossRowElement = ({element}:Props) => {
  return (
    <div style={{display:'flex',fontSize:'14px'}}>
      <p style={{width:'100px'}}>{addZero(new Date(buildDateReverse(element.created_at as string)))}</p>
      <p style={{width:'200px'}}>{element.loss_reason}</p>
      <p style={{width:'80px'}}>{element.quantity}</p>
      <p style={{width:'150px'}}>{element.comment}</p>
    </div>
  )
}

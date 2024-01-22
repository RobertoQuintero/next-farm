import { IRoleAccess } from '@/interfaces'
import React from 'react'
interface Props{
  access:IRoleAccess
}
export const RoleAccessRow = ({access}:Props) => {
  return (
    <div className='rowCard'>
      <p>{access.name}</p>
    </div>
  )
}

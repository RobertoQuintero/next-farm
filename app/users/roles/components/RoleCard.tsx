import { IRole } from '@/interfaces/user'
import React from 'react'

interface Props{
  role:IRole
}

export const RoleCard = ({role}:Props) => {
  return (
    <div >
      <p>{role.description}</p>
    </div>
  )
}

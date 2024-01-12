import { IUser } from '@/interfaces/user'
import React from 'react'
interface Props{
  user:IUser
}

export const UserCard = ({user}:Props) => {
  return (
    <div>
      <p>{user.name}</p>
    </div>
  )
}

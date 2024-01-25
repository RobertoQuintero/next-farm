import { UiContext } from '@/app/context/ui/UiContext'
import { UsersContext } from '@/app/context/users/UsersContext'
import { IUser } from '@/interfaces/user'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
interface Props{
  user:IUser
}

export const UserCard = ({user}:Props) => {

  const {setUser,setAction,setError} = useContext(UsersContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = (action:string) =>{
     setError(undefined)
     setAction(action)
     setUser(user)
     toggleModal()
  };
 
  return (
    <div className='rowCard'>
      <p>{user.name}</p>
      <div style={{display:'flex', gap:'.5rem'}}>
        <RowButton onClick={()=>onClick('EDIT')} label='Editar'/>
        <RowButton onClick={()=>onClick('PASSWORD')} label='Pass'/>
        <RowButton onClick={()=>onClick('DELETE')} label='Borrar' color='red'/>
      </div>
    </div>
  )
}

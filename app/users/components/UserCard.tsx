import { UiContext } from '@/app/context/ui/UiContext'
import { UsersContext } from '@/app/context/users/UsersContext'
import { IUser } from '@/interfaces/user'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
interface Props{
  user:IUser
}

export const UserCard = ({user}:Props) => {

  const {setUser,setAction} = useContext(UsersContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = (action:string) =>{
     setAction(action)
     setUser(user)
     toggleModal()
  };

  return (
    <div className='rowCard'>
      <p>{user.name}</p>
      <div style={{display:'flex', gap:'.5rem'}}>
        <Button 
          size="small"
          type='submit'
          variant="outlined"  
          onClick={()=>onClick('EDIT')}
         >
         Editar
        </Button>
        <Button 
          size="small"
          type='submit'
          variant="outlined"
          onClick={()=>onClick('ACCESS')}  
         >
         Accesos
        </Button>
      </div>
    </div>
  )
}

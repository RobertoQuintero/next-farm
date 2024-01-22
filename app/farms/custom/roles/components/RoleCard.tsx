import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { IRole } from '@/interfaces/user'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

interface Props{
  role:IRole
}

export const RoleCard = ({role}:Props) => {
  const router = useRouter()
  const {setRole} = useContext(FarmsContext)
  const onClick = async(action:string) =>{
    setRole(role)
     router.push('/farms/custom/access')
  };

  return (
    <div className="rowCard">
      <p>{role.description}</p>
      <Button 
          size="small"
          onClick={()=>onClick('OPEN')}  
         >
         Accesos
        </Button>
    </div>
  )
}

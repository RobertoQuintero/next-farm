import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IFarm } from '@/interfaces/farm'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
interface Props{
  farm:IFarm
}

export const FarmCard = ({farm}:Props) => {
  const router = useRouter()
  const {setIdFarm} = useContext(AuthContext)
  const {setFarm,setError} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = (action:string) =>{
    setError(undefined)
    setFarm(farm)
    setIdFarm(farm.id_farm)
    if(action==='OPEN'){
      router.push('/farms/custom')
      return
    }
    toggleModal()
  };
 
  return (
    <div className='rowCard'>
      <p>{farm.name}</p>
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
          onClick={()=>onClick('OPEN')}  
         >
         Ver
        </Button>
      </div>
    </div>
  )
}

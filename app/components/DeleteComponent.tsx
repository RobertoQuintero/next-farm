import { Button, CircularProgress } from '@mui/material'
import { useUi } from '../context/ui/useUi';

interface Props{
  onDelete: ()=>void
  loading?:boolean;
  error?:string;
  action?: string;
}

export const DeleteComponent = ({onDelete,loading=false,error=undefined,action='Borrar'}:Props) => {
  const {toggleModal} = useUi()

  return (
    <>
    {
      loading
        ?<CircularProgress/>
        :<div style={{width:270}}>
            <p style={{textAlign:'center', color:'red',paddingBottom:'1rem',fontWeight:'bold'}}>Confirmar {action}</p>
            <p className='errorMessage'>{error?error:''}</p>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Button size='small' onClick={toggleModal}>Cancelar</Button>
              <Button size='small' onClick={onDelete}>Aceptar</Button>
            </div>
          </div>
    }
    </>
  )
}

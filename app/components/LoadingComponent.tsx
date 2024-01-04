import { CircularProgress } from '@mui/material'

export const LoadingComponent = () => {
  return (
    <div className='loading'>
       <CircularProgress />
       <p>Espere un momento...</p>
     </div>
  )
}


'use client'
import { BackButton, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { PostUpdatePig } from '.'

const FarmPage = () => {
  const {toggleModal} = useContext(UiContext)

  const onAdd = async() =>{
     toggleModal()
  };

  return (
    <>
     <div className='actionCreateContainer'>
        <div>
          <BackButton/>
        </div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          // cuentasMayor.length
          //   ?cuentasMayor.map(a=><p key={a}>{a}</p>)
          //   :<EmptyPage/>
        }
      </div>
      <AppModal>
        <PostUpdatePig/>
      </AppModal>
    </>
  )
}

export default FarmPage
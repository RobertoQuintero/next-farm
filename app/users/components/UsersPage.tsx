'use client'
import { Button} from '@mui/material'
import styles from '../users.module.css'
import AppModal from '@/app/components/AppModal';
import { PostUpdateUser } from '.';
import { useContext, useEffect } from 'react';
import { EmptyPage, LoadingComponent } from '@/app/components';
import { UiContext } from '@/app/context/ui/UiContext';
import { AuthContext } from '@/app/context/auth/AuthContext';
import { UsersContext } from '@/app/context/users/UsersContext';

const UsersPage = () => {
  const {company} = useContext(AuthContext)
  const {userLoading,userError,users,setUser,getJobPositions} = useContext(UsersContext)
  const {toggleModal} = useContext(UiContext)

  useEffect(() => {
    getJobPositions(company?.id_company!)
  }, [])
  
  if(userLoading){
    return <LoadingComponent/>
  }
  const onAdd = async() =>{
     setUser(undefined)
     toggleModal()
  };


  return (
    <>
      <div className={styles.onAdd}>
        <Button
          size='small'
          variant='contained'
          color='success'
          onClick={onAdd}
        >
          Nuevo</Button>
      </div>
      <div className='pageCardList'>
          {
            users.length
              ?users.map(u=><p key={u.id_user}>{u.name}</p>)
              : <EmptyPage/>
          }
      </div>
      <AppModal>
        <PostUpdateUser/>
      </AppModal>
    </>
  )
}

export default UsersPage
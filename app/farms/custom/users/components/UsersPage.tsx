'use client'
import { Button} from '@mui/material'
import styles from '../users.module.css'
import AppModal from '@/app/components/AppModal';
import { PostUpdateUser, UserCard } from '.';
import { useContext, useEffect } from 'react';
import { EmptyPage, LoadingComponent } from '@/app/components';
import { UiContext } from '@/app/context/ui/UiContext';
import { UsersContext } from '@/app/context/users/UsersContext';
import { AuthContext } from '@/app/context/auth/AuthContext';

const UsersPage = () => {
  const {userLoading,users,setUser,actionString,setAction,setError,getUsers} = useContext(UsersContext)
  const {toggleModal,isModalOpen} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)

  useEffect(() => {
    getUsers(idFarm!)
  }, [])
  


  if(userLoading && !isModalOpen){
    return <LoadingComponent/>
  }
  const onAdd = async() =>{
      setError(undefined)
     setUser(undefined)
     setAction(undefined)
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
      <div style={{paddingTop:'1rem'}}>
          {
            users.length
              ?users.map(u=><UserCard user={u} key={u.id_user}/>)
              : <EmptyPage/>
          }
      </div>
      <AppModal>
        {
          actionString==='EDIT' && <PostUpdateUser/>
        }
        {
          !actionString && <PostUpdateUser/>
        }
      </AppModal>
    </>
  )
}

export default UsersPage
'use client'
import { Button} from '@mui/material'
import styles from '../users.module.css'
import AppModal from '@/app/components/AppModal';
import { PostPassword, PostUpdateUser, UserCard } from '.';
import { useContext, useEffect } from 'react';
import { AccessErrorComponent, DeleteComponent, EmptyPage, LoadingComponent } from '@/app/components';
import { UiContext } from '@/app/context/ui/UiContext';
import { UsersContext } from '@/app/context/users/UsersContext';
import { AuthContext } from '@/app/context/auth/AuthContext';
import { IUser } from '@/interfaces';

const UsersPage = () => {
  const {userLoading,users,setUser,actionString,setAction,setError,getUsers,userError,user,postUser} = useContext(UsersContext)
  const {toggleModal,isModalOpen} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)

  useEffect(() => {
    let id= idFarm
    if(!idFarm){
     id= Number(localStorage.getItem('id_farm'))
    }
    getUsers(id!) 
  }, [])
  
  const onDelete = async() =>{
     const newUser={...user,status:false} as IUser
     const ok= await postUser(newUser)
    if(ok){
      toggleModal()
    }
  };

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
        <AccessErrorComponent/>
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
            users.filter(u=>u.status).length
              ?users.filter(u=>u.status).map(u=><UserCard user={u} key={u.id_user}/>)
              : <EmptyPage/>
          }
      </div>
      <AppModal>
        {
          actionString==='EDIT' || actionString===undefined ?<PostUpdateUser/>:<></>
        }
        {
          actionString==='DELETE' ? <DeleteComponent onDelete={onDelete} loading={userLoading} error={userError}/>:<></>
        }
        {
          actionString==='PASSWORD'?<PostPassword/>:<></>
        }
      </AppModal>
    </>
  )
}

export default UsersPage
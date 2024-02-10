'use client'
import { SaveButton } from "@/app/components"
import { AuthContext } from "@/app/context/auth/AuthContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { UsersContext } from "@/app/context/users/UsersContext"
import { IUser } from "@/interfaces/user"
import { MenuItem, Switch, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"

export const PostUpdateUser = () => {
  const {toggleModal} = useContext(UiContext)
  const {user,userLoading,roles,postUser,userError} = useContext(UsersContext)
  const {idFarm} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>()

  const values={
    id_user:user?user.id_user:0,
    name:user?user.name:'',
    email:user?user.email:'',
    phone:user?user.phone:'',
    img_url:user?user.img_url:'',
    id_role:user?user.id_role:3,
    status:user?user.status:true,
    is_active:user?user.is_active:true,
    zip:user?user.zip:'',
    address:user?user.address:'',
    id_state:user?user.id_state:1,
    id_farm:user?user.id_farm:idFarm,
  } as IUser
  const [checked, setChecked] = useState(values.is_active);

  const onSubmit = async(data:IUser) =>{
    const date= new Date()

    data.created_at=date
    data.updated_at=date
    data.id_user=values.id_user
    data.status=values.status
    data.is_active=checked
    data.id_farm=values.id_farm
    data.img_url=values.img_url
    data.zip=''
    data.id_state=0
    data.address=values.address
    console.log(data)
    // return
    const ok= await postUser(data)
    if(ok){
      toggleModal()
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <form className="Form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
          size="small"
          label='Nombre'
          fullWidth
          type="text"
          defaultValue={values.name} 
          {...register('name',{
            required:'Este campo es requerido',
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
           />
      <TextField
          size="small"
          label='Teléfono'
          fullWidth
          type="text"
          defaultValue={values.phone} 
          {...register('phone',{
            required:'Este campo es requerido',
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
           />
          <TextField
            size="small"
            label='Rol'
            fullWidth
            defaultValue={values.id_role}
            {...register('id_role')} 
            select >
            {
              roles.length
              ?roles.map(item=>(
                <MenuItem 
                  key={item.id_role} 
                  value={item.id_role}>
                  {item.description}
                </MenuItem>
              ))
              :<div></div>
            }
          </TextField>
          {
            !user&&<>
              <TextField
            size="small"
            label='Email'
            fullWidth
            type="email"
            defaultValue={values.email} 
            {...register('email',{
              required:'Este campo es requerido',
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            />
        <TextField
          size="small"
          label='Password'
          fullWidth
          type="password"
          defaultValue={values.password} 
          {...register('password',{
            required:'Este campo es requerido',
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
            />
            </>
          }
           <div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
              <p>{checked?'Activo':'Inactivo'}</p>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
           {userError?<p className="error">{userError}</p>:<></>}
           <SaveButton loading={userLoading}/>
    </form>
  )
}

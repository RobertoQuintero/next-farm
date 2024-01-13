'use client'
import { AuthContext } from "@/app/context/auth/AuthContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { UsersContext } from "@/app/context/users/UsersContext"
import { IUser } from "@/interfaces/user"
import { Button, CircularProgress, MenuItem, Switch, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"

export const PostUpdateUser = () => {
  const {toggleModal} = useContext(UiContext)
  const {user,userLoading,jobPositions,roles,postUser,userError} = useContext(UsersContext)
  const {company} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>()

  const values={
    id_user:user?user.id_user:0,
    email:user?user.email:'',
    id_job_position:user?user.id_job_position:1,
    id_role:user?user.id_role:1,
    name:user?user.name:'',
    phone:user?user.phone:'',
    password:user?user.password:'',
    status:user?user.status:true,
    is_active:user?user.status:true
  } as IUser
  const [checked, setChecked] = useState(values.is_active);

  const onSubmit = async(data:IUser) =>{
    const date= new Date()
    if(!user){
      data.id_role=values.id_role
      data.created_at=date
    }
    data.id_user=values.id_user
    data.updated_at=date
    data.status=values.status
    data.is_active=checked
    data.id_company=company?.id_company!
    data.img_url=''
    // console.log(data)
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
            label='Puesto'
            fullWidth
            defaultValue={values.id_job_position}
            {...register('id_job_position')} 
            select >
            {
              jobPositions.length
              ?jobPositions.map(item=>(
                <MenuItem 
                  key={item.id_job_position} 
                  value={item.id_job_position}>
                  {item.description}
                </MenuItem>
              ))
              :<div></div>
            }
          </TextField>
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
          <Button 
            size="small"
            type='submit'
            variant="contained"
            fullWidth     
            disabled={userLoading} >
            {
              userLoading
              ?<CircularProgress size='1.5rem' />
              :'Guardar'
            }
          </Button>

    </form>
  )
}

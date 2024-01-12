'use client'
import { UiContext } from "@/app/context/ui/UiContext"
import { UsersContext } from "@/app/context/users/UsersContext"
import { IUser } from "@/interfaces/user"
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material"
import { useContext } from "react"
import { useForm } from "react-hook-form"

export const PostUpdateUser = () => {
  const {toggleModal} = useContext(UiContext)
  const {user,userLoading,jobPositions,roles} = useContext(UsersContext)

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
  } as IUser

  const onSubmit = async(data:IUser) =>{
    const date= new Date()
    if(!user){
      data.id_role=values.id_role
      data.created_at=date
    }
    data.id_user=values.id_user
    data.updated_at=date
    data.status=values.status
    console.log(data)
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

'use client'
import { AuthContext } from "@/app/context/auth/AuthContext"
import { FarmsContext } from "@/app/context/farms/FarmsContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { UsersContext } from "@/app/context/users/UsersContext"
import { IFarm } from "@/interfaces/farm"
import { IUser } from "@/interfaces/user"
import { Button, CircularProgress, MenuItem, Switch, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"

export const PostUpdateFarm = () => {
  const {toggleModal} = useContext(UiContext)
  const {farm,farmsLoading,postFarm,farmsError} = useContext(FarmsContext)
  const {company,user} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFarm>()

  const values={
    id_farm:farm?farm.id_farm:0,
    name:farm?farm.name:'',
    address:farm?farm.address:'',
    id_user:farm?farm.id_user:user?.id_user,
    zip:farm?farm.zip:'',
    phone:farm?farm.phone:'',
    status:farm?farm.status:true,
    
  } as IFarm
  const [checked, setChecked] = useState(values.status);

  const onSubmit = async(data:IFarm) =>{

    data.id_farm=values.id_farm
    data.created_at=new Date()
    data.id_user=values.id_user
    data.status=checked
    
    const ok= await postFarm(data)
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
          label='Dirección'
          fullWidth
          type="text"
          defaultValue={values.address} 
          {...register('address',{
            required:'Este campo es requerido',
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
           />
      <TextField
          size="small"
          label='C.P.'
          fullWidth
          type="text"
          defaultValue={values.zip} 
          {...register('zip',{
            required:'Este campo es requerido',
          })}
          error={!!errors.zip}
          helperText={errors.zip?.message}
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
          
           <div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
              <p>{checked?'Activo':'Inactivo'}</p>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
           {farmsError?<p className="error">{farmsError}</p>:<></>}
          <Button 
            size="small"
            type='submit'
            variant="contained"
            fullWidth     
            disabled={farmsLoading} >
            {
              farmsLoading
              ?<CircularProgress size='1.5rem' />
              :'Guardar'
            }
          </Button>

    </form>
  )
}

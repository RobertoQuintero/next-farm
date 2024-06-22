import { SaveButton } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IUbication } from '@/interfaces'
import { MenuItem, Switch, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateUbication = () => {
  const {ubication,pigTypes,farmsLoading,postUbication} = useContext(FarmsContext)
  const  {idFarm}= useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUbication>()

  const values={
    id_ubication:ubication?ubication.id_ubication:0,
    id_pig_type:ubication?ubication.id_pig_type:3,
    description:ubication?ubication.description:'',
    status:ubication?ubication.status:true,
    is_general:ubication?ubication.is_general:false,
    id_farm:ubication?ubication.id_farm:idFarm
  } as IUbication
  const [pigType, setPigType] = useState(values.id_pig_type)

  const [checked, setChecked] = React.useState(values.is_general);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit=async(data:IUbication)=>{
    const date = new Date()
    data.id_ubication=values.id_ubication
    data.updated_at=date
    data.created_at=date
    data.status=values.status
    data.id_farm=values.id_farm
    data.is_general=checked
    data.id_pig_type=pigType
  
    const ok= await postUbication(data)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Descripción'
        type="text"
        defaultValue={values.description}
        {...register('description',{
          required:'Este campo es requerido',
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
        />
        <TextField
          size="small"
          label='Tipo'
          value={pigType}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setPigType(+e.target.value)
          }}
          select >
          {
            pigTypes.length
            ?pigTypes.map(item=>(
              <MenuItem 
                key={item.id_pig_type} 
                value={item.id_pig_type}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        {
          ubication?.id_pig_type===2 || pigType===2
            ?(<div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
              <p>{checked?'Es general':'No es general'}</p>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              </div>):<></>
        }
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}

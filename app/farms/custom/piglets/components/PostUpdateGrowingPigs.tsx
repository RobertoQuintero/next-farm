import {  MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { IPiglets } from '@/interfaces'
import { buildDate } from '@/utils'
import { useRouter } from 'next/navigation'

export const PostUpdateGrowingPigs = () => {
  const {toggleModal} = useContext(UiContext)
  const {user,idFarm} = useContext(AuthContext)
  const {growing_pig,ubications,pigStages,farmsLoading,postGrowingPigs,piglet,postPiglets,postInitGrowingPig,general_ubication} = useContext(FarmsContext)
  const [date, setDate] = useState<Date | null>(new Date())
  const [error, setError] = useState<string | undefined>(undefined)
  const router= useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGrowingPigs>()

  const values={
    id_growing_lot:growing_pig?growing_pig.id_growing_lot:0,
    id_pig_stage:growing_pig?growing_pig.id_pig_stage:pigStages.filter(p=>p.id_pig_type===2)[0].id_pig_stage,
    id_ubication:growing_pig?growing_pig.id_ubication:ubications.filter(p=>p.id_pig_type===2)[0].id_ubication,
    quantity:growing_pig?piglet?.quantity:'',
    created_at:growing_pig?growing_pig.created_at: new Date(),
    exit_date:growing_pig?growing_pig.exit_date: new Date(),
    start_date:growing_pig?growing_pig.start_date: new Date(),
    id_user:growing_pig?growing_pig.id_user: user?.id_user,
    closed:growing_pig?growing_pig.closed: false,
    status:growing_pig?growing_pig.status: true,
    average_weight:growing_pig?growing_pig.average_weight: '',
    id_farm:growing_pig?growing_pig.id_farm: idFarm,
  } as IGrowingPigs


  const onSubmit=async(data:IGrowingPigs)=>{
    setError(undefined)
    if(!general_ubication){
      setError('Agrega una ubicación general')
      return
    }
    const newDate= new Date(date!)
    newDate.setMonth(newDate.getMonth()+5)
    console.log(piglet?.quantity)
    const newAdd={
      ...values,
      ...data,
      start_date:buildDate(date!),
      exit_date:buildDate(newDate!),
      quantity:data.quantity,
      id_ubication:general_ubication.id_ubication,
      average_weight:0
    } as IGrowingPigs

    const newPiglet={
      ...piglet,
      status:Number(data.quantity)!==piglet?.quantity,
      closed:Number(data.quantity)===piglet?.quantity,
      id_user:user?.id_user!,
      quantity:piglet?.quantity!-Number(data.quantity)
    } as IPiglets

    // console.log(newAdd)
    // console.log(newPiglet)
    // return
   
    Promise.all([
      postPiglets(newPiglet),
      postInitGrowingPig(newAdd)
    ]).then(res=>{
      toggleModal()
    })
    
  }

  const goUbications = () =>{
    toggleModal()
     router.push('/farms/custom/ubications')
  };

  
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
         {/* <TextField
          size="small"
          label='Ubicaciones'
          fullWidth
          defaultValue={values.id_ubication}
          {...register('id_ubication')} 
          select >
          {
            ubications.filter(p=>p.id_pig_type===2).length
            ?ubications.filter(p=>p.id_pig_type===2).map(item=>(
              <MenuItem 
                key={item.id_ubication} 
                value={item.id_ubication}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField> */}
        <TextField
          size="small"
          label='Etapa'
          fullWidth
          defaultValue={values.id_pig_stage}
          {...register('id_pig_stage')} 
          select >
          {
            pigStages.filter(p=>p.id_pig_type===2).length
            ?pigStages.filter(p=>p.id_pig_type===2).map(item=>(
              <MenuItem 
                key={item.id_pig_stage} 
                value={item.id_pig_stage}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
         {/* <TextField 
          size="small"
          fullWidth
          label='Peso promedio'
          type="number"
          defaultValue={values.average_weight}
          {...register('average_weight',{
            required:'Este campo es requerido',
            min:1
          })}
          error={!!errors.average_weight}
          helperText={errors.average_weight?.message}
          /> */}
         <TextField 
          size="small"
          fullWidth
          label='Cantidad'
          type="number"
          defaultValue={values.quantity}
          {...register('quantity',{
            required:'Este campo es requerido',
            min:1,
            max:piglet?.quantity
          })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
          />
          <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha Ingreso</p>
          <DatePickerElement date={date} setDate={setDate}/>
        </div>
          {
            error?<p style={{fontSize:'13px',color:'red',textAlign:'center',cursor:'pointer'}} onClick={goUbications}>{error}</p>:<></>
          }
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}

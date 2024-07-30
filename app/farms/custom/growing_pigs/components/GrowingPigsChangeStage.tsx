import { DatePickerElement, SaveButton } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IUbication } from '@/interfaces'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { buildDate, buildDateReverse } from '@/utils'
import { MenuItem, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

export const GrowingPigsChangeStage = () => {
  const {toggleModal} = useContext(UiContext)
  const {growing_pig,pigStages,farmsLoading,postGrowingPigs,ubications,growing_pigs,postUbicationForm} = useContext(FarmsContext)
  const {idFarm,user} = useContext(AuthContext)
  const [addUbication, setAddUbication] = useState(false)
  const [newUbication, setNewUbication] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const newUbications = () =>{
    const array=[] as IUbication[]
    for (const p of ubications.filter(f=>f.id_pig_type===2)) {
      if(!growing_pigs.find(a=>a.id_ubication===p.id_ubication)){
          array.push(p)
      }
    }
    if(growing_pig){
      array.push(ubications.find(u=>u.id_ubication===growing_pig.id_ubication)!)
    }
    return array
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGrowingPigs>()

  const values={
    id_growing_lot:growing_pig?growing_pig.id_growing_lot:0,
    average_weight:growing_pig?growing_pig.average_weight:'',
    quantity:growing_pig?growing_pig.quantity:0,
    id_pig_stage:growing_pig?growing_pig.id_pig_stage:pigStages.filter(p=>p.id_pig_type===2)[0].id_pig_stage,
    id_ubication:growing_pig?growing_pig.id_ubication:newUbications()[0]?.id_ubication,
    created_at:growing_pig?growing_pig?.created_at:buildDate(new Date()),
    start_date:growing_pig?new Date(buildDateReverse(growing_pig?.start_date! as string)):new Date(),
    id_farm:idFarm,
    closed:false,
    status:true,
    id_user:user?.id_user,

  } as IGrowingPigs

  const [date, setDate] = useState<Date|null>(values.start_date as Date)

  const onSubmit = async(data:IGrowingPigs) =>{
    // e.preventDefault()
    // if(growing_pig?.id_pig_stage===Number(stage)){
    //   toggleModal()
    //   return
    // }
    const newDate= new Date(date!)
    newDate.setMonth(newDate.getMonth()+5)
    const growing={
      ...values,
      ...data,
      quantity:values.quantity,
      average_weight:Number(data.average_weight)?data.average_weight:0,
      start_date:buildDate(date!),
      exit_date:buildDate(newDate!)
    } as IGrowingPigs

    if(addUbication){
      const ubication={
        id_ubication:0,
        created_at:newDate,
        description:newUbication.toUpperCase(),
        id_farm:idFarm,
        id_pig_type:2,
        status:true,
        updated_at:newDate,
        is_general:false
      } as IUbication

      const {ok,data:d} = await postUbicationForm(ubication)
      console.log(d)
      if(ok){
        growing.id_ubication=(d as IUbication).id_ubication 
      }else{
        setError(d as string)
        return
      }
    }

    //  console.log(growing)
    //  return
  
     const ok= await postGrowingPigs(growing)
     if(ok){
      toggleModal()
     }
  };

  return (
    <form className='Form' style={{width:'270px'}} onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        disabled
        size="small"
        fullWidth
        label='Cantidad'
        type="number"
        defaultValue={values.quantity}
        {...register('quantity',{min:1})}
        />
      {
        growing_pig&&<TextField 
        size="small"
        fullWidth
        label='Peso Promedio'
        type="number"
        defaultValue={values.average_weight}
        {...register('average_weight',{min:1})}
        />
      }
      <TextField
          size="small"
          label='Etapa'
          defaultValue={values.id_pig_stage}
          {...register('id_pig_stage')}
          select >
          {
            pigStages.length
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
        {addUbication?<></>:<p onClick={()=>setAddUbication(true)} style={{textAlign:'right', fontSize:'14px', textDecoration:'underline',cursor:'pointer'}}>Agregar</p>}
        {
          addUbication
            ?<>
              <TextField 
                size="small"
                fullWidth
                label='Ubicación'
                type="text"
                value={newUbication}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                  setNewUbication(e.target.value)
                }}
              />
              {error?<p style={{fontSize:'13px', color:'red', textAlign:'center'}}>{error}</p>:<></>}
            </>
            :<TextField
            size="small"
            label='Ubicación'
            fullWidth
            defaultValue={values.id_ubication}
            {...register('id_ubication')} 
            select >
            {
              newUbications().length
              ?newUbications().map(item=>(
                <MenuItem 
                  key={item.id_ubication} 
                  value={item.id_ubication}>
                  {item.description}
                </MenuItem>
              ))
              :<div></div>
            }
          </TextField>
        }



      {/* <TextField
          size="small"
          label='Ubicación'
          defaultValue={values.id_ubication}
          {...register('id_ubication')}
          select >
          {
            newUbications().length
            ?newUbications().map(item=>(
              <MenuItem 
                key={item.id_ubication} 
                value={item.id_ubication}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField> */}
        <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha ingreso</p>
          <DatePickerElement date={date} setDate={setDate}/>
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}


import {  MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { IPiglets, IUbication } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { buildDate } from '@/utils'

export const PostUpdatePiglets = () => {
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,farmsError,ubications,piglet,pigStages,piggletCode,postNewPiglets,postPiglets,piglets,postUbicationForm} = useContext(FarmsContext)
  const {user,idFarm} = useContext(AuthContext)
  const [date, setDate] = useState<Date | null>(new Date())
  const [addUbication, setAddUbication] = useState(false)
  const [newUbication, setNewUbication] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPiglets>()

  const newUbications = () =>{
    const array=[] as IUbication[]
    for (const p of ubications.filter(f=>f.id_pig_type!==2)) {
      if(!piglets.find(a=>a.id_ubication===p.id_ubication)){
          array.push(p)
      }
    }
    if(piglet){
      array.push(ubications.find(u=>u.id_ubication===piglet.id_ubication)!)
    }
    return array
  };

  const values={
    id_ubication:piglet?piglet.id_ubication:newUbications()[0].id_ubication,
    id_pig_stage:piglet?piglet.id_ubication:pigStages.filter(u=>u.id_pig_type===1)[0].id_pig_stage,
  } as IPiglets


  const onSubmit=async(data:IPiglets)=>{
    setError(undefined)
    const newDate=buildDate(new Date())
    const newPiglets={
      id_lot_piglets:0,
      id_birth:0,
      quantity:0,
      created_at:buildDate(date as Date),
      id_user:user?.id_user,
      id_ubication:data.id_ubication,
      id_pig_stage:data.id_pig_stage,
      id_farm:idFarm,
      status:true,
      closed:false,
      close_date:newDate,
      code:piggletCode,
      
    } as IPiglets

    if(addUbication){
      const ubication={
        id_ubication:0,
        created_at:newDate,
        description:newUbication.toUpperCase(),
        id_farm:idFarm,
        id_pig_type:1,
        status:true,
        updated_at:newDate,
        is_general:false
      } as IUbication

      const {ok,data:d} = await postUbicationForm(ubication)
      if(ok){
        newPiglets.id_ubication=(d as IUbication).id_ubication 
      }else{
        setError(d as string)
        return
      }
    }

    const ok= await postPiglets(newPiglets)
    if(ok){
      toggleModal()
    }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      
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
        <TextField
          size="small"
          label='Etapa'
          fullWidth
          defaultValue={values.id_pig_stage}
          {...register('id_pig_stage')} 
          select >
          {
            pigStages.length
            ?pigStages.filter(u=>u.id_pig_type===1).map(item=>(
              <MenuItem 
                key={item.id_pig_stage} 
                value={item.id_pig_stage}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha Ingreso</p>
          <DatePickerElement date={date} setDate={setDate}/>
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}

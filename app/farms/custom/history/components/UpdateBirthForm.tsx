import { MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { IBirth, IPig, IPiglets } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { addZero } from '@/utils'

export const UpdateBirthForm = () => {
  const {user} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
  const {birth,birthTypes,farmsLoading,pig,postPig,postBirth,createTasksToDo,piggletCode,postNewPiglets,farmAction,getTasks} = useContext(FarmsContext)
  const [date, setDate] = useState<Date | null>(new Date(birth?.birth_date!))
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBirth>()

  const values={
    dead:birth?birth.dead===0?'':birth.dead:'',
    alive:birth?birth.alive===0?'':birth.alive:'',
    id_birth_type:birth?birth.id_birth_type:1,
    comment:birth?birth.comment:'',
  } as IBirth


  const onSubmit=async(data:IBirth)=>{
    if(farmAction==='COMMENT'){
      const comment={...birth,comment:data.comment} as IBirth
    const ok= await postBirth(comment)
    if(ok){
      toggleModal()
    }
    return
  }

    if(pig?.id_pig_stage===6){
      const newBirth={
        ...birth,
        dead:Number(data.dead),
      alive:Number(data.alive),
      comment:data.comment.trim(),
      } as IBirth

      const ok= await postBirth(newBirth)
      if(ok){
        toggleModal()
      }
      return
    }

    const newBirth={
      ...birth,
      dead:Number(data.dead),
      alive:Number(data.alive),
      birth_date:date,
      comment:data.comment.trim(),
      id_user_birth:user?.id_user,
      id_birth_type:data.id_birth_type
    } as IBirth

    const is_normal=Number(newBirth.id_birth_type)===1

    const newPig={
      ...pig,
      id_pig_stage:is_normal?6:2
    } as IPig

    const piglets={
      id_lot_piglets:0,
      id_birth:birth?.id_birth,
      quantity:data.alive,
      created_at:date,
      close_date:date,
      id_user:user?.id_user,
      id_ubication:pig?.id_ubication,
      id_pig_stage:7,
      code:piggletCode,
      status:true,
      closed:false,
      id_farm:pig?.id_farm
    } as IPiglets
    
          Promise.all([
            postPig(newPig),
            postBirth(newBirth),
            is_normal&& createTasksToDo({id_pig:newPig.id_pig,id_pig_stage:newPig.id_pig_stage,id_user:user?.id_user!,id_lot_piglets:0,id_farm:newPig.id_farm,added_date:addZero(new Date(newPig.added_date))}),
            pig?.id_pig_stage===5&&postNewPiglets(piglets).then(async(resp)=>{
              if(resp){
                await createTasksToDo({id_pig:0,id_pig_stage:7,id_user:user?.id_user!,id_lot_piglets:resp as number,id_farm:newPig.id_farm,added_date:addZero(date!)})
              }
            })
          ])
            .then(res=>{
              getTasks(newPig.id_pig,'pig')
              toggleModal()
            })
            .catch(error=>{
              console.log({error})
            })

  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        multiline 
        rows={2}
        fullWidth
        label='Comentarios'
        type="text"
        defaultValue={values.comment}
        {...register('comment')}
        />
        {
          farmAction!=='COMMENT'
            ?<>
            {
              pig?.id_pig_stage===6
                ?<></>
                :<TextField
                size="small"
                label='Tipo'
                fullWidth
                defaultValue={values.id_birth_type}
                {...register('id_birth_type')} 
                select >
                {
                  birthTypes.length
                  ?birthTypes.map(item=>(
                    <MenuItem 
                      key={item.id_birth_type} 
                      value={item.id_birth_type}>
                      {item.description}
                    </MenuItem>
                  ))
                  :<div></div>
                }
              </TextField>
            }
            {
              pig?.id_pig_stage===6
                ?<></>
                :<>
                <TextField 
              size="small"
              fullWidth
              label='Hijos vivos'
              type="number"
              defaultValue={values.alive}
              {...register('alive',{min:1})}
            />
            <TextField 
              size="small"
              fullWidth
              label='Hijos muertos'
              type="number"
              defaultValue={values.dead}
              {...register('dead',{min:0})}
            />
                <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
                  <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha parto</p>
                  <DatePickerElement date={date} setDate={setDate}/>
                </div>
                </>
            }
          </>:<></>
        }
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}


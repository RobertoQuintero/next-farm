import { MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { IPig, IPiglets, ITask, IUbication } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { addZero, buildDate } from '@/utils'
import Cookies from 'js-cookie'

interface Props{
  fromTask?:boolean;
}

export const UpdateTask = ({fromTask=false}:Props) => {
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,task,updateTasks,postPig,postPiglets,createTasksToDo,ubications,pigs,getTasks,postUbicationForm,piglets,taskStartDate,taskEndDate,getAllTasks} = useContext(FarmsContext)
  const {user,idFarm} = useContext(AuthContext)
  const [addUbication, setAddUbication] = useState(false)
  const [newUbication, setNewUbication] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
console.log(fromTask)
  const newUbications = () =>{
    const array=[] as IUbication[]
    for (const p of ubications.filter(f=>f.id_pig_type===3)) {
      if(!pigs.find(a=>a.id_ubication===p.id_ubication)){
          array.push(p)
      }
    }
    return array
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>()

  const values={
    start_date:task?task.start_date:new Date(),
    comment:task?task.comment:''
  } as ITask

  const [addedDate, setAddedDate] = useState<Date | null>(new Date(values.start_date))
  const [idUbication, setIdUbication] = useState(newUbications()[0].id_ubication)

  const onSubmit=async(data:ITask)=>{
    const date=buildDate(new Date())
    const newTask={
      ...task,
      start_date:buildDate(addedDate!),
      comment:data.comment,
      done:true,
      id_user:user?.id_user
    } as ITask


    if(newTask.end_stage){
      if(newTask.id_pig){
        const searchedPig= pigs.find(p=>p.id_pig===newTask.id_pig)
        const newPig={
          ...searchedPig,
          id_pig_stage:newTask.change_to_stage
        } as IPig
        if(task?.is_movement_task){
         newPig.id_ubication=idUbication 
        }

        if(addUbication){
          const ubication={
            id_ubication:0,
            created_at:date,
            description:newUbication.toUpperCase(),
            id_farm:idFarm,
            id_pig_type:3,
            status:true,
            updated_at:date
          } as IUbication
    
          const {ok,data:d} = await postUbicationForm(ubication)
          if(ok){
            newPig.id_ubication=(d as IUbication).id_ubication 
          }else{
            setError(d as string)
            return
          }
        }

        Promise.all([
          postPig(newPig),
          updateTasks(newTask),
          createTasksToDo({id_lot_piglets:0,id_user:user?.id_user!,id_pig:newPig.id_pig,id_pig_stage:newPig.id_pig_stage,id_farm:searchedPig?.id_farm!,added_date:addZero(new Date(newPig.added_date))})
        ]).then(async res=>{
          if(fromTask){
            const start=addZero(taskStartDate!) 
            const end=new Date(taskEndDate!)
            end.setDate(end.getDate()+1)
            await getAllTasks({startDate:start,endDate:addZero(end),id_farm:idFarm! || +Cookies.get('id_farm')!})
          }else{
            
            await getTasks(searchedPig?.id_pig!,'pig')
           }
          toggleModal()
          return
        })

      }else if(newTask.id_lot_piglets){
        const searchedPiglet= piglets.find(p=>p.id_lot_piglets===newTask.id_lot_piglets)
        const newLot={
          ...searchedPiglet,
          id_pig_stage:newTask.change_to_stage
        } as IPiglets
        if(task?.is_movement_task){
          newLot.id_ubication=idUbication 
         }

         if(addUbication){
          const ubication={
            id_ubication:0,
            created_at:date,
            description:newUbication.toUpperCase(),
            id_farm:idFarm,
            id_pig_type:1,
            status:true,
            updated_at:date
          } as IUbication
    
          const {ok,data:d} = await postUbicationForm(ubication)
          if(ok){
            newLot.id_ubication=(d as IUbication).id_ubication 
          }else{
            setError(d as string)
            return
          }
        }
        Promise.all([
          postPiglets(newLot),
          updateTasks(newTask),
          createTasksToDo({id_lot_piglets:newLot.id_lot_piglets,id_user:user?.id_user!,id_pig:0,id_pig_stage:newLot.id_pig_stage,id_farm:newLot.id_farm,added_date:addZero(addedDate!)})
        ]).then(async res=>{
          if(searchedPiglet&&!fromTask){
            await getTasks(searchedPiglet?.id_lot_piglets!,'lot')
           }
           if(fromTask){
            const start=addZero(taskStartDate!) 
            const end=new Date(taskEndDate!)
             end.setDate(end.getDate()+1)
            await getAllTasks({startDate:start,endDate:addZero(end),id_farm:idFarm! || +Cookies.get('id_farm')!})
           }
          toggleModal()
          return
        })
      }

    }else{
      const searchedPig= pigs.find(p=>p.id_pig===newTask.id_pig)
      const searchedPiglet= piglets.find(p=>p.id_lot_piglets===newTask.id_lot_piglets)
      const taskPig={...searchedPig,id_ubication:idUbication} as IPig
      const taskPiglet={...searchedPiglet,id_ubication:idUbication} as IPiglets

      if(addUbication){
        const ubication={
          id_ubication:0,
          created_at:date,
          description:newUbication.toUpperCase(),
          id_farm:idFarm,
          id_pig_type:searchedPig?3:1,
          status:true,
          updated_at:date
        } as IUbication
  
        const {ok,data:d} = await postUbicationForm(ubication)
        if(ok){
          if(searchedPig){

            taskPig.id_ubication=(d as IUbication).id_ubication 
          }else{
            taskPiglet.id_ubication=(d as IUbication).id_ubication 
          }
        }else{
          setError(d as string)
          return
        }
      }


      Promise.all([
        updateTasks(newTask),
        searchedPig&&newTask.is_movement_task&&postPig(taskPig),
        searchedPiglet&&newTask.is_movement_task&&postPiglets(taskPiglet),
      ]).then(async res=>{
        if(searchedPiglet&&!fromTask){
         await getTasks(searchedPiglet?.id_lot_piglets!,'lot')
        }
        if(fromTask){
          const start=addZero(taskStartDate!) 
          const end=new Date(taskEndDate!)
           end.setDate(end.getDate()+1)
          await getAllTasks({startDate:start,endDate:addZero(end),id_farm:idFarm! || +Cookies.get('id_farm')!})
         }
        toggleModal()
      })
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Comentario'
        type="text"
        defaultValue={values.comment}
        {...register('comment')}
        />
        {
          task?.is_movement_task
            ?<>
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
            value={idUbication}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              setIdUbication(+e.target.value)
            }} 
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
            </>
            :<></>
        }
        <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha aplicación</p>
          <DatePickerElement date={addedDate} setDate={setAddedDate}/>
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}

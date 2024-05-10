import React, { SyntheticEvent, useContext, useState } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { ITask } from '@/interfaces'
import { addZero, buildDate, buildDateReverse } from '@/utils'

export const UpdateDate = () => {
  const {farmsLoading,task,updateTasks} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const [date, setDate] = useState<Date | null>(new Date(buildDateReverse(task?.start_date as string)))

  const onSubmit=async(e:SyntheticEvent)=>{
    e.preventDefault()
    
    const newTask= {...task,start_date:`${addZero(date!)} 06:00:00`} as ITask

    const ok=await updateTasks(newTask)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={onSubmit}>
      <div style={{textAlign:'center'}}>
        <p>Nueva Fecha</p>
        <DatePickerElement date={date} setDate={setDate}/>
      </div>
      <SaveButton loading={farmsLoading}/>
    </form>
  )
}

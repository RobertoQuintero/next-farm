'use client'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useState } from 'react'
import { PigletsTasks, PigsTasks } from '.'
import { DatePickerElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { addZero } from '@/utils'

const TaskLogPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getAllTasks} = useContext(FarmsContext)
  const [startDate, setstartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const onAdd = async() =>{
      const start=addZero(startDate!) 

      const end=new Date(endDate!)
       end.setDate(end.getDate()+1)

      await getAllTasks({startDate:start,endDate:addZero(end)})

  };

  return (
    <>
     <div className='actionCreateContainer'>

        <div style={{display:'flex', gap:'.5rem'}}>
          <DatePickerElement date={startDate} setDate={setstartDate}/>
          <DatePickerElement date={endDate} setDate={setEndDate}/>
        </div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        <PigsTasks/>
        <PigletsTasks/>
      </div>
      <AppModal>
        <></>
        {
          // action==='EDIT' || action===undefined
              // ?<PostUpdate/>
              // :<DeleteComponent onDelete={onDelete} loading={} error={}/>
        }
      </AppModal>
    </>
  )
}

export default TaskLogPage
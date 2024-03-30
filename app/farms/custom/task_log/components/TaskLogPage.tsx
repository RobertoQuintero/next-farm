'use client'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button, MenuItem, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { PigletsTasks, PigsTasks } from '.'
import { DatePickerElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { addZero } from '@/utils'

const actions =[
  {
    id_action:1,
    action:'Todas'
  },
  {
    id_action:2,
    action:'Por realizar'
  },
] as {id_action:number,action:string}[]

const TaskLogPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {getAllTasks,tasks} = useContext(FarmsContext)
  const [startDate, setstartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [changeAction, setChangeAction] = useState(1)

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
          <TextField
          sx={{width:'150px'}}
          size="small"
          label='Filtrar'
          value={changeAction}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            
            setChangeAction(+e.target.value)
          }}
          select >
          {
            actions.map(item=>(
              <MenuItem 
                key={item.id_action} 
                value={item.id_action}>
                {item.action}
              </MenuItem>))
          }
        </TextField>
        </div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Buscar</Button>
      </div>
      <div>
        <PigsTasks changeAction={changeAction}/>
        <PigletsTasks changeAction={changeAction}/>
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
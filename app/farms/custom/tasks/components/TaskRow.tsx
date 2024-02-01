import { ITask } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { UiContext } from '@/app/context/ui/UiContext';
interface Props{
  task:ITask
}
export const TaskRow = ({task}:Props) => {
  const {setTask,setFarmAction} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick =(action:string) =>{
    setFarmAction(action)
    setTask(task)
    toggleModal()   
  };

  return (
    <div className='rowCard'>
      <div className='ubicationRow'>
      <p>{new Date(task.updated_at).toLocaleString().split(',')[0]}</p>
      <p>{task.pig_type}</p>
      <p>{task.description}</p>
      <p style={{width:'130px',display:'flex',justifyContent:'space-between'}}>
        <span>{task.task_type}</span> 
        <span>{task.days}</span>
        </p>
      </div>
      <div style={{display:'flex',alignItems:'center', gap:'.5rem'}}>
      <RowButton onClick={()=>onClick('OPEN')} label="ver"/>
      <RowButton onClick={()=>onClick('DELETE')} label="Borrar" color='red'/>
      </div>
    </div>
  )
}

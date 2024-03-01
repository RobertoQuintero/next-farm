import { IPigTask,  } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { UiContext } from '@/app/context/ui/UiContext';
interface Props{
  task:IPigTask
}
export const TaskRow = ({task}:Props) => {
  const {setFarmAction,setPigTask} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick =(action:string) =>{
    setFarmAction(action)
    setPigTask(task)
    toggleModal()   
  };

  return (
    <div className='rowCard'>
      <div style={{display:'flex',gap:'.5rem', fontSize:'14px'}}>
      {/* <p>{new Date(task.updated_at).toLocaleString().split(',')[0]}</p> */}
      {/* <p style={{width:'100px'}}>{task.pig_type?.split(' ')[0]}</p> */}
      {/* <p style={{width:'100px'}}>{task.stage}</p> */}
      <p style={{width:'250px'}}>{task.description}</p>
      <p style={{width:'130px',display:'flex',gap:'.2rem'}}>
        <span>a los</span> 
        <span>{task.days}</span>
        <span>días</span>
      </p>
      </div>
      <div style={{display:'flex',alignItems:'center', gap:'.5rem'}}>
      <RowButton onClick={()=>onClick('OPEN')} label="ver"/>
      <RowButton onClick={()=>onClick('DELETE')} label="Borrar" color='red'/>
      </div>
    </div>
  )
}

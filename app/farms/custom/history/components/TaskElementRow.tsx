import { ITask } from '@/interfaces'
import styles from './pig.module.css'
import { RowButton } from '../../components'
import { useContext } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'

interface Props{
  task:ITask
}
export const TaskElementRow = ({task}:Props) => {
  const {toggleModal} = useContext(UiContext)
  const {setFarmAction,setTask} = useContext(FarmsContext)

  const onClick =(action:string) =>{
    setTask(task)
    setFarmAction(action)
    toggleModal()
  };

  return (
    <div className={styles.taskRow}>
      <p>{new Date(task.start_date).toLocaleString().split(',')[0]}</p>
      {/* <p>{new Date(task.end_date).toLocaleString().split(',')[0]}</p> */}
      <p style={{textTransform:'capitalize'}}>{task.name?.split(' ')[0]}</p>
      <p >{task.description}</p>
      <p onClick={()=>onClick('COMMENT-TASK')} className={styles.comment}>... {task.comment?.length?<span>{task.comment}</span>:''}</p>
      {
        !task.done
          ?<>
            <RowButton onClick={()=>onClick('UPDATE-TASK')} label="aplicar"/>
            <RowButton onClick={()=>onClick('DELETE-TASK')} label="borrar" color='red'/>
          </>
          :<></>
      }
    </div>
  )
}

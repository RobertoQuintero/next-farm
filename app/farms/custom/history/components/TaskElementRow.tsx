import { ITask } from '@/interfaces'
import styles from './pig.module.css'
import { RowButton } from '../../components'
import { useContext } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { CheckCircleOutline, HighlightOffOutlined } from '@mui/icons-material'

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
      <p style={{textTransform:'capitalize'}}>{task.name?.split(' ')[0]}</p>
      <p >{task.description}</p>
      <p onClick={()=>onClick('COMMENT-TASK')} className={styles.comment}>... {task.comment?.length?<span>{task.comment}</span>:''}</p>
      {
        !task.done
          ?task.status
            ?<>
            <RowButton onClick={()=>onClick('UPDATE-TASK')} label="aplicar"/>
            <RowButton onClick={()=>onClick('DELETE-TASK')} label="rechazar" color='red'/>
          </>
          :<div style={{textAlign:'center',flexBasis:'10%',color:'red'}}><HighlightOffOutlined fontSize='small'/></div>
          :<div style={{textAlign:'center',flexBasis:'10%',color:'green'}}><CheckCircleOutline fontSize='small'/></div>
      }
    </div>
  )
}

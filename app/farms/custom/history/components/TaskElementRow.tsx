import { ITask } from '@/interfaces'
import styles from './pig.module.css'
import { RowButton } from '../../components'
import { useContext } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { CheckCircleOutline, HighlightOffOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { addZero } from '@/utils'

interface Props{
  task:ITask;
  report?:boolean;
}
export const TaskElementRow = ({task,report}:Props) => {
  const {toggleModal} = useContext(UiContext)
  const {setFarmAction,setTask,pigs,piglets,setPig,setPiglet} = useContext(FarmsContext)
  const router=useRouter()

  const onClick =(action:string) =>{
    setTask(task)
    setFarmAction(action)
    toggleModal()
  };

  const goPage = async(id_pig:number|null,id_lot_piglets:number|null) =>{
    if(id_pig){
      const newPig= pigs.find(p=>p.id_pig===id_pig)
      setPig(newPig)
      router.push('/farms/custom/history')
    }else{
      const newPiglet= piglets.find(p=>p.id_lot_piglets===id_lot_piglets)
      setPiglet(newPiglet)
      router.push('/farms/custom/history_piglets')
    }
 };

 const updateDate = () =>{
    setFarmAction('UPDATE-DATE')
    setTask(task)
    toggleModal()
 };


  return (
    <div  style={{order:task.done ||!task.status?50:1,display:'flex',fontSize:'14px'}}>
      {/* <p style={{width:'90px'}} className='underlined' onClick={updateDate}>{new Date(task.start_date).toLocaleString().split(',')[0]}</p> */}
      <p style={{width:'90px'}} className='underlined' onClick={updateDate}>{addZero(new Date(task.start_date)).split('-').reverse().join('-')}</p>
      {report?<p style={{width:'90px'}} className='underlined' onClick={()=>goPage(task.id_pig,task.id_lot_piglets)}>{task?.pig_ubication?task.pig_ubication:task.piglets_ubication}</p>:<></>}
      <p style={{textTransform:'capitalize',width:'90px'}}>{task.name?.split(' ')[0]}</p>
      <p style={{width:'200px'}}>{task.description}</p>
      {report?<></>:<p onClick={()=>onClick('COMMENT-TASK')} className={styles.comment} style={{width:'100px'}}>... {task.comment?.length?<span>{task.comment}</span>:''}</p>}
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

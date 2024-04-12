import { IComment } from '@/interfaces'
import { addZero, buildDateReverse } from '@/utils'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'

interface Props{
  comment:IComment
}

export const CommentElementRow = ({comment}:Props) => {
  const {setComment,setFarmAction} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const onClick = (action:string) =>{
     setComment(comment)
     setFarmAction(action)
     toggleModal()
  };

  return (
    <div style={{display:'flex',justifyContent:'space-between',fontSize:'14px'}}>
      <div style={{display:'flex'}}>
        <p style={{width:'110px'}}>{addZero(new Date(buildDateReverse(comment.created_at)))}</p>
        <p style={{width:'200px'}}>{comment.description}</p>
        <p style={{width:'200px'}}>{comment.name}</p>
      </div>
      <div>
        <RowButton onClick={()=>onClick('UPDATE-COMMENT')} label="editar"/>
        <RowButton onClick={()=>onClick('DELETE-COMMENT')} label="borrar" color='red'/>
      </div>
    </div>
  )
}

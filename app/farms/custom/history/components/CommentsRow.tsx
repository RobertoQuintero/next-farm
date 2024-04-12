import React, { useContext, useEffect} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';
import Cookies from 'js-cookie'
import { IPig } from '@/interfaces';
import { CommentElementRow } from './CommentElementRow';

export const CommentsRow = () => {
  const {pig,setFarmAction,getComments,comments,setComment} = useContext(FarmsContext)
  const {toggleModal} = useUi()

  useEffect(() => {
    if(pig){
      getComments(pig?.id_pig!)
    }else{
      const newPig= JSON.parse(Cookies.get('pig')!) as IPig
      getComments(newPig.id_pig)
    }
  }, [])

  const onClick =() =>{
     setFarmAction('CREATE-COMMENT')
     setComment(undefined)
     toggleModal()
  };

  return (
    <AccordionElement title='Comentarios' >
      <div style={{textAlign:'right'}}>
        <Button size='small'  onClick={onClick} >Agregar</Button>
      </div>
      <div style={{display:'flex',fontSize:'14px', fontWeight:'bold',paddingBottom:'.5rem'}}>
        <p style={{width:'110px'}}>Fecha</p>
        <p style={{width:'200px'}}>Comentario</p>
        <p style={{width:'200px'}}>Usuario</p>
      </div>
      {
        comments.length
          ?comments.filter(f=>f.status).map(c=><CommentElementRow comment={c} key={c.id_comment}/>)
          :<p style={{textAlign:'center',fontSize:'15',fontWeight:'bold',paddingTop:'1rem'}}>Agregue un comentario</p>
      }
    </AccordionElement>
  )
}

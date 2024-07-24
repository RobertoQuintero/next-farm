import React, { useContext, useEffect} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';
import Cookies from 'js-cookie'
import { IPiglets } from '@/interfaces';
import { CommentElementRow } from '../../history/components/CommentElementRow';

export const CommentsRow = () => {
  const {setFarmAction,getComments,comments,setComment,piglet} = useContext(FarmsContext)
  const {toggleModal} = useUi()

  useEffect(() => {
    if(piglet){
      getComments(piglet?.id_lot_piglets!,'piglet')
    }else{
      const newPig= JSON.parse(Cookies.get('piglet')!) as IPiglets
      getComments(newPig.id_lot_piglets,'piglet')
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
        <p style={{width:'300px'}}>Comentario</p>
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

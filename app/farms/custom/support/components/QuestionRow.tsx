import { AccordionElement } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { IQuestion } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { AnswerRow } from './AnswerRow'

interface Props{
  question:IQuestion;
  index:number;
}

const QuestionRow = ({question,index}:Props) => {
  const {answers,setFarmAction,setQuestion,setAnswer} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = async(action:string) =>{
     setFarmAction(action)
     setQuestion(question)
     toggleModal()
  };

  const addAnswer = () =>{
     setAnswer(undefined)
     setQuestion(question)
     toggleModal()
     setFarmAction('ADD-ANSWER')
  };

  return (
    <AccordionElement 
      title={
        <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
          <p>{index} {question.description}</p>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <RowButton onClick={()=>onClick('EDIT-QUESTION')} label="editar"/>
            <RowButton onClick={()=>onClick('DELETE-QUESTION')} label="borrar" color="red"/>
          </div>
        </div>
      } >
        <div style={{textAlign:'end',padding:'0 0 .5rem 0'}}>
          <Button 
            size='small'
            onClick={addAnswer}
          >
            Agregar
          </Button>
        </div>
        <div style={{padding:'0 0 0 2.5rem'}}>
          {
            answers.filter(a=>a.status&&a.id_question===question.id_question).length
              ?answers.filter(a=>a.status&&a.id_question===question.id_question).map(a=><AnswerRow answer={a} key={a.id_answer}/>)
              :<p style={{textAlign:'center',fontWeight:'bold'}}>No hay respuestas</p>
          }
        </div>
    </AccordionElement>
  )
}

export default QuestionRow
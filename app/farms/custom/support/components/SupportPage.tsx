'use client'
import { BackButton, EmptyPage,DeleteComponent, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import QuestionRow from './QuestionRow'
import { PostUpdateQuestion } from './PostUpdateQuestion'
import { IAnswer, IQuestion } from '@/interfaces'
import { PostUpdateAnswer } from './PostUpdateAnswer'

const SupportPage = () => {
  const {toggleModal,isModalOpen} = useContext(UiContext)
  const {getAnswers,getQuestions,farmsLoading,farmsError,questions,setFarmAction,setQuestion,farmAction,question,answer,postQuestion,postAnswer} = useContext(FarmsContext)
  const {idFarm,user} = useContext(AuthContext)

  useEffect(() => {
    if(idFarm){
      Promise.all([
        getQuestions(idFarm),
        getAnswers(idFarm)
      ])
      .then(resp=>{

      })
    }
  }, [idFarm])
  

  const onAdd = async() =>{
    setQuestion(undefined)
    setFarmAction(undefined)
    toggleModal()
  };

  const onDelete = async() =>{

    const newQuestion ={
      ...question,
      status:false,
      id_user:user?.id_user
    } as IQuestion
    //  console.log(newQuestion)
    //  return
    const ok=await postQuestion(newQuestion)
     if(ok){
      toggleModal()
     }
  };
  const onDeleteAnswer = async() =>{
     const newAnswer={
      ...answer,
      status:false
     } as IAnswer

     const ok=await postAnswer(newAnswer)
     if(ok){
      toggleModal()
     }
  };

  if(farmsLoading && !isModalOpen){
    return <LoadingComponent/>
  }



  return (
    <>
     <div className='actionCreateContainer'>
        <div></div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          questions.filter(q=>q?.status).length
            ?questions.filter(q=>q?.status).map((a,i)=><QuestionRow question={a} key={a.id_question} index={i+1}/>)
            :<EmptyPage title='Agrega una pregunta'/>
        }
      </div>
      <AppModal>
        <></>
        {
          farmAction==='EDIT-QUESTION' || farmAction===undefined
              ?<PostUpdateQuestion/>
              :<></>
        }
        {
          farmAction==='DELETE-QUESTION'
              ?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>
              :<></>
        }
        {
          farmAction==='DELETE-ANSWER'
              ?<DeleteComponent onDelete={onDeleteAnswer} loading={farmsLoading} error={farmsError}/>
              :<></>
        }
        {
          farmAction==='ADD-ANSWER' ||farmAction==='EDIT-ANSWER'
              ?<PostUpdateAnswer/>
              :<></>
        }
        
      </AppModal>
    </>
  )
}

export default SupportPage
'use client'
import { BackButton } from '@/app/components'
import React, { useContext, useEffect } from 'react'
import { InfoRowPiglets, LossRowPiglets, MovePiglets, TasksRowPiglets, UpdatePiglets } from '.'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { LossForm, UpdateComment, UpdateTask } from '../../components'
import Cookies from 'js-cookie'

const HistoryPigletsPage = () => {
  const {farmAction,piglet,setPiglet,getCode} = useContext(FarmsContext)

  useEffect(() => {
    if(!piglet){
      setPiglet(JSON.parse(Cookies.get('piglet')!))
    }
    getCode('lot')
  }, [])

  return (
    <>
      <BackButton/>
      <InfoRowPiglets/>
      <LossRowPiglets/>
      <TasksRowPiglets/>
      <AppModal>
      {
        farmAction==='COMMENT-TASK'?<UpdateComment/>:<></>
      }
      {
        farmAction==='UPDATE-TASK'?<UpdateTask/>:<></>
      }
      {
        farmAction==='EDIT'?<UpdatePiglets/>:<></>
      }
      {
        farmAction==='MOVE'?<MovePiglets/>:<></>
      }
      {
        farmAction==='LOSS'?<LossForm/>:<></>
      }
      </AppModal>
    </>
  )
}

export default HistoryPigletsPage
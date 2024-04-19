'use client'
import React, { useContext } from 'react'
import { InfoRow } from './InfoRow'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { LossForm } from '../../components'
import { LossRowGrowing } from './LossRowGrowing'
import { BackButton } from '@/app/components'

const GrowingPigsPage = () => {
  const {farmAction} = useContext(FarmsContext)
  return (
    <>
    <BackButton/>
    <InfoRow/>
    <LossRowGrowing/>
    <AppModal>
    {
        farmAction==='LOSS'?<LossForm/>:<></>
      }
    </AppModal>
    </>
  )
}

export default GrowingPigsPage
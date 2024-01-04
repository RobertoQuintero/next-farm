'use client'
import { ArrowBackOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import React from 'react'

export const BackButton = () => {
  const router= useRouter()
  return (
    <span 
        onClick={()=>router.back()}
        style={{
        cursor:'pointer',
      }}>
        <ArrowBackOutlined/>
      </span>
  )
}


'use client'
import { ArrowBackOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export const BackToFarms = () => {
  const router= useRouter()
  return (
    <span 
        onClick={()=>router.push('/farms')}
        style={{
        cursor:'pointer',
      }}>
        <ArrowBackOutlined/>
      </span>
  )
}


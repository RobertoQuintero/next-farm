import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { IPig } from '@/interfaces'
import { addZero, buildDateReverse } from '@/utils'
import { CheckCircleOutlineOutlined } from '@mui/icons-material'
import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
interface Props{
  pig:IPig
}

const NextBirthRow = ({pig}:Props) => {
  const {setFarmAction,setPig} = useContext(FarmsContext)
  const router= useRouter()

  return (
    <div style={{display:'flex',fontSize:'14px',borderBottom:'1px solid #ccc',width:'700px'}} className='rowCard'>
      <p style={{width:'70px'}} className='underlined' onClick={()=>{
        setFarmAction(undefined)
        setPig(pig)
        Cookies.set('pig',JSON.stringify(pig))
        router.push('/farms/custom/history')
      }}>{pig.code}</p>
      <p style={{width:'80px'}} >{pig.pig_ubication}</p>
      <p style={{width:'150px'}}>{pig.pig_race}</p>
      <p style={{width:'100px',wordWrap:'break-word'}}>{pig.crossing_stallion?.replaceAll('/',' / ')}</p>
      <p style={{width:'100px'}}>{addZero(new Date(buildDateReverse(pig.crossing_date))).split('-').reverse().join('-')}</p>
      <p style={{width:'100px'}}>{pig.next_birth?addZero(new Date(buildDateReverse(pig.next_birth as string))).split('-').reverse().join('-'):''}</p>
      <p style={{width:'100px',textAlign:'center',color:'green'}}>
        {pig.id_pig_stage===6?<CheckCircleOutlineOutlined fontSize='small'/>:<CheckCircleOutlineOutlined fontSize='small' sx={{color:'transparent'}}/>}
      </p>
    </div>
  )
}

export default NextBirthRow
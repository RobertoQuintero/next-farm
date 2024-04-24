import { IStallionReport } from '@/interfaces/stallions'
import { BarChart } from '@mui/x-charts'
import React from 'react'
interface Props{
  stallions:IStallionReport
  type:string;
  color:string;
}

export const StallionReportBox = ({stallions,type,color}:Props) => {
  return (
    <div style={{border:'1px solid #ccc',borderRadius:'5px',padding:'1rem',marginBottom:'1rem'}}>
      <div>
        <p>{stallions.stallion} {type}</p>
        {
          stallions.months.length
            ?<BarChart
            xAxis={[
              {
                id: 'barCategories',
                data: stallions.months.length?stallions.months?.map(s=>s.month?.split('-')[1]):[],
                scaleType: 'band',
              },
            ]}
            series={[
              {
                data:stallions.months.length? stallions.months?.map(s=>s?.quantity):[],
                color:color
              },
            ]}
            width={600}
            height={300}
  
          />
            :<></>
        }
        
      </div>
    </div>
  )
}

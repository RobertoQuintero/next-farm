import { FarmsContext } from "@/app/context/farms/FarmsContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { IPig } from "@/interfaces"
import { useContext } from "react"
import { RowButton } from "."
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import { addZero, buildDateReverse } from "@/utils"

interface Props {
  pig:IPig;
  print:boolean;
  report?:boolean
}

export const PigCard = ({pig,print,report=false}:Props) => {
  const {setFarmAction,setPig,setPiglet} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const router= useRouter()

  const onClick = async(action:string) =>{
    setPig(pig)
    setPiglet(undefined)
    if(action==='DELETE' || action==='EDIT'){
      if(print){
      Cookies.set('pig',JSON.stringify(pig))
      router.push('/farms/custom/history')
      }else{
        setFarmAction(action)
        toggleModal()
      }
    }else{
      setFarmAction(undefined)
      Cookies.set('pig',JSON.stringify(pig))
      router.push('/farms/custom/history')
    }
  };

  return (
    <div className={`rowCard ${print&&'odd'}`}>
      <div className="pigData">
        <p>{addZero(new Date(pig.added_date)).split('-').reverse().join('-')}</p>
        <p onClick={()=>onClick('EDIT')} className="underlined">{pig.code}</p>
        <p>{pig.pig_ubication}</p>
        <p>{pig.pig_race}</p>
        <p>{pig.pig_stage}</p>
        {report
          ?<>
            <p>{
                pig.id_pig_stage===5?addZero(new Date(buildDateReverse(pig.next_birth as string))):''
              }</p>
            <p>{
            pig.id_pig_stage===5?pig.counting_days:''
            }</p>
            <p>{pig.piglets}</p>
          </>
          :<></>}
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('GO')} label="ver"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color="red"/>
      </div>
    </div>
  )
}

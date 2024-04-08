import { FarmsContext } from "@/app/context/farms/FarmsContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { IPig } from "@/interfaces"
import { useContext } from "react"
import { RowButton } from "."
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import { addZero } from "@/utils"

interface Props {
  pig:IPig;
  print:boolean;
}

export const PigCard = ({pig,print}:Props) => {
  const {setFarmAction,setPig} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const router= useRouter()

  const onClick = async(action:string) =>{
    setPig(pig)
    if(action==='DELETE' || action==='EDIT'){
      setFarmAction(action)
      toggleModal()
    }else{
      setFarmAction(undefined)
      Cookies.set('pig',JSON.stringify(pig))
      router.push('/farms/custom/history')
    }
  };

  return (
    <div className={`rowCard ${print&&'odd'}`}>
      <div className="pigData">
        <p>{addZero(new Date(pig.created_at)).split('-').reverse().join('-')}</p>
        <p onClick={()=>onClick('EDIT')} className="underlined">{pig.code}</p>
        <p>{pig.pig_ubication}</p>
        <p>{pig.pig_race}</p>
        <p>{pig.pig_stage}</p>
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('GO')} label="ver"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color="red"/>
      </div>
    </div>
  )
}

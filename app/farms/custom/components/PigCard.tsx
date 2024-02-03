import { FarmsContext } from "@/app/context/farms/FarmsContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { IPig } from "@/interfaces"
import { useContext } from "react"
import { RowButton } from "."
import { useRouter } from "next/navigation"

interface Props {
  pig:IPig
}

export const PigCard = ({pig}:Props) => {
  const {setFarmAction,setPig} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const router= useRouter()

  const onClick = async(action:string) =>{
    setPig(pig)
    if(action==='EDIT'||action==='DELETE'){
      setFarmAction(action)
      toggleModal()
    }else{
      setFarmAction(undefined)
      router.push(`/farms/custom/${action}`)
    }
  };

  return (
    <div className="rowCard">
      <div className="pigData">
        <p>{pig.code}</p>
        <p>{pig.pig_ubication}</p>
        <p>{pig.pig_race}</p>
        <p>{pig.pig_stage}</p>
      </div>
      <div style={{display:'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('EDIT')} label="ver"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar"/>
      </div>
    </div>
  )
}

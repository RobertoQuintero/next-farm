import { FarmsContext } from "@/app/context/farms/FarmsContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { IPig } from "@/interfaces"
import { Button } from "@mui/material"
import { useContext } from "react"

interface Props {
  pig:IPig
}

export const PigCard = ({pig}:Props) => {
  const {setFarmAction,setPig} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = async(action:string) =>{
    setPig(pig)
     setFarmAction(action)
     toggleModal()
  };

  return (
    <div className="rowCard">
      <div>
        <p>{pig.code}</p>
      </div>
      <div style={{display:'flex', gap:'.5rem'}}>
        <Button 
          size="small"
          onClick={()=>onClick('EDIT')}
         >
         Editar
        </Button>
        <Button 
          size="small"
          onClick={()=>onClick('OPEN')}  
         >
         Ver
        </Button>
      </div>
    </div>
  )
}

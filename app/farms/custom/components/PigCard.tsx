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
    Cookies.set('pig',JSON.stringify(pig))
    // console.log(pig)
    // return
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

  const getColors = () =>{
     switch (Number(pig.flag)) {
      case 0:
          return '#FFE0E9'
      case 1:    
          return '#93E1D8'
      case 2:    
          return '#FCBF46'
      case 3:    
          return '#F77F00'     
      default:
        return '#D62828'
     }
  };

  return (
    <div className={`rowCard ${print&&'odd'}`} style={{backgroundColor:getColors()}}>
      <div className="pigData">
        <p>{addZero(new Date(pig.added_date)).split('-').reverse().join('-')}</p>
        <p onClick={()=>onClick('EDIT')} className="underlined">{pig.code}</p>
        <p>{pig.pig_ubication}</p>
        <p>{pig.pig_race}</p>
        <p>{pig.is_active?pig.pig_stage:'Inactiva'}</p>
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

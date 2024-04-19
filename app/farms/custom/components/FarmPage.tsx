'use client'
import { AccessErrorComponent,  BackToFarms, DeleteComponent, EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { Button, CardActionArea, TextField } from '@mui/material'
import { CSSProperties, SyntheticEvent, useContext, useEffect, useRef, useState } from 'react'
import { PigCard, PostUpdatePig, RowButton, SearchPigButton, SearchPigForm } from '.'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { IPig } from '@/interfaces'
import Cookie from 'js-cookie'
import Link from 'next/link'
import { CachedOutlined } from '@mui/icons-material'
import { useUi } from '@/app/context/ui/useUi'
import * as XLSX from 'xlsx'
import { addZero } from '@/utils'
import { useReactToPrint } from 'react-to-print'
import { useRouter } from 'next/navigation'

const style={
  backgroundColor:'#fff',
  padding:'0 .5rem',
  border:'1px solid #ccc',
  borderRadius:'3px'
} as CSSProperties

const FarmPage = () => {
  const {toggleModal,isModalOpen} = useUi()
  const {idFarm,user} = useContext(AuthContext)
  const {farmsLoading,pigs,getPigs,setPig,setFarmAction,farmAction,farmsError,pig,postPig,getFarm,farm,getCode,stallions,ubications,setMonthBirth} = useContext(FarmsContext)
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)
  const [print, setPrint] = useState(false)
  const [stage, setStage] = useState(0)
  const [text, setText] = useState('')
  const router= useRouter()

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint:()=>{
      setPrint(false)
    },
  });

  useEffect(() => {
    if(idFarm){
      getFarm(idFarm)
      getPigs(idFarm)
      getCode('pig')
    }else{
      let id= Number(Cookie.get('id_farm'))
      getFarm(id!)
      getPigs(id!)
      getCode('pig')
    }    
  }, [idFarm])

  const getChargePigs=()=>{
    const newArr= pigs.filter(p=>p.id_pig_stage===5||p.id_pig_stage===6).map(p=>p.month_name) as string[]
    const arr= [...new Set(newArr)].map(n=>{
      return {
        month:n,
        quantity:pigs.filter(p=>(p.id_pig_stage===5||p.id_pig_stage===6)&&p.month_name===n).length,
      }
    })
    return arr
  }

  
  if(farmsLoading && !isModalOpen){
    return <LoadingComponent/>
  }
  const onAdd = async() =>{
    setError(false)
    setError2(false)
    if(!stallions.length){
      setError(true)
      return
    }
    if(!ubications.length){
      setError2(true)
      return
    }
    setFarmAction(undefined)
    setPig(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
     const newPig={...pig,status:false} as IPig
     const ok= await postPig(newPig)
     if(ok){
      toggleModal()
     }
  };

  const onRefresh = async() =>{
    getPigs(idFarm!)
    getCode('pig')
  };

  const getExcel = () =>{

    const newPigs=pigs.map(p=>{
      return {
        'Ingreso':addZero(new Date(p.created_at)).split('-').reverse().join('-'),
        'Número':p.code,
        'Ubicación':p.pig_ubication,
        'Raza':p.pig_race,
        'Situación':p.pig_stage
      }
    })
    const wb = XLSX.utils.book_new()
    const  ws = XLSX.utils.json_to_sheet(newPigs,{cellStyles:true,})
    ws['!cols'] = [{wch: 18},{wch: 18},{wch: 18},{wch: 18},{wch: 18}]
    XLSX.utils.book_append_sheet(wb,ws,"Hoja1")
    XLSX.writeFile(wb,'GestionYMaternidad.xlsx')
  };
  return (
    <>
     <div className='actionCreateContainer'>
      <AccessErrorComponent/>
      <div style={{display:'flex',gap:'.5rem'}}>
        <div style={{display:'flex',gap:'.5rem'}}>
          {user?.id_role===1&&<BackToFarms/>}
          <CardActionArea
            onClick={onRefresh}
            style={style} >
            <CachedOutlined fontSize='small'/>
          </CardActionArea>
          <SearchPigButton/>
        </div>
        <form onSubmit={(e:SyntheticEvent)=>{
          e.preventDefault()
          const thisPig= pigs.find(p=>p.pig_ubication===text.toUpperCase())
          if(thisPig){
            setPig(thisPig)
            Cookie.set('pig',JSON.stringify(pig))
            router.push('/farms/custom/history')
          } 
        }}>
        <TextField 
          sx={{width:'150px'}}
          size="small"
          fullWidth
          label='Filtra jaula'          
          type="text"
          value={text}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setText(e.target.value)
          }}
        />
        </form>

      </div>
        <div style={{display:'flex',alignItems:'center',gap:'1rem',color:'red'}}>
        {
            error?<p style={{fontSize:'14px'}}>Debe agregar un Semental <Link href='/farms/custom/stallions' style={{textDecoration:'underline'}}>Click!</Link></p>:<></>
          }
        {
            error2?<p style={{fontSize:'14px'}}>Debe agregar una Ubicación <Link href='/farms/custom/ubications' style={{textDecoration:'underline'}}>Click!</Link></p>:<></>
          }
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
        </div>
      </div>
      <div style={{display:'flex', gap:'.5rem',paddingBottom:'1rem'}}>
        <p>Próximos partos</p>
        {
          getChargePigs()
            .filter((p,i)=>i<3)
            .map(c=>
              <span 
                onClick={()=>{
                  setMonthBirth(c)
                  router.push('/farms/custom/next_births')
                }}
                key={c.month} 
                style={{backgroundColor:'#0061f2',color:'#fff',padding:'.2rem .5rem',borderRadius:'5px',cursor:'pointer',fontSize:'13px'}}>
                  {c.month} ({c.quantity})
              </span>)
        }
      </div>
      <div style={{display:'flex',gap:'.5rem', fontSize:'14px'}} >
        <p onClick={()=>setStage(2)} className='underlined'>Vacía <strong>{pigs.filter(p=>p.status&&p.id_pig_stage===2).length}</strong></p>
        <p onClick={()=>setStage(3)} className='underlined'>Montada <strong>{pigs.filter(p=>p.status&&p.id_pig_stage===3).length}</strong></p>
        <p onClick={()=>setStage(4)} className='underlined'>Sin confirmar <strong>{pigs.filter(p=>p.status&&p.id_pig_stage===4).length}</strong></p>
        <p onClick={()=>setStage(5)} className='underlined'>Cargada <strong>{pigs.filter(p=>p.status&&p.id_pig_stage===5).length}</strong></p>
        <p onClick={()=>setStage(6)} className='underlined'>Destetando <strong>{pigs.filter(p=>p.status&&p.id_pig_stage===6).length}</strong></p>
        <p onClick={()=>setStage(0)} className='underlined'>Todas <strong>{pigs.filter(p=>p.status).length}</strong></p>
      </div>
      <div style={{textAlign:'center',padding:'0 0 1rem 0',fontWeight:'bold',position:'relative'}}>
      <div style={{display:'flex', gap:'.2rem',paddingRight:'.5rem', position:'absolute', left:0,top:'50%',transform:'translateY(-50%)'}}>
        <RowButton onClick={getExcel} label="Excel"/>
        <RowButton onClick={()=>{
          setPrint(true)
          setTimeout(() => {
            handlePrint()
          }, 200);
        }} label="pdf"/>
      </div>
        <p>{farm?.name}</p></div>
      <div>
        <div className="pigData pigDataHeader">
          <p>Ingreso</p>
          <p>Número</p>
          <p>Ubicación</p>
          <p>Raza</p>
          <p>Situación</p>
        </div>
        {
          pigs.filter(p=>p.status).length
            ?pigs
              .filter(p=>p.status)
              .filter(f=>stage===0?f:f.id_pig_stage===stage)
              .filter(f=>text.length?f.pig_ubication===text ||f.pig_ubication.toLowerCase()===text.toLocaleLowerCase():f)
              .map(a=><PigCard pig={a} key={a.id_pig} print={print}/>)
            :<EmptyPage/>
        }
      </div>
      <div style={{display:'none'}}>
      <div ref={componentRef} style={{padding:'.5rem'}}>
        <div className="pigData pigDataHeader" style={{padding:'1rem .5rem', color:'#fff',backgroundColor:'#2d4154'}}>
          <p>Ingreso</p>
          <p>Número</p>
          <p>Ubicación</p>
          <p>Raza</p>
          <p>Situación</p>
        </div>
          {
            pigs.filter(p=>p.status).length
              ?pigs.filter(p=>p.status).filter(f=>stage===0?f:f.id_pig_stage===stage).map(a=><PigCard pig={a} key={a.id_pig} print={print}/>)
              :<EmptyPage/>
          }
      </div>
      </div>
      <AppModal>
        {
          farmAction==='EDIT' || farmAction===undefined ? <PostUpdatePig/>:<></>
        }
        {
          farmAction==='DELETE'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
        }
        {/* {
          farmAction==='EDIT'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
        } */}
        {
          farmAction==='SEARCH-PIG'?<SearchPigForm/>:<></>
        }
      </AppModal>
    </>
  )
}

export default FarmPage
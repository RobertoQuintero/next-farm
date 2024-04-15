import { DatePickerElement, SaveButton } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IPig, IUbication } from '@/interfaces'
import { buildDate } from '@/utils'
import {  MenuItem, TextField } from '@mui/material'
import React, { useContext, useEffect, useState} from 'react'
import { useForm } from "react-hook-form"

export const PostUpdatePig = () => {
  const {idFarm} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,ubications,races,pig,postPig,stallions,getCode,code,weightTypes,pigs,postUbicationForm} = useContext(FarmsContext)
  const [addUbication, setAddUbication] = useState(false)
  const [newUbication, setNewUbication] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPig>()

  const newUbications = () =>{
    const array=[] as IUbication[]
    for (const p of ubications.filter(f=>f.id_pig_type===3)) {
      if(!pigs.find(a=>a.id_ubication===p.id_ubication)){
          array.push(p)
      }
    }
    if(pig){
      array.push(ubications.find(u=>u.id_ubication===pig.id_ubication)!)
    }
    return array
  };

  const values={
    id_pig:pig?pig.id_pig:0,
    id_pig_type:3,
    id_ubication:pig?pig.id_ubication:newUbications()[0]?.id_ubication,
    id_race:pig?pig.id_race:races[0]?.id_race,
    code:pig?pig.code:code,
    added_date:pig?new Date(pig.added_date):new Date(),
    visible:pig?pig.visible:true,
    id_farm:pig?pig.id_farm:idFarm,
    bar_code:pig?pig.bar_code:'',
    status:pig?pig.status:true,
    id_stallion:pig?pig.id_stallion:stallions[0].id_stallion,
    id_weight_type:pig?pig.id_weight_type:weightTypes[1].id_weight_type
  } as IPig

  const [addedDate, setAddedDate] = useState<Date | null>(new Date(values.added_date))
  const [newCode, setNewCode] = useState(values.code)
  const [submit, setSubmit] = useState(false)
  const [barcode, setBarcode] = useState(values.bar_code)


  const onSubmit=async(data:IPig)=>{
    setError(undefined)
    const date=buildDate(new Date())
    data.id_pig=values.id_pig
    data.status=values.status
    data.id_farm=values.id_farm
    data.added_date=values.added_date
    data.visible=values.visible
    data.id_pig_type=values.id_pig_type
    data.created_at=date
    data.id_pig_stage=pig?pig?.id_pig_stage!:1
    data.bar_code=barcode
    data.code=newCode

    setSubmit(true)

    if(addUbication){
      const ubication={
        id_ubication:0,
        created_at:date,
        description:newUbication,
        id_farm:idFarm,
        id_pig_type:3,
        status:true,
        updated_at:date
      } as IUbication

      const {ok,data:d} = await postUbicationForm(ubication)
      if(ok){
        data.id_ubication=(d as IUbication).id_ubication 
      }else{
        setError(d as string)
        return
      }
    }

    const ok=await postPig(data)
    if(ok){
      toggleModal()
      setSubmit(false)
      getCode('pig')
    }
  }
  
  function handleBarcode(scanned_code:string){
    setBarcode(scanned_code)
  }

  useEffect(() => {
    let barcode=''
    let interval:NodeJS.Timeout | undefined= undefined
    const handler=(e:KeyboardEvent)=>{
      if(interval){
        clearInterval(interval)
      }
      if(e.code==='Enter'){
        if(barcode)
        handleBarcode(barcode)
      barcode=''
      return
      }

      if(e.code !='Shift'){
        barcode+=e.key
      }
      interval = setInterval(() => {
        barcode=''
      }, 20);
    }
      document.addEventListener('keydown',handler)
    return () => {
      document.removeEventListener('keydown',handler)
    }
  }, [])
  

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      {
        pig
        ?<></>
        :<TextField 
        size="small"
        fullWidth
        label='Código'
        type="text"
        value={newCode}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setNewCode(e.target.value)
        }}
        />
      }
        <TextField
          size="small"
          label='Padre'
          fullWidth
          defaultValue={values.id_stallion}
            {...register('id_stallion')} 
          select >
          {
            stallions.length
            ?stallions.map(item=>(
              <MenuItem 
                key={item.id_stallion} 
                value={item.id_stallion}>
                {item.name}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        {addUbication?<></>:<p onClick={()=>setAddUbication(true)} style={{textAlign:'right', fontSize:'14px', textDecoration:'underline',cursor:'pointer'}}>Agregar</p>}
        {
          addUbication
            ?<>
              <TextField 
                size="small"
                fullWidth
                label='Ubicación'
                type="text"
                value={newUbication}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                  setNewUbication(e.target.value)
                }}
              />
              {error?<p style={{fontSize:'13px', color:'red', textAlign:'center'}}>{error}</p>:<></>}
            </>
            :<TextField
            size="small"
            label='Ubicación'
            fullWidth
            defaultValue={values.id_ubication}
            {...register('id_ubication')} 
            select >
            {
              newUbications().length
              ?newUbications().map(item=>(
                <MenuItem 
                  key={item.id_ubication} 
                  value={item.id_ubication}>
                  {item.description}
                </MenuItem>
              ))
              :<div></div>
            }
          </TextField>
        }
        <TextField
          size="small"
          label='Raza'
          fullWidth
          defaultValue={values.id_race}
          {...register('id_race')} 
          select >
          {
            races.length
            ?races.map(item=>(
              <MenuItem 
                key={item.id_race} 
                value={item.id_race}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <TextField
          size="small"
          label='Peso'
          fullWidth
          defaultValue={values.id_weight_type}
          {...register('id_weight_type')} 
          select >
          {
            weightTypes.length
            ?weightTypes.map(item=>(
              <MenuItem 
                key={item.id_weight_type} 
                value={item.id_weight_type}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        {
          pig
            ?<></>
            :<div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
                <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha ingreso</p>
              <DatePickerElement date={addedDate} setDate={setAddedDate}/>
              </div>
        }
        <TextField 
        size="small"
        fullWidth
        // label='Código de barras'
        type="text"
        defaultValue={barcode}
        disabled
        {...register('bar_code')} 
          
        />
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}

'use client'
import  {  useContext, useEffect, useReducer} from 'react'
import { FarmsContext} from './FarmsContext'
import {  usersReducer } from './farmsReducer'
import { IFarm, IMonthBirth } from '@/interfaces/farm'
import { getFarmsRequest, postFarmsRequest } from './farmsRequest'
import { returnArray } from '../auth/authRequest'
import { IUbication, IStage, IPigType, IRace, IPig, IAccess, IRole, IRoleAccess, ITask, ITaskType, ILossReason, IfertilizationType, IStallion, IBirth, ICrossing, IPigWeight, IPigStage, IPigTask, IStageTaskType, IBirthType, IPiglets, IQuantity, IStaticPig, IProduct, IComment, ILoss } from '@/interfaces'
import { AuthContext } from '../auth/AuthContext'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { IGrowingPigs } from '@/interfaces/growing_pigs'

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface UsersState{
  farms:IFarm[]
  farm:IFarm | undefined
  farmsLoading:boolean;
  farmsError:string | undefined;
  ubications:IUbication[];
  ubication:IUbication | undefined;
  tasks:ITask[]
  task:ITask | undefined;
  pigTypes:IPigType[];
  races:IRace[];
  pigs:IPig[];
  pig:IPig | undefined;
  idFarm: number | undefined;
  farmAction:string | undefined;
  roles:IRole[];
  role:IRole | undefined;
  accessArr:IAccess[];
  access:IAccess | undefined;
  roleAccess:IRoleAccess|undefined;
  rolesAccess:IRoleAccess[];
  taskTypes:ITaskType[];
  lossReasons:ILossReason[];
  lossReason:ILossReason | undefined;
  fertilizatinTypes:IfertilizationType[];
  stallions:IStallion[];
  stallion:IStallion | undefined;
  race:IRace | undefined;
  births:IBirth[];
  birth:IBirth | undefined;
  code: string | undefined;
  weightTypes:IPigWeight[];
  pigStages:IPigStage[];
  pigTasks:IPigTask[];
  pigTask:IPigTask | undefined;
  stageTaskTypes:IStageTaskType[];
  birthTypes:IBirthType[];
  piggletCode: string | undefined;
  piglets:IPiglets[]
  piglet:IPiglets | undefined;
  growing_pigs:IGrowingPigs[]
  growing_pig:IGrowingPigs | undefined;
  statics_quantities:IQuantity[];
  staticPigs:IStaticPig[];
  staticPiglets:IStaticPig[];
  staticGrowingPigs:IStaticPig[];
  products:IProduct[];
  product:IProduct | undefined;
  comments:IComment[];
  comment:IComment | undefined;
  losses:ILoss[]
  loss:ILoss | undefined;
  monthBirth:IMonthBirth | undefined;
}

const UI_INITIAL_STATE:UsersState={
  farms:[],
  farm: undefined,
  farmsLoading:false,
  farmsError:undefined,
  ubications:[],
  ubication: undefined,
  tasks:[],
  task:undefined,
  pigTypes:[],
  races:[],
  pigs:[],
  pig:undefined,
  idFarm: undefined,
  farmAction:undefined,
  roles:[],
  role: undefined,
  accessArr:[],
  access: undefined,
  roleAccess:undefined,
  rolesAccess:[],
  taskTypes:[],
  lossReasons:[],
  lossReason: undefined,
  fertilizatinTypes:[],
  stallions:[],
  stallion:undefined,
  race:undefined,
  births:[],
  birth: undefined,
  code: undefined,
  weightTypes:[],
  pigStages:[],
  pigTasks:[],
  pigTask: undefined,
  stageTaskTypes:[],
  birthTypes:[],
  piggletCode: undefined,
  piglets:[],
  piglet: undefined,
  growing_pigs:[],
  growing_pig:undefined,
  statics_quantities:[],
  staticPigs:[],
  staticPiglets:[],
  staticGrowingPigs:[],
  products:[],
  product: undefined,
  comments:[],
  comment:undefined,
  losses:[],
  loss:undefined,
  monthBirth:undefined
}

export const FarmsProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(usersReducer, UI_INITIAL_STATE)
  const {logged,user,userAccess,setAccessError,idFarm,setIdFarm} = useContext(AuthContext)
  const router= useRouter()
  
  useEffect(() => {
   if(logged){
      if(!user?.is_active){
         router.replace('/')
      }else{
         if(!idFarm){
            setIdFarm(+Cookies.get('id_farm')!)
         }else{
            getResources(idFarm!)
            setAccessError(undefined)
            getUbications()
         }
      }
   }
  }, [logged,idFarm])
 
  const getResources = async(idFarm:number) =>{
    setIsLoading(true)
     Promise.all([
      getFarmsRequest('/farms/catalog/pig_types'),
      getFarmsRequest(`/farms/catalog/races?id_farm=${idFarm}`),
      getFarmsRequest(`/farms/catalog/birth_types`),
      getFarmsRequest('/users/roles'),
      getFarmsRequest('/users/access'),
      getFarmsRequest(`/farms/catalog/task_types`),
      getFarmsRequest(`/farms/catalog/loss_reasons?id_farm=${idFarm}`),
      getFarmsRequest(`/farms/catalog/fertilization_types`),
      getFarmsRequest(`/farms/stallions?id_farm=${idFarm}`),
      getFarmsRequest(`/farms/catalog/pig_weight`),
      getFarmsRequest(`/farms/catalog/pig_stages`),
      getFarmsRequest(`/farms/catalog/stage_task_types`),
      getFarmsRequest(`/farms/catalog/pig_tasks?id_farm=${idFarm}`),

     ]).then((resp)=>{
      setPigTypes(resp[0].data as IPigType[])
      setRaces(resp[1].data as IRace[])
      setBirthTypes(resp[2].data as IBirthType[])
      setRoles(resp[3].data as IRole[])
      setAccessArr(resp[4].data as IAccess[])
      setTaskTypes(resp[5].data as ITaskType[])
      setLossReasons(resp[6].data as ILossReason[])
      setFertilizationTypes(resp[7].data as IfertilizationType[])
      setStallions(resp[8].data as IStallion[])
      setPigWeights(resp[9].data as IPigWeight[])
      setPigStages(resp[10].data as IPigStage[])
      setStageTaskTypes(resp[11].data as IStageTaskType[])
      setPigTasks(resp[12].data as IPigTask[])

      setIsLoading(false)
     })
     .catch(error=>{
      console.log({error})
      setError('Error al cargar datos, refrescar la página')
      setIsLoading(false)
     })
  };

  const getPigs = async(payload:number) =>{
   setAccessError(undefined)
   if(!userAccess.find(u=>u.id_access===4)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/farms/pigs?idFarm=${payload}`,setPigs)
    };

    const getFarm = async(payload:number) =>{
        setIsLoading(true)
         const {ok,data}=await getFarmsRequest(`/farms/${payload}`)
         if(ok){
            const farm=data as IFarm[]
            setFarm(farm[0])
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
      };

    const getCode = async(payload:string) =>{
        setIsLoading(true)
         const {ok,data}=await getFarmsRequest(`/farms/code?id_farm=${idFarm}&pig=${payload}`)
         if(ok){
            payload==='pig'?setCode(data as string):setPiggletCode(data as string)
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
      };


  const getFarms = async(payload:number) =>await getPostLoadingOrError(`/farms?id_user=${payload}`,setFarms)

  const getRolesAccess = async(payload:number) =>{
   if(!userAccess.find(u=>u.id_access===7)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/users/role_access?id_role=${payload}&id_farm=${idFarm}`,setRolesAccess)
    };

  const getUbications = async() =>{
   if(!userAccess.find(u=>u.id_access===9)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/farms/catalog/ubications?id_farm=${idFarm}`,setUbications)
    };

  const getTasks = async(id:number,pig:string) =>{
   if(!userAccess.find(u=>u.id_access===11)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/farms/tasks?id=${id}&pig=${pig}`,setTasks)
    };

  const getComments = async(payload:number) =>{
   // if(!userAccess.find(u=>u.id_access===11)&& user?.id_role!==1){
   //    setAccessError('Credenciales inválidas')
   //    return 
   //  }
   return await getPostLoadingOrError(`/farms/comments?id_pig=${payload}`,setComments)
    };

  const postComments = async(payload:IComment) =>{
   // if(!userAccess.find(u=>u.id_access===11)&& user?.id_role!==1){
   //    setAccessError('Credenciales inválidas')
   //    return 
   //  }
   return await getPostLoadingOrError(`/farms/comments`,setComments,payload,state.comments,'id_comment',true)
    };

    const getLosses = async(payload:ILoss) =>{
      // if(!userAccess.find(u=>u.id_access===11)&& user?.id_role!==1){
      //    setAccessError('Credenciales inválidas')
      //    return 
      //  }
      const {id_pig,id_growing_lot,id_lot_piglets}= payload
      return await getPostLoadingOrError(`/farms/losses?id_pig=${id_pig}&id_growing_lot=${id_growing_lot}&id_lot_piglets=${id_lot_piglets}`,setLosses)
       };

       const postLosses = async(payload:ILoss) =>{
         // if(!userAccess.find(u=>u.id_access===11)&& user?.id_role!==1){
         //    setAccessError('Credenciales inválidas')
         //    return 
         //  }
         return await getPostLoadingOrError(`/farms/losses`,setLosses,payload,state.losses,'id_loss',true)
          };



    
    const getAllTasks = async({startDate,endDate}:{startDate:string;endDate:string}) =>{
        setIsLoading(true)
         const {ok,data}=await getFarmsRequest(`/farms/tasks/date?startDate=${startDate}&endDate=${endDate}`)
         if(ok){
            setTasks(data as ITask[])
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
      };


   
   
   const getQuantities = async(payload:number) =>{
       setIsLoading(true)
        const {ok,data}=await postFarmsRequest(`/farms/statics?id_farm=${payload}`,{})
        if(ok){
         setStaticsQuantities(data as IQuantity[])
        }
        else{
         setError(data as string)
        }
        setIsLoading(false)
     };
   const getStaticPigs = async(payload:number) =>{
       setIsLoading(true)
        const {ok,data}=await postFarmsRequest(`/farms/statics/pigs?id_farm=${payload}`,{})
        if(ok){
         setStaticPigs(data as IStaticPig[])
        }
        else{
         setError(data as string)
        }
        setIsLoading(false)
     };
   const getStaticPiglets = async(payload:number) =>{
       setIsLoading(true)
        const {ok,data}=await postFarmsRequest(`/farms/statics/piglets?id_farm=${payload}`,{})
        if(ok){
         setStaticPiglets(data as IStaticPig[])
        }
        else{
         setError(data as string)
        }
        setIsLoading(false)
     };
   const getStaticGrowingPigs = async(payload:number) =>{
       setIsLoading(true)
        const {ok,data}=await postFarmsRequest(`/farms/statics/growing?id_farm=${payload}`,{})
        if(ok){
         setStaticGrowingPigs(data as IStaticPig[])
        }
        else{
         setError(data as string)
        }
        setIsLoading(false)
     };


  const updateTasks = async(payload:ITask) =>{
   if(!userAccess.find(u=>u.id_access===21)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
    return await getPostLoadingOrError(`/farms/tasks`,setTasks,payload,state.tasks,'id_task',true)
    };

    const getBirths = async(payload:number) =>{
        setIsLoading(true)
         const {ok,data}=await getFarmsRequest(`/farms/births?id_pig=${payload}`)
         if(ok){
            setBirths(data as IBirth[])
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
      };

    const getGrowingPigs = async(payload:number) =>{
        setIsLoading(true)
         const {ok,data}=await getFarmsRequest(`/farms/growing_pigs?id_farm=${payload}`)
         if(ok){
            setGrowingPigs(data as IGrowingPigs[])
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
      };

    const createTasksToDo = async(payload:{id_pig:number;id_pig_stage:number;id_user:number;id_lot_piglets:number}) =>{
        setIsLoading(true)
         const {ok,data}=await postFarmsRequest(`/farms/stage_change`,payload)
         if(ok){
            setTasks([...state.tasks,...data as ITask[]])
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
      };

  const postFarm = async(payload:IFarm):Promise<boolean> =>
  await getPostLoadingOrError('/farms',setFarms,payload,state.farms,'id_farm',true)

  const postPig = async(payload:IPig):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===5)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
    setIsLoading(true)
         const {ok,data}=await postFarmsRequest('/farms/pigs',payload)
         if(ok){
            setPigs(returnArray(payload,data as IPig,state.pigs,'id_pig'))
            setPig(data as IPig)
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
         return ok
  };

  const postPiglets = async(payload:IPiglets):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===18)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
    setIsLoading(true)
         const {ok,data}=await postFarmsRequest('/farms/piglets',payload)
         if(ok){
            setPiglets(returnArray(payload,data as IPiglets,state.piglets,'id_lot_piglets'))
            setPiglet(data as IPiglets)
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
         return ok
  };

  const getPiglets = async(payload:number):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===17)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
    setIsLoading(true)
         const {ok,data}=await getFarmsRequest(`/farms/piglets?id_farm=${payload}`,)
         if(ok){
            
            setPiglets(data as IPiglets[])
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
         return ok
  };

  const getProducts = async(payload:number) =>{
   if(!userAccess.find(u=>u.id_access===24)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return 
    }
    await getPostLoadingOrError(`/farms/products?id_farm=${payload}`,setProducts)
    };

  const postProduct = async(payload:IProduct) =>{
   if(!userAccess.find(u=>u.id_access===25)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
   return await getPostLoadingOrError(`/farms/products`,setProducts,payload,state.products,'id_product',true)
    };

  const postGrowingPigs = async(payload:IGrowingPigs):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===19)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true
    }
   setIsLoading(true)
         const {ok,data}=await postFarmsRequest('/farms/growing_pigs',payload)
         if(ok){
            setGrowingPigs(returnArray(payload,data as IGrowingPigs,state.growing_pigs,'id_growing_lot'))
            setGrowingPig(data as IGrowingPigs)
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
         return ok
  };

  const postRoleAccess = async(payload:IRoleAccess):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===8)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/users/role_access',setRolesAccess,payload,state.rolesAccess,'id_role_access',true)
  };
  const postUbication = async(payload:IUbication):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===10)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/ubications',setUbications,payload,state.ubications,'id_ubication',true)
  };

  const postUbicationForm = async(payload:IUbication):Promise<{ok:boolean;data:IUbication | string}> =>{
   if(!userAccess.find(u=>u.id_access===10)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return {ok:true, data:{} as IUbication} 
    }
    setIsLoading(true)
         const {ok,data}=await postFarmsRequest('/farms/catalog/ubications',payload)
         if(ok){
            
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
         return {ok,data:data as IUbication | string}
    
  };



  const postTask = async(payload:IPigTask):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===12)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/pig_tasks',setPigTasks,payload,state.pigTasks,'id_pig_task',true)
  };
  const postNewTask = async(payload:ITask):Promise<boolean> =>{
   // if(!userAccess.find(u=>u.id_access===12)&& user?.id_role!==1){
   //    setAccessError('Credenciales inválidas')
   //    return true 
   //  }
    return await getPostLoadingOrError('/farms/tasks',setTasks,payload,state.tasks,'id_task',true)
  };

  const postLossReason = async(payload:ILossReason):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===14)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/loss_reasons',setLossReasons,payload,state.lossReasons,'id_loss_reason',true)
  };

  const postStallion = async(payload:IStallion):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===15)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/stallions',setStallions,payload,state.stallions,'id_stallion',true)
  };

  const postRace = async(payload:IRace):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===16)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/catalog/races',setRaces,payload,state.races,'id_race',true)
  };

  const postBirth = async(payload:IBirth):Promise<boolean> =>{
   if(!userAccess.find(u=>u.id_access===23)&& user?.id_role!==1){
      setAccessError('Credenciales inválidas')
      return true 
    }
    return await getPostLoadingOrError('/farms/births',setBirths,payload,state.births,'id_birth',true)
  };
  
  const updateBirth = async(payload:IPiglets) =>{
      setIsLoading(true)
       const {ok,data}=await postFarmsRequest(`/farms/births/1`,payload)
       if(ok){
  
       }
       else{
        setError(data as string)
       }
       setIsLoading(false)
    };


  const postNewPiglets = async(payload:IPiglets):Promise<boolean | number> =>{
    setIsLoading(true)
         const {ok,data}=await postFarmsRequest('/farms/piglets',payload)
         if(ok){
           return (data as IPiglets).id_lot_piglets
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
         return ok

  };

  
  const movePiglets = async(payload:IPiglets) =>{
      setIsLoading(true)
       const {ok,data}=await postFarmsRequest(`/farms/piglets`,payload)
       if(ok){
         await getPiglets(payload.id_farm)
       }
       else{
        setError(data as string)
       }
       setIsLoading(false)
       return ok
    };
  

  const postCrossingDate = async(payload:{id_stallion:number,crossing_date:string,id_pig:number,id_user:number,id_fertilization_type:number}) =>{
      setIsLoading(true)
       const {ok,data}=await postFarmsRequest(`/farms/crossing`,payload)
       if(ok){
         const {pig,birth}= data as ICrossing
         setBirths([...state.births,birth])
         setPigs(returnArray(state.pig!,pig,state.pigs,'id_pig'))
         setPig(pig)
       }
       else{
        setError(data as string)
       }
       setIsLoading(false)
       return ok
    };

  const setFarms = (payload:IFarm[]) =>{
     dispatch({
      type:'[Farms] - setFarms',
      payload
     })
  };

  const setFarm = (payload:IFarm | undefined) =>{
     dispatch({
      type:'[Farms] - setFarm',
      payload
     })
  };

  const setIsLoading = (payload:boolean) =>{
     dispatch({
      type:'[Farms] - setIsLoading',
      payload
     })
  };

  const setError = (payload:string | undefined) =>{
     dispatch({
      type:'[Farms] - setError',
      payload
     })
  };
  const setUbications = (payload:IUbication[]) =>{
     dispatch({
      type:'[Farms] - setUbications',
      payload
     })
  };

  const setPigTypes = (payload:IPigType[]) =>{
     dispatch({
      type:'[Farms] - setPigTypes',
      payload
     })
  };

  const setRaces = (payload:IRace[]) =>{
     dispatch({
      type:'[Farms] - setRaces',
      payload
     })
  };

  const setPigs = (payload:IPig[]) =>{
     dispatch({
      type:'[Farms] - setPigs',
      payload
     })
  };
  const setPig = (payload:IPig | undefined) =>{
     dispatch({
      type:'[Farms] - setPig',
      payload
     })
  };

  const setFarmAction = (payload:string | undefined) =>{
     dispatch({
      type:'[Farms] - setFarmAction',
      payload
     })
  };

  const setRole = (payload:IRole | undefined) =>{
     dispatch({
      type:'[Farms] - setRole',
      payload
     })
  };
  const setRoles = (payload:IRole[] ) =>{
     dispatch({
      type:'[Farms] - setRoles',
      payload
     })
  };

  const setAccessArr = (payload:IAccess[] ) =>{
     dispatch({
      type:'[Farms] - setAccessArr',
      payload
     })
  };

  const setRoleAccess = (payload:IRoleAccess | undefined ) =>{
     dispatch({
      type:'[Farms] - setRoleAccess',
      payload
     })
  };
  const setRolesAccess = (payload:IRoleAccess[] ) =>{
     dispatch({
      type:'[Farms] - setRolesAccess',
      payload
     })
  };

  const setUbication = (payload:IUbication| undefined ) =>{
     dispatch({
      type:'[Farms] - setUbication',
      payload
     })
  };

  const setTask = (payload:ITask| undefined ) =>{
     dispatch({
      type:'[Farms] - setTask',
      payload
     })
  };

  const setTasks = (payload:ITask[] ) =>{
     dispatch({
      type:'[Farms] - setTasks',
      payload
     })
  };

  const setTaskTypes = (payload:ITaskType[] ) =>{
     dispatch({
      type:'[Farms] - setTaskTypes',
      payload
     })
  };

  const setLossReason = (payload:ILossReason | undefined ) =>{
     dispatch({
      type:'[Farms] - setLossReason',
      payload
     })
  };

  const setLossReasons = (payload:ILossReason[] ) =>{
     dispatch({
      type:'[Farms] - setLossReasons',
      payload
     })
  };
  const setFertilizationTypes = (payload:IfertilizationType[] ) =>{
     dispatch({
      type:'[Farms] - setFertilizationTypes',
      payload
     })
  };
  const setStallions = (payload:IStallion[] ) =>{
     dispatch({
      type:'[Farms] - setStallions',
      payload
     })
  };
  const setStallion = (payload:IStallion | undefined ) =>{
     dispatch({
      type:'[Farms] - setStallion',
      payload
     })
  };
  const setRace = (payload:IRace | undefined ) =>{
     dispatch({
      type:'[Farms] - setRace',
      payload
     })
  };
  
  const setBirth = (payload:IBirth | undefined ) =>{
     dispatch({
      type:'[Farms] - setBirth',
      payload
     })
  };

  const setBirths = (payload:IBirth[] ) =>{
     dispatch({
      type:'[Farms] - setBirths',
      payload
     })
  };

  const setCode = (payload: string | undefined ) =>{
     dispatch({
      type:'[Farms] - setCode',
      payload
     })
  };
  const setPiggletCode = (payload: string | undefined ) =>{
     dispatch({
      type:'[Farms] - setPiggletCode',
      payload
     })
  };

  const setPigWeights = (payload: IPigWeight[] ) =>{
     dispatch({
      type:'[Farms] - setPigWeights',
      payload
     })
  };

  const setPigStages = (payload: IPigStage[] ) =>{
     dispatch({
      type:'[Farms] - setPigStages',
      payload
     })
  };
  const setPigTasks = (payload: IPigTask[] ) =>{
     dispatch({
      type:'[Farms] - setPigTasks',
      payload
     })
  };
  const setPigTask = (payload: IPigTask | undefined ) =>{
     dispatch({
      type:'[Farms] - setPigTask',
      payload
     })
  };
  const setStageTaskTypes = (payload: IStageTaskType[] ) =>{
     dispatch({
      type:'[Farms] - setStageTaskTypes',
      payload
     })
  };
  const setBirthTypes = (payload: IBirthType[] ) =>{
     dispatch({
      type:'[Farms] - setBirthTypes',
      payload
     })
  };
  const setPiglets = (payload: IPiglets[] ) =>{
     dispatch({
      type:'[Farms] - setPiglets',
      payload
     })
  };
  const setPiglet = (payload: IPiglets | undefined ) =>{
     dispatch({
      type:'[Farms] - setPiglet',
      payload
     })
  };
  const setGrowingPigs = (payload: IGrowingPigs[] ) =>{
     dispatch({
      type:'[Farms] - setGrowingPigs',
      payload
     })
  };
  const setGrowingPig = (payload: IGrowingPigs | undefined ) =>{
     dispatch({
      type:'[Farms] - setGrowingPig',
      payload
     })
  };
  const setStaticsQuantities = (payload: IQuantity[] ) =>{
     dispatch({
      type:'[Farms] - setStaticsQuantities',
      payload
     })
  };
  const setStaticPigs = (payload: IStaticPig[] ) =>{
     dispatch({
      type:'[Farms] - setStaticPigs',
      payload
     })
  };
  const setStaticPiglets = (payload: IStaticPig[] ) =>{
     dispatch({
      type:'[Farms] - setStaticPiglets',
      payload
     })
  };
  const setStaticGrowingPigs = (payload: IStaticPig[] ) =>{
     dispatch({
      type:'[Farms] - setStaticGrowingPigs',
      payload
     })
  };
  const setProducts = (payload: IProduct[] ) =>{
     dispatch({
      type:'[Farms] - setProducts',
      payload
     })
  };
  const setProduct = (payload: IProduct | undefined ) =>{
     dispatch({
      type:'[Farms] - setProduct',
      payload
     })
  };

  const setComments = (payload: IComment[] ) =>{
     dispatch({
      type:'[Farms] - setComments',
      payload
     })
  };

  const setComment = (payload: IComment | undefined ) =>{
     dispatch({
      type:'[Farms] - setComment',
      payload
     })
  };

  const setLosses = (payload: ILoss[] ) =>{
     dispatch({
      type:'[Farms] - setLosses',
      payload
     })
  };

  const setLoss = (payload: ILoss | undefined ) =>{
     dispatch({
      type:'[Farms] - setLoss',
      payload
     })
  };

  const setMonthBirth = (payload: IMonthBirth | undefined ) =>{
     dispatch({
      type:'[Farms] - setMonthBirth',
      payload
     })
  };


  const getPostLoadingOrError = async<T,K extends keyof T>(
      endpoint:string,setState:(payload: T[]) => void,payload?:T,state?:T[],id?:K,wich?:boolean
   ) =>{
   setError(undefined)
   setIsLoading(true)
   const {ok,data}= wich ? await  postFarmsRequest(endpoint,payload): await getFarmsRequest(endpoint)
   if(ok){
      wich
         ?setState(returnArray(payload as object,data as object,state as object[],id as never) as T[])
         :setState(data as T[])
   }
   else{
    setError(data as string)
   }
   setIsLoading(false)
   return ok
 };

  return (
    <FarmsContext.Provider value={{
      ...state,

      setFarm,
      postFarm,
      setError,
      postPig,
      setPig,
      getPigs,
      setFarmAction,
      setRole,
      postRoleAccess,
      getRolesAccess,
      setRoleAccess,
      getFarms,
      getFarm,
      getUbications,
      setUbication,
      postUbication,
      setTask,
      postTask,
      setLossReason,
      postLossReason,
      setStallion,
      postStallion,
      setRace,
      postRace,
      postCrossingDate,
      getBirths,
      getCode,
      setPigTask,
      getTasks,
      updateTasks,
      setBirth,
      postBirth,
      createTasksToDo,
      postPiglets,
      postNewPiglets,
      setPiglet,
      updateBirth,
      movePiglets,
      setGrowingPig,
      setGrowingPigs,
      postGrowingPigs,
      getGrowingPigs,
      getPiglets,
      setPiglets,
      getAllTasks,
      getQuantities,
      getStaticPigs,
     getStaticPiglets,
     getStaticGrowingPigs,
     setProduct,
     getProducts,
     postProduct,
     getComments,
     setComment,
     postComments,
     setLoss,
     getLosses,
     postLosses,
     postUbicationForm,
     setMonthBirth,
     postNewTask
    }}>
      {children}
    </FarmsContext.Provider>
  )
}
'use client'
import { IAccess, IAnswer, IBirth, IBirthType, IComment, ILoss, ILossReason, IPig, IPigLossType, IPigStage, IPigTask, IPigType, IPigWeight, IPiglets, IProduct, IQuantity, IQuestion, IRace, IReport, IRole, IRoleAccess, IStage,  IStageTaskType,  IStallion,  IStaticPig,  ITask,  ITaskType,  IUbication, IfertilizationType } from '@/interfaces';
import { UsersState } from './FarmsProvider'
import { IFarm, IMonthBirth } from '@/interfaces/farm';
import { IGrowingPigs } from '@/interfaces/growing_pigs';
import { IStallionMonths } from '@/interfaces/stallions';

 type UsersActionType=
          {type:'[Farms] - setFarms';payload:IFarm[]}
        | {type:'[Farms] - setFarm'; payload:IFarm | undefined}
        | {type:'[Farms] - setIsLoading'; payload:boolean}
        | {type:'[Farms] - setError'; payload:string | undefined}
        | {type:'[Farms] - setUbications'; payload:IUbication[] }
        | {type:'[Farms] - setStages'; payload:IStage[] }
        | {type:'[Farms] - setStage'; payload:IStage | undefined }
        | {type:'[Farms] - setPigTypes'; payload:IPigType[] }
        | {type:'[Farms] - setRaces'; payload:IRace[] }
        | {type:'[Farms] - setRace'; payload:IRace | undefined }
        | {type:'[Farms] - setPigs'; payload:IPig[] }
        | {type:'[Farms] - setPig'; payload:IPig | undefined }
        | {type:'[Farms] - setFarmAction'; payload:string | undefined }
        | {type:'[Farms] - setRoles'; payload:IRole[] }
        | {type:'[Farms] - setRole'; payload:IRole | undefined }
        | {type:'[Farms] - setAccessArr'; payload:IAccess[]  }
        | {type:'[Farms] - setAccess'; payload:IAccess | undefined }
        | {type:'[Farms] - setRoleAccess'; payload:IRoleAccess | undefined }
        | {type:'[Farms] - setRolesAccess'; payload:IRoleAccess[] }
        | {type:'[Farms] - setUbication'; payload:IUbication | undefined }
        | {type:'[Farms] - setTasks'; payload:ITask[] }
        | {type:'[Farms] - setTask'; payload:ITask | undefined }
        | {type:'[Farms] - setTaskTypes'; payload:ITaskType[] }
        | {type:'[Farms] - setLossReasons'; payload:ILossReason[] }
        | {type:'[Farms] - setLossReason'; payload:ILossReason | undefined }
        | {type:'[Farms] - setFertilizationTypes'; payload:IfertilizationType[] }
        | {type:'[Farms] - setStallions'; payload:IStallion[] }
        | {type:'[Farms] - setStallion'; payload:IStallion | undefined }
        | {type:'[Farms] - setBirth'; payload:IBirth | undefined }
        | {type:'[Farms] - setBirths'; payload:IBirth[] }
        | {type:'[Farms] - setCode'; payload:string | undefined }
        | {type:'[Farms] - setPiggletCode'; payload:string | undefined }
        | {type:'[Farms] - setPigWeights'; payload:IPigWeight[] }
        | {type:'[Farms] - setPigStages'; payload:IPigStage[] }
        | {type:'[Farms] - setPigTasks'; payload:IPigTask[] }
        | {type:'[Farms] - setPigTask'; payload:IPigTask | undefined }
        | {type:'[Farms] - setStageTaskTypes'; payload:IStageTaskType[] }
        | {type:'[Farms] - setBirthTypes'; payload:IBirthType[] }
        | {type:'[Farms] - setPiglets'; payload:IPiglets[] }
        | {type:'[Farms] - setPiglet'; payload:IPiglets | undefined }
        | {type:'[Farms] - setGrowingPig'; payload:IGrowingPigs | undefined }
        | {type:'[Farms] - setGrowingPigs'; payload:IGrowingPigs[] }
        | {type:'[Farms] - setStaticsQuantities'; payload:IQuantity[] }
        | {type:'[Farms] - setStaticPigs'; payload:IStaticPig[] }
        | {type:'[Farms] - setStaticPiglets'; payload:IStaticPig[] }
        | {type:'[Farms] - setStaticGrowingPigs'; payload:IStaticPig[] }
        | {type:'[Farms] - setProducts'; payload:IProduct[] }
        | {type:'[Farms] - setProduct'; payload:IProduct | undefined }
        | {type:'[Farms] - setComments'; payload:IComment[] }
        | {type:'[Farms] - setComment'; payload:IComment | undefined }
        | {type:'[Farms] - setLosses'; payload:ILoss[] }
        | {type:'[Farms] - setLoss'; payload:ILoss | undefined }
        | {type:'[Farms] - setMonthBirth'; payload:IMonthBirth | undefined }
        | {type:'[Farms] - setStallionMonths'; payload:IStallionMonths | undefined }
        | {type:'[Farms] - setQuestions'; payload:IQuestion[] }
        | {type:'[Farms] - setQuestion'; payload:IQuestion | undefined }
        | {type:'[Farms] - setAnswers'; payload:IAnswer[] }
        | {type:'[Farms] - setAnswer'; payload:IAnswer | undefined }
        | {type:'[Farms] - setTaskStartDate'; payload:Date | null }
        | {type:'[Farms] - setTaskEndDate'; payload:Date | null }
        | {type:'[Farms] - setSearchedTasks'; payload:ITask[] }
        | {type:'[Farms] - setPigletTaskStartDate'; payload:Date | null }
        | {type:'[Farms] - setPigletTaskEndDate'; payload:Date | null }
        | {type:'[Farms] - setSearchedPigletTasks'; payload:ITask[] }
        | {type:'[Farms] - setGeneralUbication'; payload:IUbication | undefined }
        | {type:'[Farms] - setReport'; payload:IReport | undefined }
        | {type:'[Farms] - setPigLossTypes'; payload:IPigLossType[] }
        
        
export const usersReducer = (state:UsersState,action:UsersActionType):UsersState => {
  
  switch (action.type) {
    case '[Farms] - setFarms':
      return {
        ...state,
        farms:action.payload
      }

    case '[Farms] - setFarm':
      return {
        ...state,
        farm:action.payload
      }

    case '[Farms] - setIsLoading':
      return {
        ...state,
        farmsLoading:action.payload
      }

    case '[Farms] - setError':
      return {
        ...state,
        farmsError:action.payload
      }
    case '[Farms] - setUbications':
      return {
        ...state,
        ubications:action.payload
      }

    case '[Farms] - setPigTypes':
      return {
        ...state,
        pigTypes:action.payload
      }
  
    case '[Farms] - setRaces':
      return {
        ...state,
        races:action.payload
      }

    case '[Farms] - setPigs':
      return {
        ...state,
        pigs:action.payload
      }

    case '[Farms] - setPig':
      return {
        ...state,
        pig:action.payload
      }
  
    case '[Farms] - setFarmAction':
      return {
        ...state,
        farmAction:action.payload
      }
    case '[Farms] - setRoles':
      return {
        ...state,
        roles:action.payload
      }

    case '[Farms] - setRole':
      return {
        ...state,
        role:action.payload
      }

    case '[Farms] - setAccessArr':
      return {
        ...state,
        accessArr:action.payload
      }

    case '[Farms] - setAccess':
      return {
        ...state,
        access:action.payload
      }
    case '[Farms] - setRolesAccess':
      return {
        ...state,
        rolesAccess:action.payload
      }

    case '[Farms] - setRoleAccess':
      return {
        ...state,
        roleAccess:action.payload
      }

    case '[Farms] - setUbication':
      return {
        ...state,
        ubication:action.payload
      }

    case '[Farms] - setTasks':
      return {
        ...state,
        tasks:action.payload
      }

    case '[Farms] - setTask':
      return {
        ...state,
        task:action.payload
      }

    case '[Farms] - setTaskTypes':
      return {
        ...state,
        taskTypes:action.payload
      }


    case '[Farms] - setLossReasons':
      return {
        ...state,
        lossReasons:action.payload
      }

    case '[Farms] - setLossReason':
      return {
        ...state,
        lossReason:action.payload
      }

    case '[Farms] - setFertilizationTypes':
      return {
        ...state,
        fertilizatinTypes:action.payload
      }

    case '[Farms] - setStallions':
      return {
        ...state,
        stallions:action.payload
      }

    case '[Farms] - setStallion':
      return {
        ...state,
        stallion:action.payload
      }

    case '[Farms] - setRace':
      return {
        ...state,
        race:action.payload
      }

    case '[Farms] - setBirth':
      return {
        ...state,
        birth:action.payload
      }
    case '[Farms] - setBirths':
      return {
        ...state,
        births:action.payload
      }
    case '[Farms] - setCode':
      return {
        ...state,
        code:action.payload
      }
    case '[Farms] - setPiggletCode':
      return {
        ...state,
        piggletCode:action.payload
      }
    case '[Farms] - setPigWeights':
      return {
        ...state,
        weightTypes:action.payload
      }
    case '[Farms] - setPigStages':
      return {
        ...state,
        pigStages:action.payload
      }
  
    case '[Farms] - setPigTasks':
      return {
        ...state,
        pigTasks:action.payload
      }
  
    case '[Farms] - setPigTask':
      return {
        ...state,
        pigTask:action.payload
      }
  
    case '[Farms] - setStageTaskTypes':
      return {
        ...state,
        stageTaskTypes:action.payload
      }
  
    case '[Farms] - setBirthTypes':
      return {
        ...state,
        birthTypes:action.payload
      }

    case '[Farms] - setPiglets':
      return {
        ...state,
        piglets:action.payload
      }
    case '[Farms] - setPiglet':
      return {
        ...state,
        piglet:action.payload
      }
    case '[Farms] - setGrowingPig':
      return {
        ...state,
        growing_pig:action.payload
      }
    case '[Farms] - setGrowingPigs':
      return {
        ...state,
        growing_pigs:action.payload
      }
    case '[Farms] - setStaticsQuantities':
      return {
        ...state,
        statics_quantities:action.payload
      }
    case '[Farms] - setStaticPigs':
      return {
        ...state,
        staticPigs:action.payload
      }
    case '[Farms] - setStaticPiglets':
      return {
        ...state,
        staticPiglets:action.payload
      }
    case '[Farms] - setStaticGrowingPigs':
      return {
        ...state,
        staticGrowingPigs:action.payload
      }
    case '[Farms] - setProducts':
      return {
        ...state,
        products:action.payload
      }
    case '[Farms] - setProduct':
      return {
        ...state,
        product:action.payload
      }
    case '[Farms] - setComments':
      return {
        ...state,
        comments:action.payload
      }

    case '[Farms] - setComment':
      return {
        ...state,
        comment:action.payload
      }

    case '[Farms] - setLosses':
      return {
        ...state,
        losses:action.payload
      }

    case '[Farms] - setLoss':
      return {
        ...state,
        loss:action.payload
      }

    case '[Farms] - setMonthBirth':
      return {
        ...state,
        monthBirth:action.payload
      }

    case '[Farms] - setStallionMonths':
      return {
        ...state,
        stallion_months:action.payload
      }

    case '[Farms] - setAnswers':
      return {
        ...state,
        answers:action.payload
      }

    case '[Farms] - setAnswer':
      return {
        ...state,
        answer:action.payload
      }
      
    case '[Farms] - setQuestions':
      return {
        ...state,
        questions:action.payload
      }

    case '[Farms] - setQuestion':
      return {
        ...state,
        question:action.payload
      }

    case '[Farms] - setTaskStartDate':
      return {
        ...state,
        taskStartDate:action.payload
      }

    case '[Farms] - setTaskEndDate':
      return {
        ...state,
        taskEndDate:action.payload
      }

    case '[Farms] - setSearchedTasks':
      return {
        ...state,
        searchedTasks:action.payload
      }
      //---------
    case '[Farms] - setPigletTaskStartDate':
      return {
        ...state,
        taskPigletStartDate:action.payload
      }

    case '[Farms] - setPigletTaskEndDate':
      return {
        ...state,
        taskPigletEndDate:action.payload
      }

    case '[Farms] - setSearchedPigletTasks':
      return {
        ...state,
        searchedPigletTasks:action.payload
      }

    case '[Farms] - setGeneralUbication':
      return {
        ...state,
        general_ubication:action.payload
      }

    case '[Farms] - setReport':
      return {
        ...state,
        report:action.payload
      }

    case '[Farms] - setPigLossTypes':
      return {
        ...state,
        pigLossTypes:action.payload
      }
  
    default:
      return state
  }
}
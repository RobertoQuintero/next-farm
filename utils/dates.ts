export const addZero = (today:Date):string => {
  const date=today.toLocaleString().split(',')[0].split('/') as string[]
  const converted= date.map(d=>{
    if(+d<10){
      return `0${d}`
    }
    return d
  }).reverse().join('-')
  return converted
};

export const buildDate=(date:Date)=>{
  return `${addZero(date)} ${date.toLocaleTimeString()}`
}

export const buildDateReverse=(date:string)=>{
  const day = date.split('T')[0]
  const hour=date.split('T')[1].split('.')[0]
  return `${day} ${hour}`
}
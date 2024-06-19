export const addZero = (today:Date):string => {
  const date=[today.getFullYear(),today.getMonth()+1,today.getDate()]
  const converted= date.map(d=>{
    if(+d<10){
      return `0${d}`
    }
    return d
  }).join('-')
  return converted
};

export const buildDate=(date:Date)=>{
  const hours=[date.getHours(),date.getMinutes(),date.getSeconds()]
  const zeros=hours.map(d=>{
    if(+d<10){
      return `0${d}`
    }
    return d
  }).join(':')
  return `${addZero(date)} ${zeros}`
}

export const buildDateReverse=(date:string)=>{
  const day = date?.split('T')[0]
  const hour=date?.split('T')[1].split('.')[0]
  return `${day} ${hour}`
}
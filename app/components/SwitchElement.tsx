import { Switch } from '@mui/material';
import React, { SetStateAction } from 'react'

interface Props{
  checked:boolean;
  setChecked: (value: SetStateAction<boolean>) => void
  text_true:string;
  text_false:string;
}

export const SwitchElement = ({checked,setChecked,text_true,text_false}:Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
      <p>{checked?text_true:text_false}</p>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </div>
  )
}

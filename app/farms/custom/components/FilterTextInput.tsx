import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface Props{
  data:any[]
}

export const FilterableList = ({ data }:Props) => {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFilter(inputValue);

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <TextField
        label="Filtrar"
        variant="outlined"
        onChange={handleFilterChange}
        value={filter}
      />

      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};


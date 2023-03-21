import { useState } from 'react'
import Button from '@mui/material/Button';
import { Switch } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Button variant="contained">Hello World</Button>
      <Switch sx={{
        '& .Mui-checked': {
          color: 'black'
        }
      }}/>
    </div>
  )
}

export default App

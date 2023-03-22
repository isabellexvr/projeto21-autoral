import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

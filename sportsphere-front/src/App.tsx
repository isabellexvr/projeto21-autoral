import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import ThemeProvider from './Contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import ThemeProvider from './Contexts/ThemeContext';
import LoginPage from './Pages/SignUpPage';
import "./assets/reset.css"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path="/sign-up" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

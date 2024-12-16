//import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from './pages/Admin/Home'


function App() {
  
  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
        </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App

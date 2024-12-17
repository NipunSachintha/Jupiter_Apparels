//import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from './pages/Admin/Home'
import Login from './pages/login';
import ProtectedRoute from './components/protectedroute';


function App() {
  
  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home/>} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App

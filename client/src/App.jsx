//import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Admin_dashboard from './pages/Admin/admin_dashboard';
import HRmanager_dashboard from './pages/HRmanager/HRmanagerdashboard';
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
          <Route path="/admin-dashboard" element={<Admin_dashboard/>} />
          <Route path="/HRmanager-dashboard" element={<HRmanager_dashboard/>}/>
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App

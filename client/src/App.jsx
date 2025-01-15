//import './App.css'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Admin_dashboard from './pages/Admin/admin_dashboard';
import HRmanager_dashboard from './pages/HRmanager/HRmanagerdashboard';
import SecManager_dashboard from './pages/SecManager/SecManager_dashboard';
import Employee_dashboard from './pages/employee/employee_dashboard';
import Login from './pages/login';
import ProtectedRoute from './components/protectedroute';
import { AuthProvider } from './context/AuthContext';
import LeaveRequest from './pages/RequestLeave';
import Dashboard from './pages/Dashboard';


function App() {
  
  return (
    <>
    
        <AuthProvider>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
    
          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['Admin User']}><Admin_dashboard/></ProtectedRoute>}/>
          <Route path="/HRmanager-dashboard" element={<ProtectedRoute allowedRoles={['HR Manager']}><HRmanager_dashboard/></ProtectedRoute>}/>
          <Route path="/Secmanager-dashboard" element={<ProtectedRoute allowedRoles={['Second Manager']}><SecManager_dashboard/></ProtectedRoute>}/>
          <Route path="/employee-dashboard" element={<ProtectedRoute allowedRoles={['Employee']}><Employee_dashboard/></ProtectedRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['Employee','HR Manager','Second Manager','Admin User']}><Dashboard/></ProtectedRoute>}/>
          <Route path="/leaveRequest" element={<ProtectedRoute allowedRoles={['Employee','HR Manager','Second Manager']}><LeaveRequest></LeaveRequest></ProtectedRoute>} />
          
        <Route path="*" element={<h1>404 Not Found</h1>} />
        
        </Routes>
        </BrowserRouter>
        </AuthProvider>
      
      
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import { employeeMenu, adminMenu,hrManagerMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../axios';

const Layout = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const SidebarMenu = user?.Auth_Level==='Admin User'
    ? adminMenu
    : user?.Auth_Level==='Employee' || user?.Auth_Level==='Second Manager' ? employeeMenu : user?.Auth_Level==='HR Manager' ? hrManagerMenu : "";
  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/users/notification?userId=${user.User_ID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotifications(res.data.success ? res.data.data : []);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-4">
        {SidebarMenu.map((menu, index) => (
          <Link
            key={index}
            to={menu.path}
            className={`block py-2 px-4 rounded ${location.pathname === menu.path ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          >
            {menu.name}
          </Link>
        ))}
        <button className="w-full py-2 px-4 mt-4 bg-red-600 rounded hover:bg-red-700" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col">
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1>Hello, {user?.User_Name}</h1>
          <button onClick={() => setShowModal(true)}>
            <img src="/notification.png" alt="Notifications" className="h-6" />
          </button>
        </div>
        <div className="p-4 flex-grow bg-gray-100">{children}</div>
      </div>

      {/* Notifications Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notifications.length > 0 ? (
            notifications.map((noti, index) => <div key={index}>{noti.Notification}</div>)
          ) : (
            <div>No notifications</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Layout;

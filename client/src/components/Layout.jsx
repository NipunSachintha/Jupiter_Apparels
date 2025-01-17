import React, { useEffect, useState } from 'react';
import { employeeMenu, adminMenu, hrManagerMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import CustomAlert from './CustomAlert';
import Button from 'react-bootstrap/Button';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import api from '../axios';
import './Layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Layout = ({ children }) => {
  const [Stats, setStats] = useState(0);
  const [notifiAllRead, setNotifiAllRead] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showMessage, setShowMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'yyyy-MM-dd HH:mm');
  };

  const handleMessageShow = (notification, datetime) => {
    setShowMessage(notification);
    const setStatus = async () => {
      try {
        dispatch(showLoading());
        const res = await api.put(
          `/users/notification`,
          {
            userId: user.User_ID,
            datetime: datetime,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          setStats(Stats + 1);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    };
    setStatus();
  };

  const closeMessageShow = () => {
    setShowMessage('');
  };

  const notificationShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAlertMessage('Successfully Logged out');
    setTimeout(() => {
      dispatch(setUser(null));
      navigate('/login');
    }, 1000);
  };

  useEffect(() => {
    const getTeam = async () => {
      try {
        dispatch(showLoading());
        const res = await api.get(
          `/users/team?employeeId=${user.Employee_ID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        setHasTeam(res.data.success);
      } catch (error) {
        dispatch(hideLoading());
        if (error.response && error.response.status === 404) {
          setHasTeam(false);
        } else {
          console.error('Error fetching notifications:', error);
        }
      }
    };
    getTeam();
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        dispatch(showLoading());
        const res = await api.get(
          `/users/notification?userId=${user.User_ID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        dispatch(hideLoading());
        const sortedData = res.data.data.sort((a, b) => {
          return new Date(b.DateTime) - new Date(a.DateTime);
        });
        setNotifications(sortedData);
      } catch (error) {
        dispatch(hideLoading());
        if (error.response && error.response.status === 404) {
          setNotifications([]);
          setNotifiAllRead(true);
        } else {
          console.error('Error fetching notifications:', error);
        }
      }
    };
    getNotifications();
  }, [Stats]);

  useEffect(() => {
    if (notifications.length > 0) {
      setNotifiAllRead(notifications.every(element => element.Status === 1));
    } else {
      setNotifiAllRead(true);
    }
  }, [notifications]);

  const SidebarMenu = user?.Auth_Level === 'Admin User'
    ? adminMenu
    : user?.Auth_Level === 'Employee' || user?.Auth_Level === 'Second Manager'
    ? employeeMenu
    : user?.Auth_Level === 'HR Manager'
    ? hrManagerMenu
    : '';

  return (
    <>
      <div className="flex bg-gray-100 text-gray-800">
        <div className="w-1/5 bg-white text-gray-900 border-r border-gray-300 min-h-screen">
          <div className="p-4 text-xl">
            {SidebarMenu.filter(menu => !(menu.name === 'Approve / Reject Leave' && !hasTeam))
              .map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <Link to={menu.path} key={`${menu.path}-${index}`}>
                    <div
                      className={`menu-item ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} \
                      p-3 shadow-md cursor-pointer rounded-md my-3`}
                    >
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={menu.icon} className="mr-2" />
                        {menu.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            <div
              className="menu-item p-3 rounded-md my-3 bg-red-100 text-red-700 cursor-pointer hover:bg-red-200"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className="mr-2" />
              Logout
            </div>
          </div>
        </div>

        <div className="w-4/5">
          <div className="bg-white shadow-md p-4 flex justify-between items-center h-[10vh]">
            <div className="text-2xl font-semibold text-gray-800">
              Hello, {user?.User_Name}
            </div>
            <button className="relative" onClick={notificationShow}>
              <img src="/notification.png" alt="Notification Icon" className="h-8" />
              {!notifiAllRead && <img src="/reddot.png" alt="Red Dot" className="absolute h-3 w-3 top-0 right-0" />}
            </button>
          </div>

          <div className="p-4 bg-gray-100 min-h-screen">
            {children}
          </div>
        </div>

        {alertMessage && (
          <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {notifications.length > 0 ? (
              notifications.map(noti => (
                <button
                  key={noti.DateTime}
                  onClick={() => handleMessageShow(noti.Notification, noti.DateTime)}
                  className={`w-full p-3 rounded-md mb-2 \
                  ${noti.Status === 1 ? 'bg-green-100' : 'bg-green-300'} hover:shadow-md`}
                >
                  <div>{noti.Notification}</div>
                  <div className="text-sm text-gray-500 text-right">{formatDateTime(noti.DateTime)}</div>
                </button>
              ))
            ) : (
              <div>No notifications</div>
            )}
          </div>
          {showMessage && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 \
              bg-yellow-50 border border-yellow-300 p-4 rounded shadow-lg">
              <div>{showMessage}</div>
              <button className="mt-2 px-4 py-2 bg-gray-200 rounded" onClick={closeMessageShow}>Close</button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Layout;

import React from 'react';
import { useSelector } from 'react-redux';
import { employeeMenu, adminMenu, hrManagerMenu } from '../Data/data.jsx'; // Import menus

const Header = () => {
  const userType = useSelector((state) => state.user.userType);

  let menuItems;
  if (userType === 'employee') {
    menuItems = employeeMenu;
  } else if (userType === 'admin') {
    menuItems = adminMenu;
  } else if (userType === 'hrManager') {
    menuItems = hrManagerMenu;
  }

  return (
    <header>
      <div className="menu-buttons">
        {menuItems?.map((item, index) => (
          <button 
            key={index} 
            className="menu-button"
            onClick={() => window.location.href = item.path}
          >
            <i className={item.icon}></i>
            {item.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;

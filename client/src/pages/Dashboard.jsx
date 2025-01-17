import React from 'react';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import LeaveBalanceVisualizer from '../components/leave_balance';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user.User_ID;

  const isAdmin = user.Auth_Level == 'Admin User';

  return (
    <Layout
      children={
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
          {/* Welcome Banner */}
          <div
            style={{
              backgroundColor: '#dbeafe', // Light blue background
              padding: '120px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '30px', // Space between the banner and next section
            }}
          >
            <h1
              style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: '#111827', // Dark text color
                margin: 0,
                
              }}
            >
              Welcome to Jupiter Apparels
            </h1>
          </div>

          {/* Leave Balance Section */}
          {!isAdmin && (
            <div
            style={{
              backgroundColor: '#ffffff', // White background
              padding: '5px',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
          >
            
            <LeaveBalanceVisualizer userId={userId} />
          </div>

          )}
          
        </div>
      }
    />
  );
};

export default Dashboard;

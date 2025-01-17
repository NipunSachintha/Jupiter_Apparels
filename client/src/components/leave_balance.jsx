import React, { useEffect, useState } from 'react';
import api from '../axios';

const LeaveBalanceVisualizer = ({ userId }) => {
  const [leaveData, setLeaveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeavebalance = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/approve-reject-leaves/get-leave-balance?User_ID=${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        const fetchedRequests = response.data.data[0]?.result?.data || [];
        setLeaveData(fetchedRequests);
      }
    } catch (error) {
      console.error('Error fetching leave requests', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeavebalance();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!leaveData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>No leave data available</p>
      </div>
    );
  }

  const leaveDetails = [
    { type: 'Annual Leaves', value: leaveData.Remaining_Annual, icon: '🌴' },
    { type: 'Casual Leaves', value: leaveData.Remaining_Casual, icon: '☕' },
    { type: 'No-Pay Leaves', value: leaveData.Remaining_No_Pay, icon: '💸' },
    { type: 'Maternity Leaves', value: leaveData.Remaining_Maternity, icon: '🤱' },
    { type: 'Total Leave Count', value: leaveData.Total_Leave_Count, icon: '🗓️' },
  ];

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #dbeafe, #ffffff)',
        borderRadius: '20px',
        maxWidth: '700px',
        margin: 'auto',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1d4ed8',
          marginBottom: '30px',
        }}
      >
        Leave Balance Overview
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {leaveDetails.map((leave, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              border: '1px solid #e0e7ff',
              borderRadius: '12px',
              backgroundColor: '#f9fafb',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
              {leave.icon} {leave.type}
            </span>
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: leave.value > 0 ? '#10b981' : '#ef4444',
              }}
            >
              {leave.value}
            </span>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LeaveBalanceVisualizer;

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
    { type: 'Annual Leaves', value: leaveData.Remaining_Annual },
    { type: 'Casual Leaves', value: leaveData.Remaining_Casual },
    { type: 'No-Pay Leaves', value: leaveData.Remaining_No_Pay },
    { type: 'Maternity Leaves', value: leaveData.Remaining_Maternity },
    { type: 'Total Leave Count', value: leaveData.Total_Leave_Count },
  ];

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#eef2f7',
        borderRadius: '15px',
        maxWidth: '600px',
        margin: 'auto',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
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
              border: '1px solid #ddd',
              borderRadius: '10px',
              backgroundColor: '#fff',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease, background-color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.backgroundColor = '#f0f4ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            <span style={{ fontWeight: 'bold', color: '#374151', fontSize: '18px' }}>
              {leave.type}
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: '600',
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
              transform: translateY(-10px);
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

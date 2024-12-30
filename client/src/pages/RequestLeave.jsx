import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const LeaveRequest = () => {
  const [Leave_Type, setLeaveType] = useState('');
  const [Start_Date, setStartDate] = useState('');
  const [End_Date, setEndDate] = useState('');
  const [Reason, setReason] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(Start_Date) > new Date(End_Date)) {
      setAlertMessage('Start date cannot be after the end date.');
      setShowAlert(true);
      return;
    }

    const leaveRequestData = {
      Leave_Type,
      Start_Date,
      End_Date,
      Reason,
      Status: 'Pending',
    };

    try {
      const response = await axios.post('http://localhost/leaveRequest/leave-requests', leaveRequestData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        setAlertMessage('Leave request submitted successfully.');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
      } else {
        setAlertMessage('Failed to submit leave request.');
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setAlertMessage('Error: Failed to submit leave request.');
    } finally {
      setShowAlert(true);
    }
  };

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost/leaveRequest/getLeave-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        setLeaveRequests(response.data.data || []);
      } else {
        setAlertMessage('Failed to fetch leave requests.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      setAlertMessage('Error: Failed to fetch leave requests.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      {showAlert && (
        <div style={{ backgroundColor: '#f8d7da', color: '#842029', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {alertMessage}
          <button onClick={() => setShowAlert(false)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
            X
          </button>
        </div>
      )}

      <h1 style={{ textAlign: 'center' }}>Request Leave</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Leave Type</label>
          <select
            value={Leave_Type}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select Leave Type</option>
            <option value="Annual">Annual</option>
            <option value="Casual">Casual</option>
            <option value="Maternity">Maternity</option>
            <option value="No_Pay">No-Pay</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Start Date</label>
          <input
            type="date"
            value={Start_Date}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>End Date</label>
          <input
            type="date"
            value={End_Date}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Reason</label>
          <textarea
            value={Reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Enter the reason for leave..."
          ></textarea>
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>

      <button
        onClick={fetchLeaveRequests}
        style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        View Leave Requests
      </button>

      {loading && <p>Loading...</p>}

      {leaveRequests.length > 0 && (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Leave Type</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Start Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>End Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Reason</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{request.Leave_Type}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(request.Start_Date).toLocaleDateString()}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(request.End_Date).toLocaleDateString()}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{request.Reason}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{request.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Layout>
  );
};

export default LeaveRequest;

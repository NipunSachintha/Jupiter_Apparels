const db = require('../config/db');

// leave request model
const LeaveRequestModel = {
  // Load dropdown data
  /*get_dropdown_options: (callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_employee_dropdown_options(), "$") AS result';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  // Load available_custom_fields data
  get_available_custom_fields: (callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_available_custom_fields(), "$") AS result';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  }, */

  //Create new leave request
  createNewLeaveRequest: (Data, callback) => {
    const query = 'SELECT JSON_EXTRACT(db_add_leave_request(?,?,?,?,?,?), "$") AS result';
    const queryParams = [
        Data.User_ID,
        Data.Leave_Type,
        Data.Start_Date,
        Data.End_Date,
        Data.Reason,
        Data.Status,
    ];
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  
  /*
  //Delete CustomField
  deleteCustomField: (Data, callback) => {
    const query = 'SELECT JSON_EXTRACT(db_deleteCustomField(?), "$") AS result';
    const queryParams = [
        Data.name,
    ];
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  // Find all users
  findAll: (callback) => {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }, */

  // Find user by ID
  findByUserId: (UserId, callback) => {
    const query = 'SELECT db_get_leave_requests_by_user(?) AS result';
    db.query(query, [UserId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  findBySuperVisorUserID: (SupervisorUserID, callback) => {
    const query = 'SELECT db_get_Pending_Leave_Requests_for_a_supervisor(?) AS result';
    db.query(query, [SupervisorUserID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  editRequestStatus: (Request_ID, Status, callback) => {
    const query = 'SELECT JSON_EXTRACT(db_edit_request_status(?,?), "$") AS result';
    const queryParams = [
        Request_ID,
        Status,
    ];
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },


  ApproveRequestStatus: (Req_ID, callback) => {
    const query = 'CALL set_Pending_Leave_Requests_to_approve(?)';
    
    db.query(query, Req_ID, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  RejectRequestStatus: (Request_ID, callback) => {
    const query = 'CALL set_Pending_Leave_Requests_to_reject(?)';
    
    db.query(query, Request_ID, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  getallleaves: (NIC, Name, callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_employee_leave_details(?,?), "$") AS result';
    const queryParams = [
        NIC,
        Name,
    ];
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  getleavebalance: (User_ID, callback) => {
    const query = 'SELECT db_get_employee_leave_balance_details(?) AS result';
    
    db.query(query, [User_ID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },
  
  

  
  /*
  //Create new Employee
  createEmployee: (employeeData, callback) => {
    const query = 'CALL add_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @result)';
    const queryParams = [
        employeeData.nic,
        employeeData.initials,
        employeeData.firstName,
        employeeData.lastName,
        employeeData.dateOfBirth,
        employeeData.gender,
        employeeData.maritalStatus,
        employeeData.phone,
        employeeData.emailWork,
        employeeData.emailPrivate,
        employeeData.address,
        employeeData.picturePath,
        employeeData.dept,
        employeeData.title,
        employeeData.paygrade,
        employeeData.employmentStat,
        employeeData.PFNumber,
        employeeData.supervisor,
        employeeData.dependent_info,
        employeeData.emergency_contacts_info,
        employeeData.custom_fields,
    ];

    // First, call the stored procedure
    db.query(query, queryParams, (err) => {
      if (err) {
        return callback(err);
      }

      // Now, retrieve the result from the OUT parameter
      const resultQuery = 'SELECT @result AS result';
      db.query(resultQuery, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, JSON.parse(result[0].result));
      });
    });
  },

  //Update employee
  updateEmployee: (employeeId, userData, callback) => { //user data should be column value pairs like First_Name:"Dasun"
    const query = 'UPDATE employee SET ? WHERE Employee_ID = ?';
    db.query(query, [userData, employeeId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete user
  deleteEmployee: (employeeId, callback) => {
    const query = 'DELETE FROM employee WHERE Employee_ID = ?';
    db.query(query, [employeeId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  } 
*/
};

module.exports = LeaveRequestModel;

const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const dependantInfoController=require('../controllers/dependentInfoController');

router.post('/',authMiddleware(["HR Manager","Admin User","Second Manager","Employee"]),dependantInfoController.addDependant);


module.exports = router;


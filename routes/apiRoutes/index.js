const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes.js'));
router.use(require('./roleRoutes'));
router.use(require('./employeeRoutes'));


module.exports = router;
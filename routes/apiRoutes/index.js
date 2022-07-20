const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes.js'));
router.use(require('./roleRoutes'));


module.exports = router;
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const GroupsController = require('../controllers/GroupsController')

// Handle incoming GET requests to /orders
router.get('/', GroupsController.index)
router.post('/', GroupsController.post)

module.exports = router;
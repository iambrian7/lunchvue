const express = require("express");
const router = express.Router();

const LunchesController = require('../controllers/LunchesController');

const checkAuth = require('../middleware/check-auth');



router.get('/', LunchesController.index)
router.get('/:lunchId', LunchesController.show)
router.post('/', LunchesController.post)
router.put('/:lunchId',LunchesController.put)
// router.get('/groups', GroupsController.index)
// router.post('/groups', GroupsController.post)

module.exports = router;


const express = require('express');
const { userController } = require('../controllers');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/', userController.list);
router.get('/:id', userController.retrieve);
router.delete('/:id', admin, userController.delete);

module.exports = router;

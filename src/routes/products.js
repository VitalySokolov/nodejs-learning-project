const express = require('express');
const { productController, reviewController } = require('../controllers');

const router = express.Router();

router.get('/', productController.list);
router.post('/', productController.create);
router.get('/:id', productController.retrieve);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/:id/reviews', reviewController.list);
router.post('/:id/reviews', reviewController.create);

module.exports = router;

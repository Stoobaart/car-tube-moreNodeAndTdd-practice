var express = require('express');
var router = express.Router();
var controller = require('../controllers/cars');

router.route('/')
      .get(controller.index)
      .post(controller.create);

router.route('/new')
      .get(controller.new)

router.route('/:id')
      .get(controller.show)
      .put(controller.update)
      .delete(controller.delete);

router.route('/:id/edit')
      .get(controller.edit);

module.exports = router;

const express = require('express');
const {
  createRestaurant,
  getAllRestaurant,
  getRestaurant,
  getCarousel,
  preSearchData,
} = require('../controllers/restaurantController');
const verifyUser = require('../middleware/verifyUser');

const router = express.Router();

router.route('/carousel').get(getCarousel);
router.route('/pre-search').get(preSearchData);

router.route('/').post(verifyUser, createRestaurant);
router.route('/').get(getAllRestaurant);
router.route('/:id').get(getRestaurant);

module.exports = router;

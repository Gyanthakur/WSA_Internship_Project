const fs = require('fs');
const Restaurant = require('../model/restaurantModel');
const User = require('../model/userModel');

const createRestaurant = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user.isAdmin) {
      return res.status(403).json({
        status: 'fail',
        message: 'Only admin can add restaurants',
      });
    }
    const location = req.query.location || 'patna';
    if (Array.isArray(req.body.data)) {
      req.body.data.forEach(el => (el.location = location));
    } else {
      req.body.data.location = location;
    }
    const restaurant = await Restaurant.create(req.body.data);
    res.status(201).json({
      status: 'success',
      data: restaurant,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const getRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    res.status(200).json({
      status: 'success',
      data: restaurant,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const getAllRestaurant = async (req, res) => {
  const page = req.query.page || 0;
  const location = req.query.location || 'patna';
  try {
    const total = await Restaurant.find({ location }).count();
    const restaurant = await Restaurant.find({ location })
      .skip(page * 15)
      .limit(15);
    res.status(200).json({
      status: 'success',
      total,
      data: restaurant,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

const getCarousel = async (req, res) => {
  try {
    const carousel = fs.readFileSync(
      `${__dirname}/../utils/carousel.json`,
      'utf-8'
    );
    res.status(200).json({
      status: 'success',
      data: {
        carousel: JSON.parse(carousel),
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Fail to load carousel',
    });
  }
};

const preSearchData = async (req, res) => {
  try {
    const carousel = fs.readFileSync(
      `${__dirname}/../utils/pre-search.json`,
      'utf-8'
    );
    res.status(200).json({
      status: 'success',
      data: JSON.parse(carousel),
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Fail to load carousel',
    });
  }
};

module.exports = {
  getRestaurant,
  getAllRestaurant,
  createRestaurant,
  getCarousel,
  preSearchData,
};

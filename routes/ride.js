const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const { protect } = require('../middleware/authMiddleware');
const getRouteInfo = require('../utils/maps');

//Riders only: request a ride
router.post('/request', async (req, res) => {
  const { riderId, pickup, dropoff } = req.body;

  const routeInfo = await getRouteInfo(pickup, dropoff);
  
  const ride = await Ride.create({ 
     rider: riderId, 
     pickup, 
     dropoff,
    ...routeInfo });

  res.json({ride,routeInfo});
});

//Drivers only: accept a ride
router.post('/accept',protect,restriction('driver'), async (req, res) => {
    const { rideId } = req.body;

  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  if (ride.status !== 'requested') {
    return res.status(400).json({ message: 'Ride already taken or completed' });
  }

  ride.driver = req.user._id;
  ride.status = 'accepted';

  await ride.save();
  res.json(ride);
});

router.post('/complete', async (req, res) => {
  const { rideId } = req.body;
  const ride = await Ride.findByIdAndUpdate(rideId, { status: 'completed' }, { new: true });
  res.json(ride);
});

module.exports = router;

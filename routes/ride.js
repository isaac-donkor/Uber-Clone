const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const { protect } = require('../middleware/authMiddleware');
const getRouteInfo = require('../utils/maps');


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

router.post('/accept', async (req, res) => {
  const { rideId, driverId } = req.body;
  const ride = await Ride.findByIdAndUpdate(rideId, { driver: driverId, status: 'accepted' }, { new: true });
  res.json(ride);
});

router.post('/complete', async (req, res) => {
  const { rideId } = req.body;
  const ride = await Ride.findByIdAndUpdate(rideId, { status: 'completed' }, { new: true });
  res.json(ride);
});

module.exports = router;

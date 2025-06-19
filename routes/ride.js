const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const { protect,restrictTo } = require('../middleware/authMiddleware');
const getRouteInfo = require('../utils/maps');

//Riders only: request a ride
router.post('/request',protect,restrictTo('rider'), async (req, res) => {
  const { pickup, dropoff } = req.body;

  const routeInfo = await getRouteInfo(pickup, dropoff);
  
  const ride = await Ride.create({ 
     rider: riderId, 
     pickup, 
     dropoff,
    ...routeInfo });

  res.json({ride,routeInfo});
});

//Drivers only: accept a ride
router.post('/accept',protect,restrictTo('driver'), async (req, res) => {
    const { rideId } = req.body;

    const ride=await Ride.findById(rideId);

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


//Any authenticated user can complete a ride (optional: restrict to driver later)
router.post('/complete', async (req, res) => {
  const { rideId } = req.body;

   const ride = await Ride.findById(rideId);

  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  ride.status = 'completed';
  await ride.save();
  
  res.json(ride);
});

module.exports = router;

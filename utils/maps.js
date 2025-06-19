const axios = require('axios');

const getRouteInfo = async (pickup, dropoff) => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.lat},${pickup.lng}&destination=${dropoff.lat},${dropoff.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const res = await axios.get(url);

  if (res.data.status !== 'OK') {
    throw new Error('Google Maps API error');
  }

  const route = res.data.routes[0].legs[0];

  return {
    distance: route.distance.text,
    duration: route.duration.text,
    start_address: route.start_address,
    end_address: route.end_address
  };
};

module.exports = getRouteInfo;

const mongoose = require('mongoose');
const { City, validate } = require('./city');

// mongoose.connect('mongodb://localhost/learningProject')
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch((err) => console.error('Could not connect to MongoDB...', err));

const addCity = async (data) => {
  const city = new City({
    name: data.name,
    country: data.country,
    capital: data.capital,
    location: data.location,
  });

  const result = await city.save();
  console.log(result);
};

const cities = [
  { name: 'Brest', country: 'Belarus', capital: false, location: { lat: 52.097621, long: 23.734050 } },
  { name: 'Minsk', country: 'Belarus', capital: true, location: { lat: 53.093321, long: 24.734050 } },
  { name: 'Prague', country: 'Czechia', capital: true, location: { lat: 54.091621, long: 25.731050 } },
  { name: 'Pilsen', country: 'Czechia', capital: false, location: { lat: 55.092621, long: 26.732050 } },
  { name: 'Berlin', country: 'Germany', capital: true, location: { lat: 56.093621, long: 27.733050 } },
  { name: 'Hamburg', country: 'Germany', capital: false, location: { lat: 57.193621, long: 28.933050 } },
];

// {
//   "name": "Andorra la Vella",
//   "country": "Andorra",
//   "capital": true,
//   "location": {
//   "lat": 42.307621,
//     "long": 1.314050
// }
// }

const populateCities = async () => {
  for (const city of cities) {
    await addCity(city);
  }
};

// populateCities()
//   .then(() => console.log('End'));

// const validation = validate({name: 'Brest 123', country: 'Belarus', capital: false, location: { lat: 52.097621, long: 23.734050 }});
// console.log(JSON.stringify(validation, undefined, 2));

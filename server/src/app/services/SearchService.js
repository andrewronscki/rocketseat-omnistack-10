import Dev from '../models/Dev';

const listDevsForTechAndLocation = async (latitude, longitude, techs) => {
  const devs = Dev.find({
    techs: {
      $in: techs,
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 10000,
      },
    },
  });

  return devs;
};

export default listDevsForTechAndLocation;

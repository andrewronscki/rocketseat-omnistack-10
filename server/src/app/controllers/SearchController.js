import parseStringAsArray from '../utils/parseStringAsArray';
import listDevsForTechAndLocation from '../services/SearchService';

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await listDevsForTechAndLocation(
      latitude,
      longitude,
      techsArray
    );

    return res.json(devs);
  }
}

export default new SearchController();

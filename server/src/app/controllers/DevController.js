import {
  listDevs,
  validateUserName,
  getInformationsGitHub,
  createDev,
} from '../services/DevService';
import parseStringAsArray from '../utils/parseStringAsArray';

// index: lista de coisas, show: mostrar um único registro, store: criar, update: alterar, destroy: deletar

class DevController {
  async index(req, res) {
    const devs = await listDevs();

    return res.json(devs);
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const techsArray = parseStringAsArray(techs);

    let dev = await validateUserName(github_username);

    if (!dev) {
      const response = await getInformationsGitHub(github_username);

      // eslint-disable-next-line no-undef
      const { name = login, avatar_url, bio } = response.data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await createDev(
        github_username,
        name,
        avatar_url,
        bio,
        techsArray,
        location
      );
    }

    return res.json(dev);
  }
}

export default new DevController();

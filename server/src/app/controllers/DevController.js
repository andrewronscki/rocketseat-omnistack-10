import {
  listDevs,
  validateUserName,
  getInformationsGitHub,
  createDev,
  updateDev,
  deleteDev,
} from '../services/DevService';
import parseStringAsArray from '../utils/parseStringAsArray';

// index: lista de coisas
// show: mostrar um único registro
// store: criar
// update: alterar
// destroy: deletar

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

  async update(req, res) {
    const { techs, latitude, longitude } = req.body;
    const { github_username } = req.params;

    const techsArray = parseStringAsArray(techs);

    const dev = await validateUserName(github_username);

    if (!dev) {
      return res.status(404).json({
        status: 404,
        error: 'Not Found',
        message: `O username ${github_username} não existe na base! É necessário criá-lo para poder alterá-lo`,
      });
    }

    const { _id } = dev;

    const response = await getInformationsGitHub(github_username);

    // eslint-disable-next-line no-undef
    const { name = login, avatar_url, bio } = response.data;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    await updateDev(_id, name, avatar_url, bio, techsArray, location);

    return res.json({
      status: 200,
      message: `Usuário ${github_username} atualizado com sucesso!`,
    });
  }

  async destroy(req, res) {
    const { github_username } = req.params;

    const dev = await validateUserName(github_username);

    if (!dev) {
      return res.status(404).json({
        status: 404,
        error: 'Not Found',
        message: `O username ${github_username} não existe na base!`,
      });
    }

    const { _id } = dev;

    await deleteDev(_id);

    return res.json({
      status: 200,
      message: `Usuário ${github_username} foi deletado com sucesso!`,
    });
  }
}

export default new DevController();

import github from '../../config/github';
import Dev from '../models/Dev';

export const listDevs = async () => {
  const devs = await Dev.find();

  return devs;
};

export const validateUserName = async github_username => {
  const dev = Dev.findOne({ github_username });

  return dev;
};

export const getInformationsGitHub = async github_username => {
  const response = await github.get(`/${github_username}`);

  return response;
};

export const createDev = async (
  github_username,
  name,
  avatar_url,
  bio,
  techs,
  location
) => {
  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs,
    location,
  });

  return dev;
};

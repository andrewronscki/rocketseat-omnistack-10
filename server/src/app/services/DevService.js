import github from '../../config/github';
import Dev from '../models/Dev';

export const listDevs = async () => {
  const devs = await Dev.find({
    active: true,
  });

  return devs;
};

export const validateUserName = async github_username => {
  const dev = await Dev.findOne({ github_username });

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
    active: true,
  });

  return dev;
};

export const updateDev = async (id, name, avatar_url, bio, techs, location) => {
  const dev = await Dev.findByIdAndUpdate(id, {
    name,
    avatar_url,
    bio,
    techs,
    location,
    active: true,
  });

  return dev;
};

export const deleteDev = async id => {
  const dev = await Dev.findByIdAndUpdate(id, {
    active: false,
  });

  return dev;
};

import { Schema, model } from 'mongoose';
import PointSchema from './utils/PointSchema';

const DevSchema = new Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  active: Boolean,
});

export default model('Dev', DevSchema);

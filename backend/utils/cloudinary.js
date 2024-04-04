import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"

cloudinary.config({
  cloud_name: 'dncttioia',
  api_key: '454192933648294',
  api_secret: 'VEQH9jJwwIzpm8Y9GwTvyda0zHU'
});
export default cloudinary;
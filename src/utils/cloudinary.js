import {v2 as cloudinary} from 'cloudinary';

import * as dotenv from "dotenv";
dotenv.config({})  
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:    process.env.API_KEY, 
  api_secret: process.env.API_SECRET_KEY,
  secure:true
});
// cloudinary.config({ 
//   cloud_name: "dyfggntwm",
//   api_key:    "379273483661365",
//   api_secret: "leukXbIrgmA5ZkiqZ09auYaBP5Q"
// });

export default cloudinary
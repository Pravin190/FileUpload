const cloudinary = require("cloudinary").v2;

require("dotenv").config();

// mujhe agar cloudinary ka use krna hai to mujhe 3 things ki need pdti hai => cloud_name,api_key,Api+secret
// cloudinary.config isse hum apne server application ko connect kr rahe hai apni cloudinary ke sath

exports.cloudinaryConnect = () => {
    try{
            cloudinary.config({
                cloud_name:process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET,
            })
    }
    catch(error) {
        console.log(error);
    }
}
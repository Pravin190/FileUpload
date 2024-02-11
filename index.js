
//app(server) created
const express = require("express");
const app = express();

//dotenv => which is used to we can get PORT number from .env file and put in the process.env object.
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//here we used .use middleware which is used to we can fetch data as json format
app.use(express.json());

 // here we used FileUpload, which is used to we can upload the file on server.
const FileUpload = require("express-fileupload");      
app.use(FileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//Establish database connection
const db = require("./config/database");
db.connect();

//here we used cloudinary, which is used for upload the file on server then upload the file on media server after that file deleted automatically from the sever.
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//here we mounting the route 
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})

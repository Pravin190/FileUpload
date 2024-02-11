const mongoose = require("mongoose");

const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});


require("dotenv").config();

// always make sure calling pre() and post () before compiling model where you write your schema..
// doc means ki jo bhi entry meri database mai create/insert hui hai to usi entry ko hum doc kahte hai
// save isliye kui jayse hi meri ek entry means mera doc DB mai save hone ke bad mai mail send krna chahta hu...

fileSchema.post("save", async function (doc) {

    try{

        console.log("doc : " , doc);

        // transporter
        // TODO => good practice => add this transpoter into config folder =>create mail.js file and that file import here...
        // copy from nodemailer documention => Nodemailer.com => Nodemailer..
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS ,
            },
          });


        // send mail 
        //once entry done in DB after we can send the mail

        const info = await transporter.sendMail({
            from: "From Pravin",                                                                                // sender address
            to : doc.email,                                                                                     // list of receivers
            subject: "New File Uploaded to Cloudinary",                                                         // Subject line
            html: `<h2>File Uploaded successfully</h2> <br> view now - <a href="${doc.fileUrl}">CLick Here</a>`, // html body
          });


          console.log("Info : ", info);



    }catch(error) {

        console.log("error while sending mail...",error);

    }

    
})


const File = mongoose.model("File",fileSchema);

module.exports = File;
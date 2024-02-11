const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req,res) => {


    try{

        //fetch filefrom request and files is a heirarchy that is store in postman => files & .file is a filename

        const file = req.files.file;

        console.log("file mil gayi rr baba...",file);

        //create path where file need to be stored on server 
        // "/files/" controller ke niche ye folder create kiya
        // Date.now()  isse mera jo current milisecond vala jo time hai usse file ko nam de diya..
        //.${file.name.split('.')[1]} file ka extention add kiya aur filename string ko split kiya dot se and [1] iski index of extension...

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        console.log("path => ", path);

        //add path to the move function

        file.mv(path,(err) => {

            console.log(err);

        })

        //create a successful response
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });

    }
    catch(error) {

        console.log("error while fetching file", error);


    }
}





function isfilesupportedType(supportedType,fileType){

    return supportedType.includes(fileType);

}

async function uploadfilecloudinary(file,folder,quality){

    const options = {folder};

    console.log(quality);

    if(quality){

        options.quality = quality;

    }

    

     //options.resource_type = "auto" isse apne aap detect krega kis type ki file hai..
     options.resource_type = "auto";


    // ise cloudinary docs se copy kiya..
    //tempFilePath means apke server ke upar ek temp folder bnta hai, 
    //iska mtlb humare local machine se file/data uthkr humare server pr kisi temp folder mai upload ho jata hai
    //fir apke server ke temp folder mai ka data uthkr apke media server upload ho jata hai
    //aur fir apke server ke temp folder se wo data delete ho jata hai
    // upload(file.tempFilePath, means yaha pr upload function bolta hai ki mujhe 1st input/1st argument tempFilePath hi dena
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}


//imageUpload handler


exports.imageUpload = async (req,res) => {


    try{

        // fetch data
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        // fetch file
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        //set supported file format type

        const supportedType = ["png", "jpg", "jpeg"];
        console.log(supportedType);
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isfilesupportedType(supportedType,fileType)){

            return res.status(400).json({

                success : false,
                message : "filetype does not match",

            });

        }

        //upload to cloudinary

        const response = await uploadfilecloudinary(imageFile,"PravinDada");
        console.log(response);

        // upload to DataBase

        const FileData = await File.create({

            name,
            tags,
            email,
            fileUrl : response.secure_url,
        });

        res.status(300).json({
            success: true,
            message: "File uploaded successfully",
            file: FileData,
        });


    }catch(error) {

        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });

    }


}

// videoUpload handler



exports.videoUpload = async (req,res) => {


    try{

        // fetch data
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        //fetch file
        const videoUpload = req.files.videoUpload;
        console.log(videoUpload);

        //set supported file format type

        const supportedType = ["mp4","mov"];
        console.log(supportedType);
        const fileType = videoUpload.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isfilesupportedType(supportedType,fileType)){

            return res.status(400).json({

                success : false,
                message : "filetype does not match",

            });

        }

        //upload to cloudinary

        const response = await uploadfilecloudinary(videoUpload,"PravinDada");
        console.log(response);

        // upload to DataBase

        const FileData = await File.create({

            name,
            tags,
            email,
            fileUrl : response.secure_url,
        });

        res.status(300).json({
            success: true,
            message: "video uploaded successfully",
            file: FileData,
        });


    }catch(error) {

        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });

    }


}


exports.imageReducer = async (req,res) => {


    try{

        // fetch data
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        //fetch file
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        //set supported file format type

        const supportedType = ["png", "jpg", "jpeg"];
        console.log(supportedType);
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isfilesupportedType(supportedType,fileType)){

            return res.status(400).json({

                success : false,
                message : "filetype does not match",

            });

        }

        //upload to cloudinary
        // 50 means this is quality, which is used to we can compress image size..
        const response = await uploadfilecloudinary(imageFile,"PravinDada",90);
        console.log(response);

        // upload to DataBase

        const FileData = await File.create({

            name,
            tags,
            email,
            fileUrl : response.secure_url,
        });

        res.status(300).json({
            success: true,
            message: "compress image uploaded successfully",
            file: FileData,
        });


    }catch(error) {

        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });

    }


}


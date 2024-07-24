const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Update a file in cloudinary - Working (profile picture)
exports.updateFileCloudinary = async (file, publicId, quality) =>
{
    try{
        const options = {
            overwrite: true,
            public_id: publicId,
            folder: process.env.FILE_FOLDER
        };
        
        if(!quality)
        {
            options.quality = quality;
        }
        console.log(options);
        return await cloudinary.uploader.upload(file.tempFilePath, options);

    }
    catch(Error)
    {
        console.log(Error);
        console.log("Error while updating a file (UpdateCloudinary.js)");
    }
}
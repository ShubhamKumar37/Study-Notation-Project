const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Update a file in cloudinary - Working (profile picture)
exports.updateFileCloudinary = async (file, publicId, resourceType, quality) =>
{
    try{
        const options = {
            overwrite: true,
            public_id: publicId,
        };
        
        if(quality)
        {
            options.quality = quality;
        }
        if(resourceType)
        {
            options.resource_type = resourceType;
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
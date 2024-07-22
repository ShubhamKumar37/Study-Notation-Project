const cloudinary = require("../config/cloudinary");

// Update a file in cloudinary
exports.updateFileCloudinary = async (file, publicId, quality) =>
{
    try{
        const options = {
            overwrite: true,
            public_id: publicId,
        };
        
        if(!quality)
        {
            options.quality = quality;
        }

        return await cloudinary.uploader.upload(file, {options});

    }
    catch(Error)
    {
        console.log(Error);
        console.log("Error while deleting a file (UpdateCloudinary.js)");
    }
}
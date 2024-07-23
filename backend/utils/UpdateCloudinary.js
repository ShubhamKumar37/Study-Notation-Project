const cloudinary = require("cloudinary").v2;

// Update a file in cloudinary - Working (profile picture)
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
        console.log(options);
        return await cloudinary.uploader.upload(file.tempFilePath, options);

    }
    catch(Error)
    {
        console.log(Error);
        console.log("Error while updating a file (UpdateCloudinary.js)");
    }
}
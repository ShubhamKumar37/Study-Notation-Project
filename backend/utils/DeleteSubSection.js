const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { deleteFileCloudinary } = require("../utils/DeleteCloudinary");

exports.deleteSubSections = async (sectionId) => {
    // console.log(11);
    const subSectionArray = await Section.findById(sectionId);
    console.log("subSection array ", subSectionArray);


    // console.log(22);
    // Deleting all the content present in the entry
    if (subSectionArray) {
        for (let subSectionId of subSectionArray.subSection) {
            console.log(33);
            console.log("subSection Id", subSectionId);
            
            const eachPublicId = await SubSection.findById(subSectionId);
            
            console.log("video Url", eachPublicId.videoUrl)
            console.log("each public id", eachPublicId.publicId);

            if (!eachPublicId) {
                continue;
            }
            // console.log(44);

            await deleteFileCloudinary(eachPublicId.publicId, "video");
            // const result = await cloudinary.uploader.destroy(eachPublicId.publicId);
            // cloudinary.uploader
            //     .destroy(eachPublicId.publicId, {invalidate: true})
            //     .then(result => console.log(result)).catch((Error) => console.log(Error));
            // }
            // await cloudinary.uploader.destroy(eachPublicId.publicId).then(result => console.log(result));
        }
    }
    else {
        console.log("SubSection does not exist");
    }
}
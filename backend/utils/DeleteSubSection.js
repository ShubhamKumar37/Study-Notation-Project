const SubSection = require("../models/SubSection");
const Section = require("../models/Section");

exports.deleteSubSections = async (sectionId) => {
    const subSectionArray = await Section.findById(sectionId);

    // Deleting all the content present in the entry
    if (subSectionArray) {
        for (let subSectionId in subSectionArray.subSection) {

            const eachPublicId = await SubSection.findById(subSectionId);
            if (!eachPublicId) {
                continue;
            }

            await deleteFileCloudinary(eachPublicId.publicId);
        }
    }
}
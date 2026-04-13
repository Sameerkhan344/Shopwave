import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: 'dlidamqpp',
    api_key: '485199634525363',
    api_secret: "aOp9yaoKdxPfAQMiEfVro_f3HYY" // Click 'View API Keys' above to copy your API secret
});

const uploadImageOnCloudinary = async (filePath, folderName) => {
    try {
        //code for uploading image from server
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName
        })

        //code for delete image from server
        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.log("Failed to delete image from server", error)
        }
        // console.log(result)
        return {
            secure_url: result.secure_url,
            public_id: result.public_id
        }
    } catch (error) {
        throw new Error(error)
    }
}

const deleteImageOnCloudinary = async (public_id) => {
    try {
        //code for delete image from cloudinary
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
        // console.log(result)

    } catch (error) {
        throw new Error(error)
    }
}
export { uploadImageOnCloudinary, deleteImageOnCloudinary }
import React, { useState } from 'react'
import { FaFileUpload } from "react-icons/fa";

const ImagePreview = ({ register, getValues, errors, setValue, name, label }) => {

    const [fileName, setFileName] = useState("Select");
    const [file, setFile] = useState(null);


    function changeHandler(event) {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFile(file);
        }
        else
        {
            setFileName("Select");
            setFile(null);
        }
    }

    console.log("This is the file of image", file);

    return (
        <div className='flex flex-col gap-2'>

            <label className='relative text-center text-richblack-5 text-sm  h-fit text-[10px] px-6 py-3 rounded-md  bg-richblack-800 button-shadow-black transition-all duration-200 hover:scale-95 cursor-pointer'>
                {fileName.length > 6 ? fileName.substring(0, 10) + "..." : fileName}

                {/* Invisible input that still captures clicks */}
                <input
                    type="file"
                    name='image'
                    className='absolute inset-0 w-full h-full opacity-0'
                    onChange={changeHandler}
                    style={{ cursor: 'pointer' }} // Ensure pointer cursor over invisible input
                    hidden
                // required
                />
            </label>

            <button type='button' className='w-full text-center text-sm px-6 py-1 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95'>
                <div className='flex items-center justify-center gap-2' >
                    <p>Upload</p>
                    <FaFileUpload />
                </div>
            </button>

            <div className='w-fit p-2 min-h-[5rem] flex items-center h-fit bg-richblack-600 border-2 rounded-lg border-richblack-400 overflow-hidden text-center'>
                {/* Preview of image */}

                {
                    file 
                    ? (<div className=''>
                        <img
                            src={URL.createObjectURL(file)}
                            alt={fileName}
                            width={200}
                            height={300}
                            className=' object-cover '
                        />
                    </div>)
                    : (<div>
                        <p className=''>No Image selected yet</p>
                    </div>)
                }

            </div>

        </div>
    )
}

export default ImagePreview
import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";

const ChipInput = ({ register, errors, setValue, labels, name }) => {

    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]); 

    function addToListHandler() {
        if (tag) {
            setTagList([...tagList, tag]);
            setTag("");
        }
    }

    function removeListHandler(index) {
        let updatedList = [...tagList];
        updatedList.splice(index, 1);
        setTagList([...updatedList]);
    }

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);

    useEffect(() => {
        setValue(name, tagList);
    }, [tagList]);


    return (
        <div>
            <label className='flex flex-col'>
                <p>Enter tags</p>
                <input
                    type="text"
                    onChange={(event) => setTag(event.target.value)}
                    className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                    value={tag}
                />

                <button type='button' className='flex text-yellow-50 font-bold p-1' onClick={() => addToListHandler()}>Add</button>
            </label>
            {
                errors[name] && tagList.length === 0 && <span className='text-[#f01c1c]'>{labels} is required **</span>
            }

            <div className='flex flex-row gap-2 flex-wrap'>
                {
                    tagList && tagList.map((item, index) => {
                        return <div key={index} className='flex flex-row'>
                            <span className='bg-richblack-700 rounded-lg flex gap-1 p-1'>{item}
                                <span onClick={() => removeListHandler(index)} className='cursor-pointer flex items-center'>
                                    <RxCross1 />
                                </span>
                            </span>

                        </div>
                    })
                }

            </div>

        </div>
    )
}

export default ChipInput
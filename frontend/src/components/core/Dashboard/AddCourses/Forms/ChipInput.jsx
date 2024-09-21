import React, { useEffect, useState } from 'react'

const ChipInput = ({register, errors, setValue, labels, name}) => {

    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);

    function addToListHandler()
    {
        if(tag)
        {
            setTagList([...tagList, tag]);  
            setTag("");
        }
    }

    function removeListHandler(index)
    {
        let updatedList = [...tagList];
        updatedList.splice(index, 1);
        setTagList([...updatedList]);
    }

    useEffect(() =>
    {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);

    useEffect(() =>
    {
        setValue(name, tagList);
    }, [tagList]);


  return (
    <div>
        <label>
            <p>Enter tags</p>
            <input
                type="text"
                onChange={(event) => setTag(event.target.value)}
                 className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                 value={tag}
            />

            <button type='button' onClick={() => addToListHandler()}>Add</button>
        </label>
        {
            errors[name] && <span>{labels} is required</span>
        }

        {
            tagList && tagList.map((item, index) =>
            {
                return <div key={index}>
                    <span>{item}</span>
                    <sup onClick={() => removeListHandler(index)} className='cursor-pointer'>Remove</sup>
                </div>
            })
        }

    </div>
  )
}

export default ChipInput
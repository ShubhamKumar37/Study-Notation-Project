import React, { useEffect, useState } from 'react'
import "../../../../../pages/allPageCSS.css"
import { RxCross1 } from "react-icons/rx";

const RequirementField = ({ name, setValue, getValues, register, errors, label }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState("");

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

    function addRequirement() {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");

        }
    }

    function removeRequirement(index) {
        let updatedList = [...requirementList];
        updatedList.splice(index, 1);
        setRequirementList([...updatedList]);
    }

    return (
        <div>
            <label>
                <p>{label}</p>

                <input
                    name={name}
                    value={requirement}
                    onChange={(event) => setRequirement(event.target.value)}
                    className='p-2 bg-richblack-800 rounded-lg border-none focus:outline-none input-field-shadow'
                />

                <button
                    type='button'
                    className='flex text-yellow-50 font-bold p-1'
                    onClick={() => addRequirement()}

                >
                    <p>Add</p>
                </button>

                <div className='flex'>
                    {
                        requirementList.length > 0 &&

                        <ul className='flex flex-row gap-1 flex-wrap '>
                            {
                                requirementList.map((item, index) => {
                                    return (<li key={index} className='text-sm flex gap-1 bg-richblack-700 p-1 rounded-lg '>
                                        <span>{item}
                                        </span>
                                        <span className='flex items-center'>
                                            <button type='button' className='cursor-pointer flex items-center' onClick={() => removeRequirement(index)}> <RxCross1 /></button>
                                        </span>
                                    </li>)
                                })
                            }
                        </ul>
                    }
                </div>
            </label>

            {errors[name] && requirementList.length === 0 && <span className='text-[#ef0000]'>Add some Requirement**</span>}
        </div>
    )
}

export default RequirementField

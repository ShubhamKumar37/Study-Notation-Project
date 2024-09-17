import React, { useEffect, useState } from 'react'
import "../../../../../pages/allPageCSS.css"

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
                    onClick={() => addRequirement()}

                >
                    <p>Add</p>
                </button>

                {
                    requirementList.length > 0 &&

                    <ul className='flex flex-col'>
                        {
                            requirementList.map((item, index) => {
                                return (<li key={index} className='text-sm flex '>
                                    <p>{item}{"  "}
                                        <sup>
                                            <button type='button' onClick={() => removeRequirement(index)}> remove</button>
                                        </sup>
                                    </p>
                                </li>)
                            })
                        }
                    </ul>
                }
            </label>

            {errors[name] && <span>Add some Requirement**</span>}
        </div>
    )
}

export default RequirementField

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./allPageCSS.css";
import HighLightText from "../components/core/homepage/HighLightText";


export default function Home() {

    return (
        <div>
            {/* Section1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
                <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-300 transition-all duration-150 hover:scale-95 w-fit button-shadow-instructor" >
                    <Link to="/signup">
                        <div className="flex flex-row items-center gap-1 rounded-full px-7 py-[5px] group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </Link>
                </div>

                <div>
                    <h1>
                        Empower Your Future with <HighLightText text="Coding Skills" />
                    </h1>
                </div>
            </div>

            {/* Section2 */}

            {/* Section3 */}

            {/* Footer */}
        </div>
    );
}
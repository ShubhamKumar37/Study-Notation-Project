import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./allPageCSS.css";
import HighLightText from "../components/core/homepage/HighLightText";
import ActionButton from "../components/core/homepage/Button";
import BannerVideo from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/homepage/CodeBlocks";


export default function Home() {

    return (
        <div>
            {/* Section1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
                <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-300 transition-all duration-150 hover:scale-95 w-fit button-shadow-instructor" >
                    <Link to="/signup">
                        <div className="flex flex-row items-center gap-1 rounded-full px-7 py-[5px] group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </Link>
                </div>

                <div className="text-center text-4xl font-semibold mt-6">
                    <h1>Empower Your Future with
                        <HighLightText text="Coding Skills" />
                    </h1>
                </div>

                <div className="w-[90%] text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a
                    wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-row gap-5 mt-8">
                    <ActionButton active={true} linkTo={"/signup"}>Learn more</ActionButton>
                    <ActionButton active={false} linkTo={"/login"}>Book a demo</ActionButton>
                </div>

                <div className="shadow-blue-200 mx-3 my-12">
                    <video muted autoPlay loop>
                        <source src={BannerVideo} type="video/mp4" />
                    </video>
                </div>

                {/* Code Section 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock Your <HighLightText text={"Coding Potential"} />
                                with Our Online Course
                            </div>
                        }
                        subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        btn1={
                            {
                                btnText: "Try it yourself",
                                linkTo: "/signup",
                                active: true
                            }
                        }
                        btn2={
                            {
                                btnText: "Learn more",
                                linkTo: "/login",
                                active: false
                            }
                        }

                        codeBlock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n</div>\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                        codeColor={"text-yellow-25"}
                    ></CodeBlocks>
                </div>
            </div>

            {/* Section2 */}

            {/* Section3 */}

            {/* Footer */}
        </div>
    );
}
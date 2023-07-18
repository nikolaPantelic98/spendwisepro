import React, { useRef, useState } from 'react';
import Sidebar from "./Sidebar";

const Menu = ({ sidebarOpen, toggleSidebar }) => {
    const containerRef = useRef(null);
    const sidebarRef = useRef(null);
    const [animationComplete, setAnimationComplete] = useState(false);

    const handleToggleSidebar = () => {
        if (!sidebarOpen) {
            setAnimationComplete(false);
        }
        toggleSidebar(!sidebarOpen);
    };

    React.useEffect(() => {
        if (sidebarOpen) {
            document.body.classList.add("sidebar-open");
            document.body.style.overflow = "hidden";
        } else {
            document.body.classList.remove("sidebar-open");
            document.body.style.overflow = "auto";
        }
    }, [sidebarOpen]);

    React.useEffect(() => {
        if (sidebarOpen && containerRef.current && !animationComplete) {
            const sidebarElement = sidebarRef.current;
            sidebarElement.style.transform = "translateX(-100%)";
            sidebarElement.style.transition = "transform 0s";
            requestAnimationFrame(() => {
                sidebarElement.style.transform = "translateX(0)";
                sidebarElement.style.transition = "transform 0.5s";
                setAnimationComplete(true);
            });
        }
    }, [sidebarOpen, animationComplete]);

    return (
        <>
            <div className="fixed bottom-0 left-0 w-full bg-white z-50 border-t-1 border-green-900">
                <div className="h-[70px] flex items-center justify-between">
                    <div className="flex items-center ml-4">
                        <div
                            ref={containerRef}
                            className="cursor-pointer bg-white rounded-full p-3"
                            onClick={handleToggleSidebar}
                        >
                            <div className={`h-1 w-6 bg-green-700 rounded mb-1 ${sidebarOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`h-1 w-6 bg-green-700 rounded mb-1 ${sidebarOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`h-1 w-6 bg-green-700 rounded ${sidebarOpen ? 'opacity-0' : ''}`}></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                        <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-700 focus:outline-none">
                            <div className="text-white text-4xl font-normal">
                                <span className="flex items-center justify-center h-full mb-1">+</span>
                            </div>
                        </a>
                    </div>
                    <div className="flex items-center mr-4">
                        <a href="#">
                            <img src="https://i.ibb.co/RCG4xZ2/Spend-Wise-Pro-circle.png" alt="Logo" className="h-15 w-14" />
                        </a>
                    </div>
                </div>
                {sidebarOpen && (
                    <>
                        <div className="fixed top-0 left-0 right-0 bottom-0 z-0 bg-gray-700 opacity-50" onClick={() => toggleSidebar(false)}></div>
                        <div ref={sidebarRef} className="fixed top-0 left-0 bottom-0 z-10 w-full max-w-[20rem] p-4 bg-white shadow-xl shadow-blue-gray-900/5">
                            <Sidebar />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Menu;
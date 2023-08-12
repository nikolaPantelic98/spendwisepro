import React, { useRef, useState } from 'react';
import Sidebar from "./Sidebar";
import {Link} from "react-router-dom";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import AddRecordTabs from "../record/AddRecordTabs";
import {Drawer} from "@material-tailwind/react";

function scrollToTop() {
    window.scrollTo(0, 0);
}

const Menu = ({ sidebarOpen, toggleSidebar }) => {
    const containerRef = useRef(null);
    const sidebarRef = useRef(null);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [open, setOpen] = React.useState(false);

    const openDrawer = () => {
        setOpen(true);
    };
    const closeDrawer = () => {
        setOpen(false);
    };

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
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

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
        <div className="fixed bottom-0 left-0 w-full bg-white z-50 border-t-1 border-green-900">
            <div className="h-[60px] flex items-center justify-between">

                <div className="flex items-center ml-4">
                    <div
                        ref={containerRef}
                        className="cursor-pointer p-3"
                        onClick={handleToggleSidebar}
                    >
                        <div className={`h-1 w-6 bg-green-700 rounded mb-1 ${sidebarOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`h-1 w-6 bg-green-700 rounded mb-1 ${sidebarOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`h-1 w-6 bg-green-700 rounded ${sidebarOpen ? 'opacity-0' : ''}`}></div>
                    </div>
                </div>

                <div className="flex items-center justify-center flex-grow">
                    <Link onClick={openDrawer}>
                        <PlusCircleIcon color="green" className="w-12 h-12" strokeWidth={2} />
                    </Link>
                </div>

                <div className="flex items-center mr-4">
                    <Link to="/home" onClick={scrollToTop}>
                        <img src="https://i.ibb.co/RCG4xZ2/Spend-Wise-Pro-circle.png" alt="Logo" className="h-15 w-14" />
                    </Link>
                </div>
            </div>
            {sidebarOpen && (
                <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => toggleSidebar(false)}></div>
                    <div ref={sidebarRef} className="fixed top-0 left-0 bottom-0 z-10 w-[78%] md:max-w-[20rem] p-4 bg-white shadow-xl shadow-blue-gray-900/5 border-r-1 border-green-800">
                        <Sidebar />
                    </div>
                </>
            )}
            {open && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 z-0 bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={() => {
                        closeDrawer();
                    }}
                ></div>
            )}
            <Drawer
                placement="bottom"
                open={open}
                onClose={() => closeDrawer()}
                size={window.innerHeight * 0.9}
                transition={{ type: "tween", duration: 0.6 }}
                className="pt-2 bg-green-50 border-t-1 border-green-900 rounded-t-[10px]"
            >
                <div className=" h-full overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <AddRecordTabs closeDrawer={closeDrawer} />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default Menu;
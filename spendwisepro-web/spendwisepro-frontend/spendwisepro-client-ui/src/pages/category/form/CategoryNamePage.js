import React, {useEffect, useRef, useState} from 'react';
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Button, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryName} from "../../../redux/categorySlice";

function CategoryNamePage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const name = useSelector((state) => state.category.name);
    const [textAreaValueName, setTextAreaValueName] = useState(name);
    const textAreaRefName = useRef(null);
    const from = location.state?.from || '/add_category';

    useEffect(() => {
        const textAreaName = document.getElementById('textAreaName');
        textAreaName.style.height = 'auto';
        textAreaName.style.height = textAreaName.scrollHeight + 'px';
    }, [textAreaValueName]);

    useEffect(() => {
        const textAreaName = textAreaRefName.current;
        textAreaName.focus();
        textAreaName.selectionStart = textAreaName.selectionEnd = textAreaName.value.length;
    }, [textAreaValueName]);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await dispatch(setCategoryName(textAreaValueName));
            navigate(from);
        }
    };

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title="Name" resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-8 text-center">
                                <Typography variant="h6">
                                    Add Name
                                </Typography>
                                <div className="h-4"></div>
                                <textarea id="textAreaName" ref={textAreaRefName}
                                          className="resize-none bg-green-50 focus:outline-none mx-auto text-center"
                                          value={textAreaValueName}
                                          onChange={(e) => setTextAreaValueName(e.target.value)}
                                          onKeyDown={handleKeyDown} />
                            </div>
                        </div>

                        <div className="mt-8 mx-6">
                            <div className="flex justify-center items-center">
                                <Button className="mt-2 w-full" variant="gradient" color="green"
                                        onClick={async () => {
                                            await dispatch(setCategoryName(textAreaValueName));
                                            navigate(from, { state: { name: textAreaValueName } });
                                        }}>
                                    <span>Confirm</span>
                                </Button>
                            </div>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default CategoryNamePage;
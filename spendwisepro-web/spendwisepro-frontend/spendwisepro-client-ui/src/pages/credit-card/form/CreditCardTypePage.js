import React, {useEffect, useRef, useState} from 'react';
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Button, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setType} from "../../../redux/creditCardSlice";

function CreditCardTypePage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [textAreaValueType, setTextAreaValueType] = useState("");
    const textAreaRefType = useRef(null);
    const from = location.state?.from || '/add_credit_card';

    useEffect(() => {
        const textAreaType = document.getElementById('textAreaType');
        textAreaType.style.height = 'auto';
        textAreaType.style.height = textAreaType.scrollHeight + 'px';
    }, [textAreaValueType]);

    useEffect(() => {
        const textAreaType = textAreaRefType.current;
        textAreaType.focus();
        textAreaType.selectionStart = textAreaType.selectionEnd = textAreaType.value.length;
    }, [textAreaValueType]);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await dispatch(setType(textAreaValueType));
            navigate(from);
        }
    };

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title="Type" resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-8 text-center">
                                <Typography variant="h6">
                                    Add Type
                                </Typography>
                                <div className="h-4"></div>
                                <textarea id="textAreaType" ref={textAreaRefType}
                                          className="resize-none bg-green-50 focus:outline-none mx-auto text-center"
                                          value={textAreaValueType}
                                          onChange={(e) => setTextAreaValueType(e.target.value)}
                                          onKeyDown={handleKeyDown} />
                            </div>
                        </div>

                        <div className="mt-8 mx-6">
                            <div className="flex justify-center items-center">
                                <Button className="mt-2 w-full" variant="gradient" color="green"
                                        onClick={async () => {
                                            await dispatch(setType(textAreaValueType));
                                            navigate(from, { state: { type: textAreaValueType } });
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

export default CreditCardTypePage;
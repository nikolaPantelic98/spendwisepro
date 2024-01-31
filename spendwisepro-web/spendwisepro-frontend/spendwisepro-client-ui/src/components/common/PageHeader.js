import React, {useEffect} from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from 'react-router-dom';
import {useReduxReset} from "../../redux/useReduxReset";

const PageHeader = ({ title, resetRedux = true }) => {

    const reduxReset = useReduxReset();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            if (resetRedux) {
                reduxReset();
            }
            sessionStorage.removeItem('scrollPosition');
        } else {
            window.scrollTo(0, 0);
            if (resetRedux) {
                reduxReset();
            }
        }
    }, []);

    return (
        <div className="h-24 flex flex-col">
            <div>
                <Button variant="text" className="flex gap-2" onClick={handleGoBack}>
                    <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" />
                    Back
                </Button>
            </div>

            <div>
                <Typography variant="h3" color="black" className="mb-2 mx-4">
                    {title}
                </Typography>
            </div>
            <hr className="my-2 border-green-100" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }} />
        </div>
    );
};

export default PageHeader;
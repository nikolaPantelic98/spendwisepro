import React from 'react';
import {Button, Typography} from "@material-tailwind/react";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import { useNavigate } from 'react-router-dom';

const PlannedPaymentsHeader = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Redirects the user back to the previous page they came from
    };

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
                    Planned Payments
                </Typography>
            </div>
            <hr className="my-2 border-green-100" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }} />
        </div>
    );
};

export default PlannedPaymentsHeader;
import React from "react";
import {Card, CardBody, Typography} from "@material-tailwind/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

const SuccessCard = ({ text }) => {

    return (
        <div className="mt-6 ml-6 mr-6">
            <Card className="w-full h-1/3 shadow-lg mt-8">
                <CardBody>
                    <div>
                        <div className="flex justify-center items-center flex-col mb-3">
                            <CheckCircleIcon className="w-8 h-8 text-green-600 mb-2"/>
                            <Typography className="text-gray-600 text-sm font-semibold">
                                {text}
                            </Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default SuccessCard;
import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Typography} from "@material-tailwind/react";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";

const AddCategoryHeader = () => {
    return (
        <div className="h-24 flex flex-col">
            <div>
                <Link to="/home">
                    <Button variant="text" className="flex gap-2">
                        <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" />
                        Back
                    </Button>
                </Link>
            </div>

            <div>
                <Typography variant="h3" color="black" className="mb-2 mx-4">
                    Add category
                </Typography>
            </div>
            <hr className="my-2 border-green-100" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }} />
        </div>
    );
};

export default AddCategoryHeader;
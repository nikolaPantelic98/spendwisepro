import React, {useEffect, useState} from 'react';
import Menu from '../../components/common/Menu';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import PageHeader from "../../components/common/PageHeader";
import UserList from "../../components/user/UserList";
import {useLocation, useNavigate} from "react-router-dom";
import {Card, CardBody, Typography} from "@material-tailwind/react";
import {UserCircleIcon} from "@heroicons/react/24/outline";

function UsersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.success) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/users", {state: {success: false}, replace: true});
            }, 4000);
        }
    }, [location, navigate]);

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title="Users" />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">

                        {showSuccess ? (
                            <div className="mx-6">
                                <Card className="w-full shadow-lg mt-8">
                                    <CardBody>
                                        <div>
                                            <div className="flex justify-center items-center flex-col mb-3">
                                                <UserCircleIcon className="w-20 h-20 text-green-600 mb-2"/>
                                                <Typography variant="h5" className="text-gray-600 mb-2">
                                                    User registered successfully
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        ) : null}

                        <div className="mx-6">
                            <UserList />
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default UsersPage;
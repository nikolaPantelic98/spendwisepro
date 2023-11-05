import React, {useEffect, useState} from 'react';
import Menu from '../../components/common/Menu';
import CategoryList from "../../components/category/CategoryList";
import PageWidthLayout from "../../components/common/PageWidthLayout";
import PageHeader from "../../components/common/PageHeader";
import {useLocation, useNavigate} from "react-router-dom";
import SuccessCard from "../../components/common/SuccessCard";

function CategoriesPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.addSuccess) {
            setShowAddSuccess(true);
            setTimeout(() => {
                setShowAddSuccess(false);
                navigate("/categories", {state: {addSuccess: false}, replace: true});
            }, 3000);
        }
    }, [location, navigate]);

    useEffect(() => {
        if (location.state && location.state.updateSuccess) {
            setShowUpdateSuccess(true);
            setTimeout(() => {
                setShowUpdateSuccess(false);
                navigate("/categories", {state: {updateSuccess: false}, replace: true});
            }, 3000);
        }
    }, [location, navigate]);

    useEffect(() => {
        if (location.state && location.state.deleteSuccess) {
            setShowDeleteSuccess(true);
            setTimeout(() => {
                setShowDeleteSuccess(false);
                navigate("/categories", {state: {deleteSuccess: false}, replace: true});
            }, 3000);
        }
    }, [location, navigate]);

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title="Categories" />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">

                        {showAddSuccess ? (
                            <SuccessCard text="Category added successfully" />
                        ) : null}

                        {showUpdateSuccess ? (
                            <SuccessCard text="Category updated successfully" />
                        ) : null}

                        {showDeleteSuccess ? (
                            <SuccessCard text="Category deleted successfully" />
                        ) : null}

                        <div className="mx-6">
                            <CategoryList/>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default CategoriesPage;
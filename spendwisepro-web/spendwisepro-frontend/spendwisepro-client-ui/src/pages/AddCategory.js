import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import AddCategoryForm from "../components/category/AddCategoryForm";
import AddCategoryHeader from "../components/category/AddCategoryHeader";

function AddCategory() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <AddCategoryHeader/>
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div>
                            <AddCategoryForm/>
                        </div>
                    </div>
                </div>

                <div className="h-32 bg-green-50"></div>
            </div>

        </>
    );
}

export default AddCategory;
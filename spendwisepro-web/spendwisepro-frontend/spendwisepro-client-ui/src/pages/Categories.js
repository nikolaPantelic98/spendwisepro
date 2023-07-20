import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import CategoriesHeader from "../components/category/CategoriesHeader";
import CategoryList from "../components/category/CategoryList";
import PageWidthLayout from "../components/common/PageWidthLayout";

function Categories() {
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
                    <CategoriesHeader/>
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div className="mx-6">
                            <CategoryList/>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

                <div className="h-32 bg-green-50"></div>
            </div>

        </>
    );
}

export default Categories;
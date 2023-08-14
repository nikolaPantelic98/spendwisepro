import React from 'react';
import PageWidthLayout from "../components/common/PageWidthLayout";
import UsersCard from "../components/home/UsersCard";

function HomePage() {

    return (
        <>
            <div className="overflow-hidden">

                <div className="h-6 bg-green-50"></div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">

                        <div className="mx-6">
                            <UsersCard />
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default HomePage;
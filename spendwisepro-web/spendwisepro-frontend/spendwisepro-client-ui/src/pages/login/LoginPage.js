import React from 'react';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import LoginTabs from "../../components/login/LoginTabs";

function LoginPage() {

    return (
        <>
            <div className="overflow-hidden">
                <div className="h-6 bg-green-50"></div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">

                        <div className="mx-6">
                            <LoginTabs />
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default LoginPage;
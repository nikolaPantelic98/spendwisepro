import React from 'react';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import LoginForm from "../../components/login/LoginForm";

function LoginPage() {

    return (
        <>
            <div className="overflow-hidden">
                <div className="h-6 bg-green-50"></div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">

                        <div className="mx-6">
                            <LoginForm />
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default LoginPage;
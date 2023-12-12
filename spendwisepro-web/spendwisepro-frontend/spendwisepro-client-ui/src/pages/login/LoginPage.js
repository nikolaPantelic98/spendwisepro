import React, {useEffect, useState} from 'react';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import LoginTabs from "../../components/login-register/LoginTabs";
import MenuLanding from "../../components/landing-page/MenuLanding";

function LoginPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    useEffect(() => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem('scrollPosition');
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <>
            <div className="overflow-hidden">
                <MenuLanding sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
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
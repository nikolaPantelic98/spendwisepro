import React from 'react';

function LandingPage() {

    return (
        <>
            <div className="overflow-hidden">


                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mx-6">
                        <div className="container mx-auto px-6 sm:px-12 flex flex-col relative z-10">
                            <div className="flex flex-col items-start py-24 sm:py-0">
                                <h1 className="text-4xl xl:text-10xl text-green-900 font-bold leading-none">SpendWisePro</h1>
                                <h2 className="text-xl xl:text-3xl text-green-900 uppercase font-bold leading-none tracking-widest mt-4 mb-6">A step towards financial freedom</h2>
                                <p className=" tracking-wider text-gray-700 ">SpendWisePro helps you manage your expenses, track your financial goals, and gain better control over your finances. Whether you want to monitor your spending, set budgets, or plan for future expenses, this app has you covered.</p>
                                <a href="#" className=" text-white sm:font-xl uppercase py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg bg-green-900 hover:bg-green-800 mt-8 sm:mt-16">Get Started</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    );
}

export default LandingPage;
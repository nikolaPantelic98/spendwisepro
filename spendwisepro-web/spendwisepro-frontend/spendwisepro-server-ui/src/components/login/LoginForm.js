import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Checkbox
} from "@material-tailwind/react";

export default function LoginForm() {

    return (
        <Card className="w-full shadow-lg">
            <CardHeader
                color="gray"
                floated={false}
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3)), url("https://static.vecteezy.com/system/resources/previews/001/988/451/original/seamless-money-background-vector.jpg")',
                    backgroundBlendMode: 'multiply'
                }}
                className="m-0 grid place-items-center rounded-b-none py-8 px-4 bg-contain bg-center  text-center"
            >
                <div className="mt-4 mb-4 rounded-full border border-white/10 bg-white/10 p-3 text-white">
                    <img src="https://i.ibb.co/3Mzndmy/Spend-Wise-Pro-full.png" alt="Logo" className="h-20 w-20" />
                </div>
                <Typography variant="h4" color="white">
                    SpendWisePro
                </Typography>
                <Typography variant="h6" color="white">
                    - A step towards financial freedom -
                </Typography>
            </CardHeader>

            <CardBody>


                <div className="flow-root">
                    <div className="flow-root">
                        <div>
                            <Typography variant="h4" color="blue-gray">
                                Sign In
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Enter your details to login
                            </Typography>
                            <form className="mt-6 mb-2">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input color="green" size="lg" label="Username or email" />
                                    <Input color="green" type="password" size="lg" label="Password" />
                                </div>
                                <Checkbox
                                    label={
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="flex items-center font-normal"
                                        >
                                            Remember me
                                        </Typography>
                                    }
                                    containerProps={{ className: "-ml-2.5" }}
                                    color="green"
                                />
                                <Button color="green" className="mt-6" fullWidth>
                                    Login
                                </Button>
                                <Typography color="gray" className="mt-4 text-center font-normal">
                                    Did you forget the password?{" "}
                                    <a href="#" className="font-medium text-gray-900">
                                        Recover the account
                                    </a>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </div>

            </CardBody>
        </Card>
    );
}
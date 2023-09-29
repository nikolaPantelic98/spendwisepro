import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Checkbox, Tooltip
} from "@material-tailwind/react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

export default function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/spendwisepro_admin/auth/login", {
                username,
                password
            });
            const token = response.data.token;

            localStorage.setItem("token", token);
            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate("/home");
            }
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        setError(false);
    }, [username, password]);

    const TooltipError = () => {
        return (
            <div className="p-1">
                <p className=" text-red-500 font-bold">Invalid username or password</p>
            </div>
        );
    };

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
                            <form className="mt-6 mb-2" onSubmit={handleSubmit}>
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input color="green" size="lg" label="Username or email"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                           error={error} />
                                    <Input color="green" type="password" size="lg" label="Password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           error={error}
                                           icon={
                                               error && (
                                                   <Tooltip content={<TooltipError/>} placement="top-end" size="sm" className="bg-gray-100 border-1 border-red-700">
                                                       <ExclamationCircleIcon className="text-red-500 h-5 w-5"/>
                                                   </Tooltip>
                                               )
                                           } />
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
                                <Button type="submit" color="green" className="mt-6" fullWidth>
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
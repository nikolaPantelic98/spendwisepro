import React, {useEffect, useState} from "react";
import {
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
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginSubmit = async (e) => { e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/spendwisepro/auth/login", {
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
            setLoginError(true);
        }
    }

    useEffect(() => {
        setLoginError(false);
    }, [username, password]);

    const TooltipLoginError = () => {
        return (
            <div className="p-1">
                <p className=" text-red-500 font-bold">Invalid username or password</p>
            </div>
        );
    };

    return (

        <div>
            <Typography variant="h4" color="blue-gray">
                Sign In
            </Typography>
            <Button
                variant="outlined"
                color="blue-gray"
                className="flex items-center justify-center gap-3 mt-4 mb-6"
                fullWidth
            >
                <img src="https://cdn-icons-png.flaticon.com/512/720/720255.png" alt="google" className="h-5 w-5" />
                Continue with Google
            </Button>
            <Typography color="gray" className="mt-1 font-normal">
                or enter your details to login
            </Typography>
            <form className="mt-6 mb-2" onSubmit={handleLoginSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input color="green" size="lg" label="Username or email"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           error={loginError} />
                    <Input color="green" type="password" size="lg" label="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           error={loginError}
                           icon={
                               loginError && (
                                   <Tooltip content={<TooltipLoginError/>} placement="top-end" size="sm" className="bg-gray-100 border-1 border-red-700">
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
                <Button color="green" className="mt-6" fullWidth type="submit">
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
    );
}
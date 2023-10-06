import React, {useState} from "react";
import {
    Input,
    Button,
    Typography, Tooltip, Checkbox
} from "@material-tailwind/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

export default function RegisterForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => { e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setRegisterError(true);
                return;
            }

            await axios.post("http://localhost:8000/spendwisepro/auth/register", {
                username,
                email,
                password
            });
            navigate("/home");
        } catch (err) {
            setRegisterError(true);
            console.log("error");
        }
    }

    const TooltipConfirmPasswordError = () => {
        return (
            <div className="p-1">
                <p className=" text-red-500 font-bold">Passwords do not match</p>
            </div>
        );
    };

    const TooltipRegisterError = () => {
        return (
            <div className="p-1">
                <p className=" text-red-500 font-bold">Please check fields and try again</p>
            </div>
        );
    };

    return (

        <div>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form className="mt-6 mb-2" onSubmit={handleRegisterSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input color="green"
                           size="lg"
                           label="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)} />
                    <Input color="green"
                           size="lg"
                           label="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)} />
                    <Input color="green"
                           type="password"
                           size="lg"
                           label="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)} />
                    <Input color="green"
                           type="password"
                           size="lg"
                           label="Confirm password"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           error={errorPassword}
                           icon={
                               errorPassword && (
                                   <Tooltip content={<TooltipConfirmPasswordError/>} placement="top-end" size="sm" className="bg-gray-100 border-1 border-red-700">
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
                            I agree the Terms and Conditions
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    color="green"
                />

                {registerError && (
                    <div className="flex">
                        <Typography className="text-red-500 mr-2">Oops! Something is wrong</Typography>
                        <Tooltip content={<TooltipRegisterError/>} placement="top-end" size="sm" className="bg-gray-100 border-1 border-red-700">
                            <ExclamationCircleIcon className="text-red-500 h-5 w-5"/>
                        </Tooltip>
                    </div>

                )}

                <Button color="green" className="mt-6" fullWidth type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}
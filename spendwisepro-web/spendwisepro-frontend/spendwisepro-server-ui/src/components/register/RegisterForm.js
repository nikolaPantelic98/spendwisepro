import React, {useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography, Select, Option, Tooltip
} from "@material-tailwind/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

export default function RegisterForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setError(true);
                return;
            }

            await axios.post("http://localhost:8080/spendwisepro_admin/auth/register", {
                username,
                email,
                password,
                role
            }, { headers });
            navigate("/users", {state: {success: true}});
        } catch (err) {
            setError(true);
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

    const TooltipError = () => {
        return (
            <div className="p-1">
                <p className=" text-red-500 font-bold">Please check fields and try again</p>
            </div>
        );
    };

    return (
        <Card className="w-full shadow-lg mt-8">
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
                                Register User
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Enter details to register user
                            </Typography>
                            <form className="mt-6 mb-2" onSubmit={handleSubmit}>
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
                                    <Select color="green" size="lg" label="Role"
                                            value={role}
                                            onChange={(e) => setRole(e)}
                                    >
                                        <Option value="USER">User</Option>
                                        <Option value="MODERATOR">Moderator</Option>
                                        <Option value="ADMIN">Admin</Option>
                                    </Select>
                                </div>

                                {error && (
                                    <div className="flex">
                                        <Typography className="text-red-500 mr-2">Oops! Something is wrong</Typography>
                                        <Tooltip content={<TooltipError/>} placement="top-end" size="sm" className="bg-gray-100 border-1 border-red-700">
                                            <ExclamationCircleIcon className="text-red-500 h-5 w-5"/>
                                        </Tooltip>
                                    </div>

                                )}

                                <Button type="submit" color="green" className="mt-6" fullWidth>
                                    Register
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

            </CardBody>
        </Card>
    );
}
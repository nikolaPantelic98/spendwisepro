import {
    Card,
    CardBody,
    Button, ListItem
} from "@material-tailwind/react";
import React, {useRef, useState} from "react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AddCreditCardIconForm() {

    const [selectedIcon, setSelectedIcon] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [icon, setIcon] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const inputRef = useRef(null);

    const handleClickInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedIcon(e.target.files[0].name);
            setSelectedFile(URL.createObjectURL(e.target.files[0]));
            setIcon(e.target.files[0]);
        }
    }

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("fileImage", icon);
            await axios.post("http://localhost:8080/spendwisepro_admin/credit_card_icons/save", formData, { headers });
            navigate("/credit_card_icons", {state: {success: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <li className="py-3 sm:py-4">
                                <div>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" onClick={handleClickInput}>
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src="https://www.seekpng.com/png/detail/764-7640973_choose-icon-touch-circle.png" alt="Icon" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                                Icon
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="h-3"></div>
                                            <div className={`text-sm w-[17ch] truncate dark:text-gray-400 ${selectedIcon ? 'font-bold text-gray-500' : 'text-gray-500'} flex items-center justify-between gap-2`}>
                                                <div className="order-last">
                                                    {selectedIcon || "Select"}
                                                </div>
                                                <img src={selectedFile || "https://cdn-icons-png.flaticon.com/512/0/14.png"} className="w-8 h-8 rounded-full"  alt="Icon"/>
                                            </div>
                                            <div className="h-3"></div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                    <input type="file"
                                           ref={inputRef}
                                           onChange={handleFileChange}
                                           className="hidden"
                                           accept="image/jpeg, image/jpg, image/png"  />
                                </div>
                            </li>
                        </ul>
                        <hr className="my-2 border-blue-gray-50" />
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Add</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
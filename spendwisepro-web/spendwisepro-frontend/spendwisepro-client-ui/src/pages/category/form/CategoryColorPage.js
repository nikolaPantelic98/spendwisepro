import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Avatar, Card, CardBody, ListItem, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import {setCategoryColor} from "../../../redux/categorySlice";

function CategoryColorPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/add_category';

    const colorOptions = [
        {
            id: 1,
            value: "blue-gray",
            image: "https://i.ibb.co/KxFFbSz/blue-gray.png"
        },
        {
            id: 2,
            value: "gray",
            image: "https://i.ibb.co/p2zphsf/gray.png"
        },
        {
            id: 3,
            value: "brown",
            image: "https://i.ibb.co/tZnGD2d/brown.png"
        },
        {
            id: 4,
            value: "deep-orange",
            image: "https://i.ibb.co/3Chy0PT/deep-orange.png"
        },
        {
            id: 5,
            value: "orange",
            image: "https://i.ibb.co/9vgqFdS/orange.png"
        },
        {
            id: 6,
            value: "amber",
            image: "https://i.ibb.co/yQ2sQv8/amber.png"
        },
        {
            id: 7,
            value: "yellow",
            image: "https://i.ibb.co/xL8Hk2t/yellow.png"
        },
        {
            id: 8,
            value: "lime",
            image: "https://i.ibb.co/KzM5dBY/lime.png"
        },
        {
            id: 9,
            value: "light-green",
            image: "https://i.ibb.co/CtHgJqc/light-green.png"
        },
        {
            id: 10,
            value: "green",
            image: "https://i.ibb.co/pJDFFbr/green.png"
        },
        {
            id: 11,
            value: "teal",
            image: "https://i.ibb.co/4pc1szg/teal.png"
        },
        {
            id: 12,
            value: "cyan",
            image: "https://i.ibb.co/TtJGdmp/cyan.png"
        },
        {
            id: 13,
            value: "light-blue",
            image: "https://i.ibb.co/hFgDjbY/light-blue.png"
        },
        {
            id: 14,
            value: "blue",
            image: "https://i.ibb.co/Q6LzwQF/blue.png"
        },
        {
            id: 15,
            value: "indigo",
            image: "https://i.ibb.co/89NTH46/indigo.png"
        },
        {
            id: 16,
            value: "deep-purple",
            image: "https://i.ibb.co/ccWzHZt/deep-purple.png"
        },
        {
            id: 17,
            value: "purple",
            image: "https://i.ibb.co/2hcRVhs/purple.png"
        },
        {
            id: 18,
            value: "pink",
            image: "https://i.ibb.co/CmMyFBr/pink.png"
        },
        {
            id: 19,
            value: "red",
            image: "https://i.ibb.co/C7mNPLf/red.png"
        }
    ];

    const [selectedColor, setSelectedColor] = React.useState(location.state?.selectedColor || "");

    const handleSelectColor = async (color) => {
        await dispatch(setCategoryColor(color));
        navigate(from, { state: { color: color } });
    };


    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title={from === '/add_category' ? "Add category" : "Edit category"} resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-8 text-center">
                                <Card className="w-full shadow-lg">
                                    <CardBody>
                                        <Typography variant="h6" className="text-gray-800">
                                            Add Color
                                        </Typography>
                                        <div className="h-4"></div>
                                        <div>
                                            <ul role="list" className="flex flex-wrap gap-4 justify-center">

                                                {colorOptions.map(color => (
                                                    <li className="flex-0 w-1/4">
                                                        <ListItem
                                                            className={`flex items-center justify-center ${selectedColor === color.value ? 'border-3 border-green-500' : ''}`}
                                                            onClick={() => handleSelectColor(color.value)}
                                                        >
                                                            <div>
                                                                <Avatar className="w-13 h-13 rounded-full" src={color.image} alt={color.image} />
                                                            </div>
                                                        </ListItem>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryColorPage;
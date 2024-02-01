import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {setIcon} from "../../../redux/creditCardSlice";
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Avatar, Button, ListItem, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import axios from "axios";
import {setCategoryIcon} from "../../../redux/categorySlice";

function CategoryIconPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/add_category';

    const [icons, setIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = React.useState(location.state?.selectedIcon || "");

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/category_icons/all', { headers })
            .then(response => {
                setIcons(response.data);
            })
            .catch(error => console.error('Error fetching icons:', error));
    }, []);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await dispatch(setCategoryIcon(selectedIcon));
            navigate(from);
        }
    };

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title="Icon" resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-8 text-center">
                                <Typography variant="h6">
                                    Add Icon
                                </Typography>
                                <div className="h-4"></div>
                                <div>
                                    <ul role="list" className="divide-y divide-gray-200 flex flex-wrap gap-4 justify-center">

                                        {icons.map(icon => (
                                            <li className="flex-0 w-1/4">
                                                <ListItem
                                                    className={`flex items-center justify-center ${selectedIcon.id === icon.id ? 'border-3 border-green-500' : ''}`}
                                                    onClick={() => setSelectedIcon(icon)}
                                                    onKeyDown={handleKeyDown}
                                                    tabIndex={0}
                                                >
                                                    <div>
                                                        <Avatar className="w-13 h-13 rounded-full" src={icon.iconPath} alt={icon.image} />
                                                    </div>
                                                </ListItem>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 mx-6">
                            <div className="flex justify-center items-center">
                                <Button className="mt-2 w-full" variant="gradient" color="green"
                                        onClick={async () => {
                                            await dispatch(setCategoryIcon(selectedIcon));
                                            navigate(from, { state: { icon: selectedIcon } });
                                        }}>
                                    <span>Confirm</span>
                                </Button>
                            </div>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default CategoryIconPage;
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Avatar, Button, ListItem, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import axios from "axios";
import {setCategoryParent} from "../../../redux/categorySlice";
import {ChevronRightIcon} from "@heroicons/react/24/outline";

function CategoryParentPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/add_category';

    const [parents, setParents] = useState([]);
    const [selectedParent, setSelectedParent] = React.useState(location.state?.selectedParent || "");

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all_root', { headers })
            .then(response => {
                setParents(response.data);
            })
            .catch(error => console.error('Error fetching parents:', error));
    }, []);

    const handleSelectParent = async (parent) => {
        await dispatch(setCategoryParent(parent));
        navigate(from, { state: { parent: parent } });
    };

    const handleClear = async () => {
        await dispatch(setCategoryParent(null));
        navigate(from, { state: { parent: null } });
    };

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title="Parent Category" resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-8 text-center">
                                <Typography variant="h6">
                                    Add Parent Category
                                </Typography>
                                <div className="h-4"></div>
                                <div>
                                    <ul role="list">

                                        {parents.map((parent, index) => (
                                            <li className={`flex ${index === 0 && selectedParent.id !== parent.id ? 'border-t border-gray-500' : ''} ${selectedParent.id === parent.id ? '' : (parents[index + 1] && parents[index + 1].id === selectedParent.id) ? '' : 'border-b border-gray-400'}`}>
                                                <ListItem
                                                    className={`flex items-center justify-between ${selectedParent.id === parent.id ? 'border-3 border-green-500' : ''}`}
                                                    onClick={() => handleSelectParent(parent)}
                                                    tabIndex={0}
                                                >
                                                    <div className="flex items-center">
                                                        <Avatar className="w-8 h-8 rounded-full" src={parent.icon.iconPath} alt={parent.icon.iconPath} />
                                                        <span className="ml-3">{parent.name}</span>
                                                    </div>
                                                    <div className="ml-2">
                                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                    </div>
                                                </ListItem>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 mx-6">
                            <div className="flex justify-center items-center">
                                <Button className="mt-2 w-full" variant="gradient" color="red"
                                        onClick={handleClear}>
                                    <span>Clear</span>
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

export default CategoryParentPage;
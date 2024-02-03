import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Avatar, Card, CardBody, ListItem, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import axios from "axios";
import {setCategoryParent} from "../../../redux/categorySlice";
import {ChevronRightIcon, DocumentIcon} from "@heroicons/react/24/outline";

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
                    <PageHeader title={from === '/add_category' ? "Add category" : "Edit category"} resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-6 text-center">
                                <Card className="w-full shadow-lg">
                                    <CardBody>
                                        <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                                            Add parent category
                                        </Typography>
                                        <hr className="my-1 border-blue-gray-50" />

                                        <div className="flow-root">
                                            <ul role="list" className="divide-y divide-gray-200">

                                                <li className="py-3 sm:py-4">
                                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                                                              onClick={() => handleClear()}>
                                                        <div className="flex-shrink-0">
                                                            <Avatar className="w-8 h-8 rounded-full" src="https://icon-library.com/images/none-icon/none-icon-13.jpg" alt="None"/>
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                None
                                                            </p>
                                                        </div>

                                                        <div className="ml-2">
                                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                        </div>
                                                    </ListItem>
                                                </li>

                                                {parents.map((parent) => (
                                                    <li key={parent.id} className="py-3 sm:py-4">
                                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                                                                  onClick={() => handleSelectParent(parent)}>
                                                            <div className="flex-shrink-0">
                                                                <Avatar className="w-8 h-8 rounded-full" src={parent.icon.iconPath} alt={parent.icon.iconPath}/>
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                                    {parent.name}
                                                                </p>
                                                            </div>

                                                            <div className="ml-2">
                                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                            </div>
                                                        </ListItem>
                                                    </li>
                                                ))}

                                                {parents.length === 0 && (
                                                    <div>
                                                        <div className="flex justify-center items-center flex-col mb-3">
                                                            <DocumentIcon className="w-20 h-20 text-green-600 mb-2"/>
                                                            <Typography variant="h5" className="text-gray-600 mb-2">
                                                                No data to display
                                                            </Typography>
                                                            <Typography variant="h6" className="text-gray-500">
                                                                Please add parent categories
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                )}
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

export default CategoryParentPage;
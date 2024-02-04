import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Button,
    Card,
    CardBody,
    ListItem,
    Typography,
    Checkbox
} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import axios from "axios";
import {ChevronDownIcon, ChevronRightIcon, RectangleGroupIcon} from "@heroicons/react/24/outline";
import {saveSelectedCategories, setBudgetCategories} from "../../../redux/budgetSlice";

function BudgetCategoriesPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/add_budget';

    const savedCategories = useSelector((state) => state.budget.selectedCategories);

    const [allCategories, setAllCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all', { headers })
            .then(response => {
                setAllCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSelectCategories = async (category) => {
        let newCategories;
        if (categories.includes(category)) {
            newCategories = categories.filter(cat => cat !== category);
        } else {
            newCategories = [...categories, category];
        }
        setCategories(newCategories);
        dispatch(saveSelectedCategories(newCategories));
    };

    useEffect(() => {
        if (savedCategories) {
            setCategories(savedCategories);
        }
    }, []);

    const parentCategories = allCategories.filter(category => category.parent === null);
    const subCategories = allCategories.filter(category => category.parent !== null);

    const fullCategories = parentCategories.map(superCategory => {
        const subCats = subCategories.filter(subCategory => subCategory.parent.name === superCategory.name);
        return {
            ...superCategory,
            subCategories: subCats,
        };
    });

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title={from === '/add_budget' ? "Add budget" : "Edit budget"} resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-6 text-center">
                                <Card className="w-full shadow-lg">
                                    <CardBody>
                                        <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                                            Add categories
                                        </Typography>
                                        <hr className="my-1 border-blue-gray-50" />

                                        <div className="flow-root">
                                            <ul role="list" className="divide-y divide-gray-200">

                                                <div>
                                                    {fullCategories.map(superCategory => (
                                                        <Accordion
                                                            key={superCategory.id}
                                                            open={open === superCategory.id}
                                                            icon={
                                                                <ChevronDownIcon
                                                                    strokeWidth={2.5}
                                                                    className={`mx-auto h-4 w-4 text-green-800 transition-transform ${open === superCategory.id ? "rotate-180" : ""}`}
                                                                />
                                                            }
                                                        >
                                                            <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" selected={open === superCategory.id}>
                                                                <AccordionHeader onClick={() => handleOpen(superCategory.id)} className="border-b-0 p-3 gap-4 pl-0">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="w-8 h-8 rounded-full" src={superCategory.icon.iconPath} alt={superCategory.icon.image} />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="h-1"></div>
                                                                        <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                                            {superCategory.name}
                                                                        </p>
                                                                        <p className="text-sm font-medium text-gray-500 truncate">
                                                                            Parent category
                                                                        </p>
                                                                        <div className="h-1"></div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        {categories.filter(cat => cat.parent.id === superCategory.id).length > 0 && (
                                                                            <p className="text-sm font-medium text-gray-500 truncate">
                                                                                ({categories.filter(cat => cat.parent.id === superCategory.id).length})
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </AccordionHeader>
                                                            </ListItem>

                                                            <AccordionBody className="py-1">
                                                                {superCategory.subCategories.length === 0 ? (
                                                                    <li>
                                                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-3 pr-2">
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="h-3"></div>
                                                                                <p className="text-sm text-center text-gray-500 truncate">
                                                                                    There are currently no
                                                                                </p>
                                                                                <p className="text-sm text-center text-gray-500 truncate">
                                                                                    subcategories
                                                                                </p>
                                                                                <div className="h-3"></div>
                                                                                <div className="flex justify-center items-center">
                                                                                    <Link to="/add_category" onClick={storeScrollPosition} className="w-full">
                                                                                        <Button className="w-full" variant="gradient" color="green">
                                                                                            <span>Add subcategory</span>
                                                                                        </Button>
                                                                                    </Link>
                                                                                </div>
                                                                                <div className="h-3"></div>
                                                                            </div>
                                                                        </ListItem>
                                                                    </li>
                                                                ) : (
                                                                    superCategory.subCategories.map(subCategory => (
                                                                        <li key={subCategory.id}>
                                                                            <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-3 pr-2"
                                                                                      onClick={() => handleSelectCategories(subCategory)}>
                                                                                <Checkbox name="color" color="green" className="rounded-full" checked={categories.some(cat => cat.id === subCategory.id)} onClick={() => handleSelectCategories(subCategory)} />
                                                                                <img className="w-8 h-8 rounded-full" src={subCategory.icon.iconPath} alt={subCategory.icon.image} />
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="h-3"></div>
                                                                                    <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                                                        {subCategory.name}
                                                                                    </p>
                                                                                    <p className="text-sm text-gray-500 truncate">
                                                                                        {superCategory.name}
                                                                                    </p>
                                                                                    <div className="h-3"></div>
                                                                                </div>
                                                                                <div className="ml-2">
                                                                                    <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                                                </div>
                                                                            </ListItem>
                                                                        </li>
                                                                    ))
                                                                )}
                                                            </AccordionBody>
                                                        </Accordion>
                                                    ))}

                                                    {fullCategories.length === 0 && (
                                                        <div>
                                                            <div className="flex justify-center items-center flex-col mb-6">
                                                                <RectangleGroupIcon className="w-20 h-20 text-green-600 mb-2"/>
                                                                <Typography variant="h6" className="text-gray-600">
                                                                    You currently have no
                                                                </Typography>
                                                                <Typography variant="h6" className="text-gray-600">
                                                                    categories created
                                                                </Typography>
                                                            </div>
                                                            <div className="flex justify-center items-center">
                                                                <Link to="/add_category" onClick={storeScrollPosition} className="w-full">
                                                                    <Button className="w-full" variant="gradient" color="green">
                                                                        <span>Add Category</span>
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </ul>
                                        </div>
                                    </CardBody>

                                    <div className="mb-6 mx-6">
                                        <div className="flex justify-center items-center">
                                            <Button className="w-full" variant="gradient" color="green"
                                                    onClick={async () => {
                                                        await dispatch(setBudgetCategories(categories));
                                                        navigate(from, { state: { categories: categories } });
                                                    }}>
                                                <span>Confirm</span>
                                            </Button>
                                        </div>
                                    </div>
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

export default BudgetCategoriesPage;
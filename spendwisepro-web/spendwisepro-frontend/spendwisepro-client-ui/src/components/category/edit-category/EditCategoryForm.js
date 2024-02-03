import React, {useEffect, useState} from "react";
import axios from "axios";
import CategoryName from "../form-elements/CategoryName";
import CategoryColor from "../form-elements/CategoryColor";
import CategoryIcon from "../form-elements/CategoryIcon";
import CategoryParentCategory from "../form-elements/CategoryParentCategory";
import {Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {useNavigate, useParams} from "react-router-dom";
import {useReduxReset} from "../../../redux/useReduxReset";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryColor, setCategoryIcon, setCategoryName, setCategoryParent} from "../../../redux/categorySlice";

export default function EditCategoryForm() {

    const [categoryDB, setCategoryDB] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(false);
    const reduxReset = useReduxReset();

    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const { name, color, icon, parent } = category;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleNameChange = (name) => {
        dispatch(setCategoryName(name));
    };

    const handleColorChange = (color) => {
        dispatch(setCategoryColor(color));
    };

    const handleIconChange = (icon) => {
        dispatch(setCategoryIcon(icon));
    };

    const handleParentChange = (parent) => {
        dispatch(setCategoryParent(parent));
    };

    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const handleOpenDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(true);
    const handleCloseDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/spendwisepro/categories/${id}`, { headers })
            .then(response => {
                setCategoryDB(response.data);
            })
            .catch(error => console.error('Error fetching category:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/categories/edit/${id}`, category, { headers });
            reduxReset();
            navigate("/categories", {state: {updateSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    const updatedName = useSelector((state) => state.category.name);
    const updatedColor = useSelector((state) => state.category.color);
    const updatedIcon = useSelector((state) => state.category.icon);
    const updatedParent = useSelector((state) => state.category.parent);

    useEffect(() => {
        if (updatedName) {
            handleNameChange(updatedName);
        }
        if (updatedColor) {
            handleColorChange(updatedColor);
        }
        if (updatedIcon) {
            handleIconChange(updatedIcon);
        }
        if (updatedParent) {
            handleParentChange(updatedParent);
        }
    }, [updatedName, updatedColor, updatedIcon, updatedParent]);

    const deleteCategory = () => {
        axios.delete(`http://localhost:8000/spendwisepro/categories/delete/${id}`, { headers })
            .then(() => {
                navigate("/categories", {state: {deleteSuccess: true}});
            })
            .catch(error => console.error('Error deleting category:', error));
        handleCloseDeleteConfirmationDialog();
    }

    function navigateToCategories() {
        navigate("/categories");
    }


    return categoryDB ? (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                            <CategoryName setName={handleNameChange} initialValue={name !== "" ? name : categoryDB.name} formType="edit" id={id} />

                            <CategoryParentCategory setParent={handleParentChange} initialValue={parent !== null ? parent : categoryDB.parent} formType="edit" id={id} />

                            <CategoryIcon setIcon={handleIconChange} initialValue={icon !== null ? icon : categoryDB.icon} formType="edit" id={id} />

                            <CategoryColor setColor={handleColorChange} initialValue={color !== "" ? color : categoryDB.color} formType="edit" id={id} />
                        </ul>

                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center space-x-2">
                            <Button onClick={handleOpenDeleteConfirmationDialog} className="mt-2 w-full" variant="outlined" color="red">
                                <span>Delete</span>
                            </Button>
                            <Button className="mt-2 w-full" variant="outlined" color="green" onClick={() => {
                                navigateToCategories();
                                reduxReset();
                            }}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                </form>

            </CardBody>

            <Dialog
                open={openDeleteConfirmationDialog}
                handler={handleCloseDeleteConfirmationDialog}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Are you sure?</DialogHeader>
                <DialogBody>
                    Do you really want to delete this category? This process cannot be undone.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={deleteCategory}
                        className="mr-1"
                    >
                        <span>Delete</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleCloseDeleteConfirmationDialog}>
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </Card>
    ) : null;
}
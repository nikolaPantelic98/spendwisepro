import React, {useEffect, useState} from "react";
import axios from "axios";
import AddCategoryName from "./add-category-elements/AddCategoryName";
import AddCategoryColor from "./add-category-elements/AddCategoryColor";
import AddCategoryIcon from "./add-category-elements/AddCategoryIcon";
import AddCategoryParentCategory from "./add-category-elements/AddCategoryParentCategory";
import {Button, Card, CardBody} from "@material-tailwind/react";
import {useNavigate, useParams} from "react-router-dom";

export default function EditCategoryForm() {
    const [category, setCategory] = useState(null);
    const { id } = useParams();

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleNameChange = (name) => setCategory({...category, name});
    const handleColorChange = (color) => setCategory({...category, color});
    const handleIconChange = (icon) => setCategory({...category, icon});
    const handleParentChange = (parent) => setCategory({...category, parent});

    useEffect(() => {
        axios.get(`http://localhost:8000/spendwisepro/categories/${id}`, { headers })
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => console.error('Error fetching category:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/categories/${id}`, category, { headers });
            navigate("/categories", {state: {success: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    const deleteCategory = () => {
        axios.delete(`http://localhost:8000/spendwisepro/categories/delete/${id}`, { headers })
            .then(() => {
                navigate("/categories", {state: {success: true}});
            })
            .catch(error => console.error('Error deleting icon:', error));
    }

    function navigateToCategories() {
        navigate("/categories");
    }

    return category ? (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <div className="flex justify-center items-center">
                            <Button onClick={deleteCategory} className="mt-2 w-full" variant="outlined" color="red">
                                <span>Delete</span>
                            </Button>
                        </div>
                        <div className="h-4"></div>
                        <ul role="list" className="divide-y divide-gray-200">
                            <AddCategoryName setName={handleNameChange} initialValue={category.name} />

                            <AddCategoryParentCategory setParent={handleParentChange} initialValue={category.parent} />

                            <AddCategoryIcon setIcon={handleIconChange} initialValue={category.icon} />

                            <AddCategoryColor setColor={handleColorChange} initialValue={category.color} />
                        </ul>

                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center">
                            <Button onClick={navigateToCategories} className="mt-2 w-full" variant="outlined" color="green">
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
        </Card>
    ) : null;
}
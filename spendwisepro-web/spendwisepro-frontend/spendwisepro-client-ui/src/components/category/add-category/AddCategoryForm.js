import {
    Card,
    CardBody,
    Button
} from "@material-tailwind/react";
import React, {useState} from "react";
import CategoryName from "../form-elements/CategoryName";
import CategoryParentCategory from "../form-elements/CategoryParentCategory";
import CategoryIcon from "../form-elements/CategoryIcon";
import CategoryColor from "../form-elements/CategoryColor";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function AddCategoryForm() {

    const [category, setCategory] = useState({
        name: "",
        color: "",
        icon: null,
        parent: null
    });
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

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/categories/save", category, { headers });
            navigate("/categories", {state: {addSuccess: true}});
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
                            <CategoryName setName={handleNameChange} />

                            <CategoryParentCategory setParent={handleParentChange} />

                            <CategoryIcon setIcon={handleIconChange} />

                            <CategoryColor setColor={handleColorChange} />
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
import {
    Card,
    CardBody,
    Button
} from "@material-tailwind/react";
import React from "react";
import AddCategoryName from "./add-category-elements/AddCategoryName";
import AddCategoryParentCategory from "./add-category-elements/AddCategoryParentCategory";
import AddCategoryIcon from "./add-category-elements/AddCategoryIcon";

export default function AddCategoryForm() {
    return (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <AddCategoryName />

                        <AddCategoryParentCategory />

                        <AddCategoryIcon />
                    </ul>
                    <hr className="my-2 border-blue-gray-50" />
                    <div className="flex justify-center items-center">
                        <Button className="mt-2 w-full" variant="gradient" color="green">
                            <span>Add</span>
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
import {
    Card,
    CardBody,
    Select,
    Option,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export default function AddCategoryForm() {
    return (
        <Card className="mt-6">
            <CardBody>

                <div className="w-64 m-6">
                    <Input label="Name" color="green" />
                </div>

                <div className="m-6">
                    <Select label="Parent Category" menuProps={{ className: "h-48" }} color="green">
                        <Option value="None">None</Option>
                        <Option value="Grocery">Grocery</Option>
                        <Option value="Fuel">Fuel</Option>
                        <Option value="Health Care">Health Care</Option>
                        <Option value="Phone">Phone</Option>
                        <Option value="Tax">Tax</Option>
                        <Option value="Sales">Sales</Option>
                        <Option value="Salary">Salary</Option>
                    </Select>
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Can be empty.
                    </Typography>
                </div>

                <div className="m-6">
                    <Button
                        size="sm"
                        variant="outlined"
                        className="flex items-center gap-3 text-green-700 hover:text-green-800"
                        color="green"
                        onClick={() => {
                            document.getElementById("upload-input").click();
                        }}
                    >
                        Upload icon
                        <ArrowUpOnSquareIcon strokeWidth={2} className="h-5 w-5" />
                    </Button>
                    <input
                        id="upload-input"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            const fileName = e.target.files[0].name;
                            document.getElementById("file-name").textContent = fileName;
                        }}
                    />
                    <p id="file-name" className="mt-2"></p>
                </div>

                <div className="m-6 mt-8">
                    <Button size="md" color="green" className="bg-green-700 hover:bg-green-800">Add</Button>
                </div>

            </CardBody>
        </Card>
    );
}
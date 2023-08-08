import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function AddCreditCardType() {

    const [openType, setOpenType] = React.useState(false);
    const [selectedType, setSelectedType] = React.useState("");
    const [tempSelectedType, setTempSelectedType] = React.useState("");
    const handleOpenType = () => {
        setTempSelectedType(selectedType);
        setOpenType(true);
    };
    const handleCloseType = () => {
        setSelectedType(tempSelectedType);
        setOpenType(false);
    };

    const handleConfirmType = () => {
        setOpenType(false);
        setTempSelectedType("");
    };
    const handleTypeChange = (value) => {
        setSelectedType(value);
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenType}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.pngitem.com/pimgs/m/544-5444157_credit-card-icons-png-credit-card-icon-green.png" alt="Type" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Type
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${selectedType ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {selectedType || "Select"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openType}
                handler={handleOpenType}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Type</DialogHeader>
                <DialogBody>
                    <Select
                        label="Type"
                        menuProps={{ className: "h-48" }}
                        color="green"
                        size="lg"
                        value={tempSelectedType}
                        onChange={handleTypeChange}
                        className="relative"
                    >
                        <Option value="Visa">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/visa-512.png" alt="Visa" />
                                <span className="ml-3">Visa</span>
                            </div>
                        </Option>
                        <Option value="MasterCard">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn3.iconfinder.com/data/icons/circle-payment-methods-4/512/Mastercard-512.png" alt="MasterCard" />
                                <span className="ml-3">MasterCard</span>
                            </div>
                        </Option>
                        <Option value="American Express">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/american-express-512.png" alt="American Express" />
                                <span className="ml-3">American Express</span>
                            </div>
                        </Option>
                        <Option value="Chase">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/0/109.9-mobile-banking-icon-iconbunny.jpg" alt="Chase" />
                                <span className="ml-3">Chase</span>
                            </div>
                        </Option>
                        <Option value="Capital One">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://www.nrttech.com/wp-content/uploads/2018/07/CapitalOne@3x.png" alt="Capital One" />
                                <span className="ml-3">Capital One</span>
                            </div>
                        </Option>
                        <Option value="Synchrony">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://www.pngfind.com/pngs/m/350-3504791_financial-map-icon-round-blue-hd-png-download.png" alt="Synchrony" />
                                <span className="ml-3">Synchrony</span>
                            </div>
                        </Option>
                        <Option value="Citibank">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/217/217437.png" alt="Citibank" />
                                <span className="ml-3">Citibank</span>
                            </div>
                        </Option>
                        <Option value="Discover">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/825/825448.png" alt="Discover" />
                                <span className="ml-3">Discover</span>
                            </div>
                        </Option>
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseType}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmType}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}
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

export default function AddRecordCreditCard() {

    // amount

    const [openCreditCard, setOpenCreditCard] = React.useState(false);
    const [selectedCreditCard, setSelectedCreditCard] = React.useState("");
    const [tempSelectedCreditCard, setTempSelectedCreditCard] = React.useState("");
    const handleOpenCreditCard = () => {
        setTempSelectedCreditCard(selectedCreditCard);
        setOpenCreditCard(true);
    };
    const handleCloseCreditCard = () => {
        setSelectedCreditCard(tempSelectedCreditCard);
        setOpenCreditCard(false);
    };

    const handleConfirmCreditCard = () => {
        setOpenCreditCard(false);
        setTempSelectedCreditCard("");
    };
    const handleCreditCardChange = (value) => {
        setSelectedCreditCard(value);
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenCreditCard}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.pngitem.com/pimgs/m/544-5444157_credit-card-icons-png-credit-card-icon-green.png" alt="Credit card" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Credit Card
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${selectedCreditCard ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {selectedCreditCard || "Select"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openCreditCard}
                handler={handleOpenCreditCard}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Credit card</DialogHeader>
                <DialogBody>
                    <Select
                        label="Credit card"
                        color="green"
                        size="lg"
                        value={tempSelectedCreditCard}
                        onChange={handleCreditCardChange}
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
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseCreditCard}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmCreditCard}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}
import React, { forwardRef } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
} from "@material-tailwind/react";
import {
    HomeIcon,
    EyeIcon, ArrowDownOnSquareStackIcon, ClipboardDocumentListIcon, DocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CreditCardIcon
} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";


function storeScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
}

const SidebarLanding = forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card ref={ref} className="fixed top-0 left-0 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">

            <div className="mb-2 flex items-center gap-4 p-4">
                <img src="https://i.ibb.co/3Mzndmy/Spend-Wise-Pro-full.png" className="h-15 w-14"  alt="Logo"/>
                <Typography variant="h5" color="blue-gray">
                    SpendWisePro
                </Typography>
            </div>

            <List>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <Link to="" onClick={storeScrollPosition}>
                        <ListItem className="focus:bg-green-50 hover:bg-green-50">
                            <ListItemPrefix>
                                <HomeIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Home
                            </Typography>
                        </ListItem>
                    </Link>

                </Accordion>

                <hr className="my-2 border-blue-gray-50" />

                <ListItem className="focus:bg-green-50 hover:bg-green-50">
                    <ListItemPrefix>
                        <ClipboardDocumentListIcon className="h-5 w-5 text-green-900" />
                    </ListItemPrefix>
                    About Us
                </ListItem>

                <ListItem className="focus:bg-green-50 hover:bg-green-50">
                    <ListItemPrefix>
                        <DocumentTextIcon className="h-5 w-5 text-green-900" />
                    </ListItemPrefix>
                    Privacy Policy
                </ListItem>

                <hr className="my-2 border-blue-gray-50" />

                <Accordion
                    open={open === 3}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0 focus:bg-green-50 hover:bg-green-50" selected={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <EyeIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Social Media
                            </Typography>
                        </AccordionHeader>
                    </ListItem>

                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link to="https://www.linkedin.com/in/nikola-pantelic-017616254">
                                <ListItem className="focus:bg-green-50 hover:bg-green-50">
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    LinkedIn
                                </ListItem>
                            </Link>
                            <Link to="https://github.com/nikolaPantelic98">
                                <ListItem className="focus:bg-green-50 hover:bg-green-50">
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    GitHub
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>

                </Accordion>

                <div className="h-8"></div>
            </List>

            <Alert open={openAlert} className="mt-auto bg-green-500" onClose={() => setOpenAlert(false)}>
                <CreditCardIcon className="mb-4 h-12 w-12" />
                <Typography variant="h6" className="mb-1">
                    Welcome to SpendWisePro
                </Typography>
                <Typography variant="small" className="font-normal opacity-80">
                    Get ready to take control of your finances with SpendWisePro! Start managing your budget, tracking expenses, and making smart spending decisions. Stay on top of your financial goals and make every penny count. We're here to help you succeed!
                </Typography>
                <div className="mt-4 flex gap-3">
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium opacity-80"
                        onClick={() => setOpenAlert(false)}
                    >
                        Dismiss
                    </Typography>
                    <Typography as="a" href="#" variant="small" className="font-medium">
                        Let's Begin
                    </Typography>
                </div>
            </Alert>
            <List>
                <div className="h-12"></div>
            </List>
        </Card>
    );
});

export default SidebarLanding;
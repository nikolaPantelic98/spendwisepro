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
    PresentationChartBarIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
    HomeIcon,
    TagIcon,
    EyeIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CreditCardIcon
} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

const Sidebar = forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card ref={ref} className="fixed top-0 left-0 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">

            <div className="mb-2 flex items-center gap-4 p-4">
                <img src="https://i.ibb.co/RCG4xZ2/Spend-Wise-Pro-circle.png" className="h-15 w-14"  alt="Logo"/>
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
                    <Link to="/home">
                        <ListItem>
                                <ListItemPrefix>
                                    <HomeIcon className="h-5 w-5 text-green-900" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Home
                                </Typography>
                        </ListItem>
                    </Link>

                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Dashboard
                            </Typography>
                        </AccordionHeader>
                    </ListItem>

                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Balance
                            </ListItem>
                            <Link to="/cash">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Cash
                                </ListItem>
                            </Link>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Credit Cards
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Last Records
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Budgets
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Goals
                            </ListItem>
                        </List>
                    </AccordionBody>

                </Accordion>

                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <TagIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Category
                            </Typography>
                        </AccordionHeader>
                    </ListItem>

                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link to="/categories">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    View Categories
                                </ListItem>
                            </Link>
                            <Link to="/add_category">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Add Category
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>

                </Accordion>

                <hr className="my-2 border-blue-gray-50" />

                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5 text-green-900" />
                    </ListItemPrefix>
                    Profile
                </ListItem>

                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5 text-green-900" />
                    </ListItemPrefix>
                    Settings
                </ListItem>

                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5 text-red-900" />
                    </ListItemPrefix>
                    Log Out
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
                    <ListItem className="p-0" selected={open === 3}>
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
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    LinkedIn
                                </ListItem>
                            </Link>
                            <Link to="https://github.com/nikolaPantelic98">
                                <ListItem>
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

export default Sidebar;
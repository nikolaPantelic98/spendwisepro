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
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
    HomeIcon,
    EyeIcon,
    UsersIcon, InformationCircleIcon
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CreditCardIcon
} from "@heroicons/react/24/outline";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


function storeScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
}

const Sidebar = forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);
    const navigate = useNavigate();

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post("http://localhost:8080/spendwisepro_admin/auth/logout", null, config);

        localStorage.removeItem('token');

        navigate("/login-register");
    };

    return (
        <Card ref={ref} className="fixed top-0 left-0 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto">

            <div className="mb-2 flex items-center gap-4 p-4">
                <img src="https://i.ibb.co/3Mzndmy/Spend-Wise-Pro-full.png" className="h-15 w-14" alt="Logo" />
                <div>
                    <Typography variant="h5" color="blue-gray">
                        SpendWisePro
                    </Typography>
                    <Typography variant="h6" color="blue-gray" className="text-gray-500">
                        Administrator
                    </Typography>
                </div>
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
                    <Link to="/home" onClick={storeScrollPosition}>
                        <ListItem className="focus:bg-green-50 hover:bg-green-50">
                            <ListItemPrefix>
                                <HomeIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Home
                            </Typography>
                        </ListItem>
                    </Link>

                    <Link to="/users" onClick={storeScrollPosition}>
                        <ListItem className="focus:bg-green-50 hover:bg-green-50">
                            <ListItemPrefix>
                                <UsersIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Users
                            </Typography>
                        </ListItem>
                    </Link>

                    <Link to="/register" onClick={storeScrollPosition}>
                        <ListItem className="focus:bg-green-50 hover:bg-green-50">
                            <ListItemPrefix>
                                <UsersIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Register User
                            </Typography>
                        </ListItem>
                    </Link>

                    <ListItem className="p-0 focus:bg-green-50 hover:bg-green-50" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <InformationCircleIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                View Icons
                            </Typography>
                        </AccordionHeader>
                    </ListItem>

                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link to="/category_icons" onClick={storeScrollPosition}>
                                <ListItem className="focus:bg-green-50 hover:bg-green-50">
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Category Icons
                                </ListItem>
                            </Link>
                            <Link to="/credit_card_icons" onClick={storeScrollPosition}>
                                <ListItem className="focus:bg-green-50 hover:bg-green-50">
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Credit Card Icons
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>

                    <Link>
                        <ListItem className="focus:bg-green-50 hover:bg-green-50">
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5 text-green-900" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                App Settings
                            </Typography>
                        </ListItem>
                    </Link>

                </Accordion>

                <hr className="my-2 border-blue-gray-50" />

                <ListItem className="focus:bg-green-50 hover:bg-green-50">
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5 text-green-900" />
                    </ListItemPrefix>
                    Profile
                </ListItem>

                <Link onClick={handleLogout}>
                    <ListItem className="focus:bg-red-50 hover:bg-red-50">
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5 text-red-900" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </Link>

                <hr className="my-2 border-blue-gray-50" />

                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0 focus:bg-green-50 hover:bg-green-50" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
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
                    SpendWisePro Control Panel
                </Typography>
                <Typography variant="small" className="font-normal opacity-80">
                    Manage the users and the app settings in the best way!
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
import {
    Card,
    CardBody,
    Typography,
    ListItem, Avatar, IconButton, Button, Input,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

export default function UserList() {

    const [currentPage, setCurrentPage] = React.useState(1);

    const [searchEmail, setSearchEmail] = React.useState("");
    const handleEmailChange = ({ target }) => setSearchEmail(target.value);

    const goToNextPage = () => {
        if (currentPage === 10) return;

        setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage === 1) return;

        setCurrentPage(currentPage - 1);
    };

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    <Input type="email" label="Email or username" value={searchEmail} onChange={handleEmailChange}/>
                    <Button size="sm"
                            color={searchEmail ? "green" : "light-green"}
                            disabled={!searchEmail}
                            className="!absolute right-7 top-7 rounded"
                    >
                        Search
                    </Button>
                </Typography>
                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <Avatar className="w-8 h-8 rounded-full" src="https://i.ibb.co/cgfPBvk/user.png" alt="User" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Williebass97
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            williebass@example.com
                                        </p>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            18 July 2023
                                        </div>
                                        <div className="h-1"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <Avatar className="w-8 h-8 rounded-full" src="https://i.ibb.co/cgfPBvk/user.png" alt="User" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Dennismyers0000
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            dennismyers@example.com
                                        </p>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            03 July 2023
                                        </div>
                                        <div className="h-1"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <Avatar className="w-8 h-8 rounded-full" src="https://i.ibb.co/cgfPBvk/user.png" alt="User" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Opalcastro
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            opencastro@example.com
                                        </p>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            20 June 2023
                                        </div>
                                        <div className="h-1"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                        <li className="py-3 sm:py-4">
                            <Link>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <Avatar className="w-8 h-8 rounded-full" src="https://i.ibb.co/cgfPBvk/user.png" alt="User" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Normanhalestar
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            normanhale@example.com
                                        </p>
                                        <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            19 May 2023
                                        </div>
                                        <div className="h-1"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </Link>
                        </li>

                    </ul>

                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flex items-center justify-center gap-8 mt-8">
                        <IconButton size="sm" variant="outlined" onClick={goToPreviousPage} disabled={currentPage === 1}>
                            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                        </IconButton>

                        <Typography color="gray" className="font-normal">
                            Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
                            <strong className="text-gray-900">10</strong>
                        </Typography>

                        <IconButton size="sm" variant="outlined" onClick={goToNextPage} disabled={currentPage === 10}>
                            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                        </IconButton>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
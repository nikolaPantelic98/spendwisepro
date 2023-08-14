import {
    Card,
    CardBody,
    Typography,
    Button, ListItem, Avatar,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function UsersCard() {

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Last Users
                    <Link>
                        <Button size="sm" variant="text" className="flex gap-2" color="green">
                            View All
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
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
                </div>
            </CardBody>
        </Card>
    );
}
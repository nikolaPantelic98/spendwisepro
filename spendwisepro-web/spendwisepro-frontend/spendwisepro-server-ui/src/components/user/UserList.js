import {
    Card,
    CardBody,
    Typography,
    ListItem, Avatar, IconButton, Button, Input, Popover, PopoverHandler, PopoverContent, List, ListItemPrefix,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid";

export default function UserList() {

    const [searchEmail, setSearchEmail] = React.useState("");
    const handleEmailChange = ({ target }) => setSearchEmail(target.value);

    const [currentPage, setCurrentPage] = React.useState(1);

    const goToNextPage = () => {
        if (currentPage === 10) return;

        setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage === 1) return;

        setCurrentPage(currentPage - 1);
    };

    const [userList, setUserList] = React.useState([
        {
            id: 1,
            username: "Williebass97",
            email: "williebass@example.com",
            date: "18 July 2023",
            isIconActive: true,
        },
        {
            id: 2,
            username: "Dennismyers0000",
            email: "dennismyers@example.com",
            date: "03 July 2023",
            isIconActive: true,
        },
        {
            id: 3,
            username: "Opalcastro",
            email: "opencastro@example.com",
            date: "20 June 2023",
            isIconActive: true,
        },
        {
            id: 4,
            username: "Normanhalestar",
            email: "normanhale@example.com",
            date: "19 May 2023",
            isIconActive: true,
        },
    ]);

    const handleIconClick = (userId) => {
        setUserList((prevUserList) =>
            prevUserList.map((user) =>
                user.id === userId ? { ...user, isIconActive: !user.isIconActive } : user
            )
        );
    };

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
                        {userList.map((user) => (
                            <Popover
                                key={user.id}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                }}
                            >
                                <li className="py-3 sm:py-4">
                                    <PopoverHandler>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                            <div className="flex-shrink-0">
                                                <Avatar className="w-8 h-8 rounded-full" src="https://i.ibb.co/cgfPBvk/user.png" alt="User" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-1"></div>
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {user.username}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                                <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {user.date}
                                                </div>
                                                <div className="h-1"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </PopoverHandler>

                                    <PopoverContent className="w-72 border-1 bg-green-100 rounded-xl">
                                        <div className="mb-4 flex items-center gap-4 pb-1">
                                            <Avatar src="https://i.ibb.co/cgfPBvk/user.png" alt="user" />
                                            <div>
                                                <Typography variant="h6" color="blue-gray">
                                                    {user.username}
                                                </Typography>
                                                <Typography variant="small" color="gray" className="font-normal">
                                                    {user.email}
                                                </Typography>
                                            </div>
                                        </div>
                                        <List className="p-0">
                                            <a href="#" className="text-initial">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 448 512"
                                                            fill="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </ListItemPrefix>
                                                    {user.date}
                                                </ListItem>
                                            </a>
                                            <hr className="my-2 border-blue-gray-50" />
                                            <div className=" flex items-center justify-between">
                                                <Button
                                                    size="sm"
                                                    variant="text"
                                                    className="flex gap-2"
                                                    color="blue"
                                                    onClick={() => handleIconClick(user.id)}
                                                >
                                                    <CheckCircleIcon
                                                        className={`h-6 w-6 cursor-pointer ${
                                                            user.isIconActive ? 'text-green-500' : 'text-gray-700'
                                                        }`}
                                                    />
                                                </Button>
                                                <Button size="sm" variant="text" className="flex gap-2" color="blue">
                                                    <PencilSquareIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
                                                </Button>
                                                <Button size="sm" variant="text" className="flex gap-2" color="blue">
                                                    <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                                                </Button>
                                            </div>
                                        </List>
                                    </PopoverContent>
                                </li>
                            </Popover>
                        ))}
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
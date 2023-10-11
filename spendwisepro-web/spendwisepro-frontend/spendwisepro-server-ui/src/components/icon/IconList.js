import {
    Card,
    CardBody,
    Typography,
    Button, ListItem, Avatar, PopoverHandler, Popover, List, ListItemPrefix, PopoverContent,
} from "@material-tailwind/react";
import {ArrowLongRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {TrashIcon} from "@heroicons/react/20/solid";
import axios from "axios";

export default function IconList() {

    const [icons, setIcons] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8080/spendwisepro_admin/icons/all', { headers })
            .then(response => {
                setIcons(response.data);
            })
            .catch(error => console.error('Error fetching icons:', error));
    }, []);

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    All Icons
                    <Link to="/add_icon" onClick={storeScrollPosition}>
                        <Button size="sm" variant="text" className="flex gap-2" color="blue">
                            Add icon
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
                </Typography>
                <hr className="my-2 border-blue-gray-50" />

                <div>
                    <ul role="list" className="divide-y divide-gray-200 flex flex-wrap gap-4 justify-center">

                        {icons.map(categoryIcon => (
                            <Popover
                                key={categoryIcon.id}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                }}
                            >
                                <li className="py-3 sm:py-4 flex-0 w-1/5">
                                    <PopoverHandler>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                            <div className="flex-shrink-0">
                                                <Avatar className="w-8 h-8 rounded-full" src={categoryIcon.iconPath} alt={categoryIcon.icon} />
                                            </div>
                                        </ListItem>
                                    </PopoverHandler>

                                    <PopoverContent className="w-72 border-1 bg-green-100 rounded-xl">
                                        <div className="mb-4 flex justify-center items-center gap-4 pb-1">
                                            <Avatar src={categoryIcon.iconPath} alt={categoryIcon.icon} />
                                        </div>
                                        <List className="p-0">
                                            <hr className="my-2 border-blue-gray-50" />
                                            <div className="flex justify-end mr-2">
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
                </div>
            </CardBody>
        </Card>
    );
}
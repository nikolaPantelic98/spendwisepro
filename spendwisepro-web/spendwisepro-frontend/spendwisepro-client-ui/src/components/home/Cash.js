import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Cash() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <div>
                    <Typography variant="h6" color="blue-gray" className="mb-2 flex items-center justify-between">
                        <span className="mb-2">Cash</span>
                        <CurrencyEuroIcon className="text-green-700 w-6 h-6 mb-2" />
                    </Typography>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-4" />

                <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900 truncate">
                        TODAY
                    </p>
                    <Typography variant="h4" className="text-gray-900">
                        $700,00
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <a className="inline-block">
                    <Button size="sm" variant="text" className="flex items-center gap-1">
                        Show More
                        <ArrowLongRightIcon strokeWidth={2} className="w-3 h-3" />
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
}
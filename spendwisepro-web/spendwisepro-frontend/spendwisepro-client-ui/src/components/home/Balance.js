import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function Balance() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <CurrencyDollarIcon className="text-green-700 w-12 h-12 mb-4" />
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Balance
                </Typography>
                <Typography variant="h2" className="text-gray-900">
                    $1.000,00
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <a className="inline-block">
                    <Button size="sm" variant="text" className="flex items-center gap-2">
                        Show More
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
}
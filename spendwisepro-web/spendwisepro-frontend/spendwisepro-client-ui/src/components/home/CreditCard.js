import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function CreditCard() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <CreditCardIcon className="text-green-700 w-8 h-8 mb-2" />
                <Typography variant="h6" color="blue-gray" className="mb-2">
                    Credit card
                </Typography>
                <Typography variant="h4" className="text-gray-900">
                    $300,00
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
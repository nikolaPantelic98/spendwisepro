import React from "react";
import { Button, Card, CardFooter } from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const PageWidthLayout = () => {
    return (
        <div className="flex gap-4 mt-8 mx-6">
            <div className="w-1/2">
                <Card className="w-full bg-transparent shadow-none">
                    <CardFooter className="pt-0">
                        <Button size="sm" variant="text" className="flex items-center gap-2 text-transparent" disabled>
                            Show More
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4 text-transparent" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="w-1/2">
                <Card className="w-full bg-transparent shadow-none">
                    <CardFooter className="pt-0">
                        <Button size="sm" variant="text" className="flex items-center gap-2 text-transparent" disabled>
                            Show More
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default PageWidthLayout;
import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function CreditCardNote({ setNote, initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_credit_card' : `/edit_credit_card/${id}`;

    const [contentNote, setContentNote] = React.useState(initialValue);

    useEffect(() => {
        setNote(initialValue);
    }, [initialValue]);

    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={() => navigate('/credit_cards/note', { state: { note: contentNote, from: navigateTo } })}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/190/190703.png" alt="Note" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Note
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${initialValue !== "" ? 'font-bold text-gray-500 truncate' : ''}`}>
                            {contentNote ? (contentNote.length > 20 ? contentNote.substring(0, 17) + "..." : contentNote) : "Type"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
        </li>
    );
}
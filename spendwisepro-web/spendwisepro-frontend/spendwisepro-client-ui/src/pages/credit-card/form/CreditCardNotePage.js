import React, {useEffect, useRef, useState} from 'react';
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setCreditCardNote} from "../../../redux/creditCardSlice";

function CreditCardNotePage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const note = useSelector((state) => state.creditCard.note);
    const [textAreaValueNote, setTextAreaValueNote] = useState(note);
    const textAreaRefNote = useRef(null);
    const from = location.state?.from || '/add_credit_card';

    useEffect(() => {
        const textAreaNote = document.getElementById('textAreaNote');
        textAreaNote.style.height = 'auto';
        textAreaNote.style.height = textAreaNote.scrollHeight + 'px';
    }, [textAreaValueNote]);

    useEffect(() => {
        const textAreaNote = textAreaRefNote.current;
        textAreaNote.focus();
        textAreaNote.selectionStart = textAreaNote.selectionEnd = textAreaNote.value.length;
    }, [textAreaValueNote]);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await dispatch(setCreditCardNote(textAreaValueNote));
            navigate(from);
        }
    };

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title={from === '/add_credit_card' ? "Add credit card" : "Edit credit card"} resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mt-2">

                        <div className="mx-6">
                            <div className="mt-8 text-center">
                                <Card className="w-full shadow-lg">
                                    <CardBody>
                                        <Typography variant="h6" className="text-gray-800">
                                            Add Note
                                        </Typography>
                                        <div className="h-4"></div>
                                        <textarea id="textAreaNote" ref={textAreaRefNote}
                                                  className="resize-none focus:outline-none mx-auto text-center"
                                                  value={textAreaValueNote}
                                                  onChange={(e) => setTextAreaValueNote(e.target.value)}
                                                  onKeyDown={handleKeyDown} />
                                    </CardBody>

                                    <div className="mb-6 mx-6">
                                        <div className="flex justify-center items-center">
                                            <Button className="w-full" variant="gradient" color="green"
                                                    onClick={async () => {
                                                        await dispatch(setCreditCardNote(textAreaValueNote));
                                                        navigate(from, { state: { note: textAreaValueNote } });
                                                    }}>
                                                <span>Confirm</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default CreditCardNotePage;
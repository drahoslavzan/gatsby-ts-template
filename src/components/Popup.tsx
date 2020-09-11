import * as React from 'react';

export interface PopupProps {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Popup(props: PopupProps) {
    return !props.open ? null : (
        <div className="topmost fixed w-screen h-screen top-0 left-0 flex items-center justify-center">
            <div onClick={props.onClose} className="absolute w-full h-full bg-gray-900 opacity-50"/>
            <div className="bg-white mx-auto rounded-lg shadow-lg z-50">
                <div className="py-4 text-left px-6 bg-black text-white text-center rounded-t-lg">
                    <h3 className="text-2xl font-bold">{props.title}</h3>
                </div>
                <div className="w-full">
                    {props.children}
                </div> 
            </div>
        </div>
	);
}
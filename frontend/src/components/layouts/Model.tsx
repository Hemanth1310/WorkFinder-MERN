import React from 'react'
import { createPortal } from 'react-dom';

type Props = {
    isOpen: boolean;
    onClose:()=>void;
    title:string;
    children: React.ReactNode;
}

const Model = ({isOpen,onClose,title,children}: Props) => {
    if(!isOpen){
        return
    }
    
    const modalRoot  = document.getElementById('modal-root')
    const modalContent = (
    <div className='fixed bg-gray-500/50 inset-0 flex items-center justify-center z-100 p-5 font-mono' onClick={onClose}>
        <div className='bg-mist-50 p-5 rounded-md min-w-1/3 flex flex-col items-center gap-2' onClick={(e)=>e.stopPropagation()}>
            <div className='w-full flex items-center justify-between '>
                 <p className='text-2xl'>{title}</p>
                <button
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
           
             <div className="w-full h-0.5  bg-mist-200"></div>
             {children}
        </div>
       
    </div>)
    return createPortal(modalContent,modalRoot)
}

export default Model
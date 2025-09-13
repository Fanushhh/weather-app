import { useEffect, useRef, useState } from "react";

export const useIsOpen = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);
        const containerRef = useRef(null);
        const closeBtnRef = useRef(null);
        useEffect(() => {
            if(!containerRef.current || !closeBtnRef.current) return;
            const handleClickOutside = (event) => {
                if(!containerRef.current.contains(event.target) && !closeBtnRef.current.contains(event.target)){
                    setIsOpen(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
    
        }, [])
        useEffect(() => {
            function handleEscape(event){
                if(event.key === 'Escape'){
                    setIsOpen(false);
                }
            }
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
            }
        },[])
        return { isOpen, setIsOpen, containerRef,closeBtnRef}

}
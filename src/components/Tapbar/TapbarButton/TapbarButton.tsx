import { FC, ReactNode, useEffect, useRef } from "react";
import s from './TapbarButton.module.css';

interface TapbarButtonProps {
    children: ReactNode,
};

export const TapbarButton: FC<TapbarButtonProps> = ({ children }) => {
    const wrapperRef = useRef<HTMLDivElement>(null!);

    const handleClick = () => wrapperRef.current.classList.add(s.animate);

    useEffect(() => {
        const handleTransitionEnd = (e: TransitionEvent) => {
            if (e.pseudoElement) wrapperRef.current.classList.remove(s.animate);
        };

        wrapperRef.current.addEventListener('transitionend', handleTransitionEnd);
        return () => wrapperRef.current.removeEventListener('transitionend', handleTransitionEnd);
    }, []);

    return (
        <div
            ref={wrapperRef}
            onClick={handleClick}
            className={s.tapbarWrapper}>
            {children}
        </div>
    );
};
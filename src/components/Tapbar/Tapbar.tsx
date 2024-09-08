import { FC, useEffect, useRef, useState } from "react";
import { ShareButton } from "./ShareButton/ShareButton";
import { ScrollButton } from "./ScrollButton/ScrollButton";
import { CommentButton } from "./CommentButton/CommentButton";
import { LikeButton } from "./LikeButton/LikeButton";
import s from './Tapbar.module.css';
import { TapbarButton } from "./TapbarButton/TapbarButton";

interface TapbarButton {
    name: string,
    Component: FC,
};

const buttons: TapbarButton[] = [
    {
        name: 'share',
        Component: ShareButton,
    }, {
        name: 'scrollTop',
        Component: ScrollButton,
    }, {
        name: 'comment',
        Component: CommentButton,
    }, {
        name: 'like',
        Component: LikeButton,
    },
];

export const Tapbar: FC = () => {
    const [lastScroll, setLastScroll] = useState(scrollY);
    const [isHidden, setIsHidden] = useState(false);

    const tapbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => setLastScroll(scrollY), []);

    useEffect(() => {
        let timerId: number;

        const handleScrollEnd = () => {
            setLastScroll(scrollY);
        };

        const handleScroll = () => {
            if (Math.abs(scrollY - lastScroll) > 200) setLastScroll(scrollY);
            if (scrollY - lastScroll > 200) setIsHidden(true);
            else if (scrollY <= lastScroll) setIsHidden(false);
        };

        if (isHidden) timerId = setTimeout(() => setIsHidden(false), 1000);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scrollend', handleScrollEnd);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scrollend', handleScrollEnd);
            clearTimeout(timerId);
        };
    }, [isHidden, lastScroll]);

    return (
        <div ref={tapbarRef} className={`${s.tapbar} ${isHidden ? s.hidden : ''}`}>
            <div className="container">
                <div className={s.inner}>
                    {
                        buttons.map(({ name, Component }) => (
                            <TapbarButton key={name}>
                                <Component />
                            </TapbarButton>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
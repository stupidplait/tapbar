import { FC } from "react";
import s from './Header.module.css';

export const Header: FC = () => {
    return (
        <header>
            <div className="container">
                <div className={s.inner}>
                    <a href="./" className={s.logo}><img src="/logo.png" alt="INMYROOM" /></a>
                </div>
            </div>
        </header>
    );
}
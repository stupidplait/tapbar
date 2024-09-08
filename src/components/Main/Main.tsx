import { FC } from "react";
import s from './Main.module.css';

export const Main: FC = () => {
    return (
        <main className={s.content}>
            {
                Array.from({ length: 5 }, (_, i) => (
                    <section key={i} className={s.block}>
                        <div className="container">
                            <div className={s.inner}>{i + 1}</div>
                        </div>
                    </section>
                ))
            }
        </main>
    );
};
import * as React from "react";
import { Helmet } from "react-helmet";
import { analytics, AnalyticsContext } from "../utils/analytics";
import { css } from '@emotion/react';
import NavBar, { navbarHeight } from '../components/NavBar';
import Footer, { footerHeight } from '../components/Footer';
import "../css/tailwind.css";

export interface LayoutProps {
    location: any;
    pageContext: any;
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <AnalyticsContext.Provider value={analytics}>
            <div className='w-full h-full'>
                <Helmet>
                    <link rel="icon" type={`image/${'PNG'}`} href={'/PATH'} />
                </Helmet>
                <NavBar />
                <main
                    css={css`
                        padding-top: ${navbarHeight};
                        min-height: calc(100vh - ${footerHeight});
                    `}
                    className='w-full'
                >
                    {children}
                </main>
                <Footer />
            </div>
        </AnalyticsContext.Provider>
    );
}
import * as React from 'react';
import { css } from '@emotion/react';
import { FaBars as Bars } from 'react-icons/fa';
import { AnchorLink as Link } from "gatsby-plugin-anchor-links";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    function handleMenuClose() {
        setMenuOpen(false);
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleMenuClose, { passive: true })
        return () => window.removeEventListener('scroll', handleMenuClose);
    });

    return (
        <header
            css={css`
                height: ${navbarHeight};
            `}
            className="mt-0 fixed w-full z-10 top-0 bg-black text-white"
        >
            <div className='p-2 h-full flex items-center'>
                <div className="w-12 justify-start">
                </div>
                <div onClick={handleMenuClose}>
                    <Link className="justify-start ml-3 text-lg font-bold" to='/'>{'TODO'}</Link>
                </div>
                <div className="flex-1 hidden md:inline-flex">
                </div>
                <div className="flex flex-1 inline-flex md:hidden">
                    <div className="flex-1" />
                    <button onClick={() => setMenuOpen(!menuOpen)} className="mx-2 px-4 py-2 uppercase border hover:font-bold inline-flex items-center focus:outline-none">
                        <Bars className="mr-2" />
                        {"MMMMM"}
                    </button>
                </div>
            </div>
        </header>
    );
}

export const navbarHeight = '4rem';
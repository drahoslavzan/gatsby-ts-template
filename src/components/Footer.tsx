import * as React from 'react';
import { css } from '@emotion/react';

export const footerHeight = "4rem";

export default function Footer() {
    const companyName= 'TODO';

    return (
        <footer
            css={css`
                height: ${footerHeight};
            `}
            className="flex w-full bg-black text-white justify-center items-center"
        >
            <div className="text-center">Copyright &copy; {new Date().getFullYear()} {companyName}</div>
        </footer>
    );
}
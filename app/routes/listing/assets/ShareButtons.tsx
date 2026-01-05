import React from 'react'
import { BsLine } from 'react-icons/bs';
import { CgFacebook } from 'react-icons/cg';
import { FaDivide } from 'react-icons/fa';
import { RxDividerVertical } from "react-icons/rx";
import { generateRandom10DigitNumber } from '~/lib/lib';

const ShareButtons = ({ url, title }: { url: string; title: string }) => {
    // Encode the URL and title for the share links
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const randomNo = generateRandom10DigitNumber()


    // Standard share URLs
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}?v=${randomNo}&text=${encodedTitle}`;

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}?v=${randomNo}&quote=${encodedTitle}`;

    return (
        <div className="flex gap-4">
            {/* Twitter (X) Share Button */}
            <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex place-items-center place-content-center text-white  rounded-lg bg-gradient-to-b from-[#629deb] to-blue-600 transition-colors text-3xl border hover:text-white pl-4 pr-4 py-1 border-[#629deb]`}
            >
                <TwitterIcon />
                <RxDividerVertical />
                <span className={`text-lg`}>Share</span>
            </a>

            {/* Facebook Share Button */}
            <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex place-items-center place-content-center text-[#166FE5] hover:bg-white rounded-lg bg-[#166FE5]/5 transition-colors text-3xl border border-blue-800 hover:text-[#166FE5] pl-2 pr-4`}
            >
                <CgFacebook />
                <span className={`text-lg`}>Facebook</span>
            </a>
        </div>
    );
}


// Simple SVG Icons (or use from a library like react-icons)
function TwitterIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

export default ShareButtons

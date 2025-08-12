import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/img/iconrun.png"  // Ganti dengan path logo kamu
            alt="App Logo"
        />
    );
}

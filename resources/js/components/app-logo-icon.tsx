import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/img/yhwach.jpg"  // Ganti dengan path logo kamu
            alt="App Logo"
        />
    );
}

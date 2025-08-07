import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            {/* Logo lebih besar */}
            <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-8 fill-current text-white dark:text-black" />
            </div>

            {/* Teks lebih besar */}
            <div className="ml-3 grid flex-1 text-left">
                <span className="truncate leading-tight font-bold text-lg">
                    Laravel Starter Kit
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    React + Inertia
                </span>
            </div>
        </>
    );
}

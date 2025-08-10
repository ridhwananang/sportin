import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-6">
                <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                    
                    {/* KIRI: FORM LOGIN */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-10 md:px-16 bg-white">
                        <div className="max-w-md w-full">
                            <h1 className="text-3xl font-bold text-center mb-2 text-red-600">
                                WELCOME BACK
                            </h1>
                            <p className="text-gray-600 text-center mb-8">
                                Welcome back! Please enter your details.
                            </p>

                            <form className="space-y-5" onSubmit={submit}>
                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your email"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={route('password.request')}
                                                className="text-sm text-gray-500 hover:text-gray-700"
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Remember me */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            checked={data.remember}
                                            onClick={() => setData('remember', !data.remember)}
                                        />
                                        <Label htmlFor="remember" className="text-sm text-gray-600">
                                            Remember me
                                        </Label>
                                    </div>
                                </div>

                                {/* Tombol Sign in */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg font-semibold"
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    Sign in
                                </Button>

                                {/* Tombol Sign in Google */}
                                <button
    type="button"
    onClick={() => window.location.href = route('google.login')}
    className="w-full flex items-center text-gray-600 justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
>
    <img src="/img/google.png" alt="Google" className="w-5 h-5 mr-2" />
    Sign in with Google
</button>

                            </form>

                            {/* Register Link */}
                            <p className="text-center text-sm text-gray-500 mt-6">
                                Don’t have an account?{' '}
                                <TextLink href={route('register')} className="text-red-500 font-medium">
                                    Sign up to free!
                                </TextLink>
                            </p>

                            {status && (
                                <div className="mt-4 text-center text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* KANAN: GAMBAR ILUSTRASI (Hanya muncul di tablet & desktop) */}
                    <div className="hidden md:flex w-full lg:w-1/2 bg-gray-50 items-center justify-center p-6 lg:p-0">
                        <img
                            src="/img/login.png"
                            alt="Illustration"
                            className="max-w-md lg:max-w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

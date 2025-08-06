import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    username: string;
    email: string;
    contact: string;
    address: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        username: '',
        email: '',
        contact: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 p-4 md:p-6">
                <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* KIRI: FORM REGISTER */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12 md:px-14">
                        <div className="w-full max-w-md">
                            <h1 className="text-3xl font-bold text-center mb-2 font-poppins text-gray-900">
                                Create an Account
                            </h1>
                            <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
                                Enter your details below to create your account.
                            </p>

                            <form className="space-y-5" onSubmit={submit}>
                                {/* Full Name */}
                                <div>
                                    <Label htmlFor="name" className="text-gray-900">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="John Doe"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Username */}
                                <div>
                                    <Label htmlFor="username" className="text-gray-900">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        required
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        disabled={processing}
                                        placeholder="john123"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.username} />
                                </div>

                                {/* Email */}
                                <div>
                                    <Label htmlFor="email" className="text-gray-900">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Contact */}
                                <div>
                                    <Label htmlFor="contact" className="text-gray-900">Contact</Label>
                                    <Input
                                        id="contact"
                                        type="text"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        disabled={processing}
                                        placeholder="08xxxxxxxxxx"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.contact} />
                                </div>

                                {/* Address */}
                                <div>
                                    <Label htmlFor="address" className="text-gray-900">Address</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        disabled={processing}
                                        placeholder="Your address"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                {/* Password */}
                                <div>
                                    <Label htmlFor="password" className="text-gray-900">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="Password"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <Label htmlFor="password_confirmation" className="text-gray-900">Confirm Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirmation Password"
                                        className="mt-1 text-gray-950"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg font-semibold"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    Create Account
                                </Button>

                                {/* Login Link */}
                                <p className="text-center text-sm text-gray-500 mt-6">
                                    Already have an account?{' '}
                                    <TextLink href={route('login')} className="text-red-500 font-medium">
                                        Sign in
                                    </TextLink>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* KANAN: GAMBAR ILUSTRASI */}
                   <div className="hidden md:flex w-full md:w-1/2 relative">
                        <img
                            src="/img/login.png"
                            alt="Register Illustration"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0" /> {/* Overlay opsional */}
                    </div>
                </div>
            </div>
        </>
    );
}

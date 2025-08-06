import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/img/stadium.jpg')" }}
        >
            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Card Form Mengambang */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 mx-4">
                <Head title="Forgot Password" />
                <h1 className="text-2xl text-red-600 md:text-3xl font-bold text-center mb-2 font-poppins">
                    Forgot Password
                </h1>
                <p className="text-gray-600 text-center mb-6 font-inter text-sm md:text-base">
                    Enter your email to receive a password reset link.
                </p>

                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form className="space-y-5" onSubmit={submit}>
                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-red-600">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className='text-gray-950'
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Tombol Kirim */}
                    <Button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Email password reset link
                    </Button>
                </form>

                {/* Link Kembali */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Or, return to{' '}
                    <TextLink href={route('login')} className="text-red-500 font-medium">
                        Log in
                    </TextLink>
                </p>
            </div>
        </div>
    );
}

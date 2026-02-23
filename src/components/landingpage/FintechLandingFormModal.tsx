import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

/* ── Types ─────────────────────────── */
export type FormVariant = 'license' | 'demo';

interface FintechLandingFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    variant: FormVariant;
    /** The email address that receives the lead. Passed from the parent page. */
    mailTo: string;
    onSuccess?: () => void;
    telegramId: string;
}

interface FormValues {
    name: string;
    phone: string;
    email: string;
    role: 'professional' | 'other';
    telegramId: string;
}

/* ── Config ─────────────────────────── */
const VARIANT_CONFIG: Record<FormVariant, { title: string; description: string; subject: string }> = {
    license: {
        title: 'Build My Platform',
        description: "Share your details and we'll reach out with next steps.",
        subject: 'FinTech Platform — Enquiry',
    },
    demo: {
        title: 'See How I Profit',
        description: "Request a walkthrough and we'll show you the revenue model in action.",
        subject: 'FinTech Platform — Enquiry',
    },
};

const DEFAULT_VALUES: FormValues = {
    name: '',
    phone: '',
    email: '',
    role: 'professional',
    telegramId: '',
};

/* ── Shared field class helpers ────── */
const fieldBase =
    'w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-black text-base';
const fieldNormal = `${fieldBase} border-gray-300`;
const fieldError = `${fieldBase} border-red-500 focus:ring-red-400 focus:border-red-500 bg-red-50`;

/* ── Component ────────────────────── */
const FintechLandingFormModal: React.FC<FintechLandingFormModalProps> = ({
    open,
    onOpenChange,
    variant,
    mailTo,
    onSuccess,
    telegramId,
}) => {
    const config = VARIANT_CONFIG[variant];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: DEFAULT_VALUES,
        mode: 'onChange',
        reValidateMode: 'onBlur',
    });

    useEffect(() => {
        if (!open) reset(DEFAULT_VALUES);
    }, [open, reset]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const body = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nRole: ${data.role === 'professional' ? 'Professional Trader' : 'Other'}\nTelegram ID: ${data.telegramId || 'N/A'}`;

        try {
            const response = await fetch(
                'https://send-mail-redirect-boostmysites.vercel.app/send-email',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: mailTo,
                        subject: `${config.subject} — ${data.name}`,
                        name: 'Boostmysites',
                        body,
                    }),
                }
            );

            if (response.ok) {
                onOpenChange(false);
                onSuccess?.();
                window.location.href = '/thank-you';
            } else {
                throw new Error('Server error');
            }
        } catch {
            toast.error('Something went wrong. Please try again.', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#fff',
                    color: '#1a1a2e',
                    fontWeight: 600,
                    borderRadius: '10px',
                    padding: '14px 20px',
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md max-h-[90dvh] overflow-y-auto bg-white border-gray-200 text-heading rounded-2xl p-5 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
                        {config.title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 text-sm">
                        {config.description}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4" noValidate>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className={errors.name ? fieldError : fieldNormal}
                            {...register('name', {
                                required: 'Name is required',
                                minLength: { value: 2, message: 'At least 2 characters' },
                                maxLength: { value: 60, message: 'At most 60 characters' },
                                pattern: { value: /^[A-Za-z\s'-]+$/, message: 'Letters only' },
                            })}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="+1 234 567 8900"
                            className={errors.phone ? fieldError : fieldNormal}
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: { value: /^\+?[0-9\s\-().]{7,20}$/, message: 'Enter a valid phone number' },
                            })}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={errors.email ? fieldError : fieldNormal}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                            })}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Are you a professional trader? <span className="text-red-500">*</span>
                        </label>
                        <select
                            className={errors.role ? fieldError : `${fieldNormal} bg-white text-gray-900`}
                            {...register('role', { required: 'Please select a role' })}
                        >
                            <option value="professional">Professional trader</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>}
                    </div>

                    {/* Telegram */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telegram ID <span className="text-gray-400 text-xs font-normal">(optional)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="@username or phone"
                            className={errors.telegramId ? fieldError : fieldNormal}
                            {...register('telegramId', {
                                pattern: {
                                    value: /^(@[A-Za-z0-9_]{4,32}|\+?[0-9\s\-().]{7,20})?$/,
                                    message: 'Enter a valid Telegram username or phone number',
                                },
                            })}
                        />
                        {errors.telegramId && <p className="mt-1 text-xs text-red-600">{errors.telegramId.message}</p>}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 space-y-4">
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2.5 rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                            >
                                {isSubmitting ? 'Submitting…' : 'Submit'}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <span className="flex-1 border-t border-gray-200" />
                            <span className="text-sm text-gray-500 font-medium">or</span>
                            <span className="flex-1 border-t border-gray-200" />
                        </div>

                        {/* Telegram CTA */}
                        <a
                            href={`https://t.me/${telegramId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full py-3 rounded-lg border-2 border-[#0088cc] text-[#0088cc] font-semibold hover:bg-[#0088cc] hover:text-white transition-colors text-sm"
                        >
                            Text us on Telegram
                        </a>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FintechLandingFormModal;

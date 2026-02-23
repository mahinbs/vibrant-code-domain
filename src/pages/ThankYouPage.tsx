import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // GTM conversion event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submission_success',
        page_title: 'Thank You — Form Submitted Successfully',
        page_location: window.location.href,
      });
    }

    // Auto-redirect after 10s
    const timer = setTimeout(() => navigate(-1), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans">
      <Helmet>
        <title>Thank You | Boostmysites</title>
        <meta name="description" content="Thank you for reaching out! We will get back to you shortly." />
      </Helmet>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[90px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(6,182,212,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Success icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.3)] animate-pulse">
            <CheckCircle className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
          You're All Set!
        </h1>

        <p className="text-xl font-medium text-gray-300 mb-3">
          Thank you for reaching out.
        </p>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10">
          We've received your details and will get back to you shortly on WhatsApp or email.
          Keep an eye out — we move fast.
        </p>

        {/* Confirmation tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            '✓ Application received',
            '✓ Team notified',
            '✓ Response within 24 hrs',
          ].map((tag) => (
            <span
              key={tag}
              className="text-sm text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Back CTA */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-6 py-3 transition-all hover:bg-white/5 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <p className="text-gray-600 text-xs mt-8">
          You will be redirected to the previous page automatically in a few seconds.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;

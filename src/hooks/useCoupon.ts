import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Coupon {
  id: string;
  code: string;
  email: string;
  created_at: string;
  expires_at: string;
  used_at: string | null;
  is_used: boolean;
  discount_amount: number;
  discount_type: string;
}

interface UseCouponReturn {
  coupon: Coupon | null;
  loading: boolean;
  error: string | null;
  generateCoupon: (email: string) => Promise<void>;
  copyCouponCode: () => Promise<void>;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null;
}

export const useCoupon = (): UseCouponReturn => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const { toast } = useToast();

  const generateCoupon = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('generate-coupon', {
        body: { email }
      });

      if (error) throw error;

      if (data.success) {
        setCoupon(data.coupon);
        toast({
          title: "Success!",
          description: data.message,
        });
      } else {
        throw new Error(data.error || 'Failed to generate coupon');
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCouponCode = async () => {
    if (!coupon) return;

    try {
      await navigator.clipboard.writeText(coupon.code);
      toast({
        title: "Copied!",
        description: "Coupon code copied to clipboard",
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = coupon.code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Copied!",
        description: "Coupon code copied to clipboard",
      });
    }
  };

  // Calculate time remaining until expiry
  useEffect(() => {
    if (!coupon) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(coupon.expires_at).getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining(null);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [coupon]);

  return {
    coupon,
    loading,
    error,
    generateCoupon,
    copyCouponCode,
    timeRemaining,
  };
};
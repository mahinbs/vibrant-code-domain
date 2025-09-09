import { useState, useEffect } from 'react';

interface CurrencyData {
  currency: 'USD' | 'INR';
  symbol: string;
  isIndia: boolean;
}

const USD_TO_INR_RATE = 84; // Approximate conversion rate

export const useGeoCurrency = (): CurrencyData & {
  convertPrice: (usdPrice: number) => { amount: number; formatted: string };
  formatCurrency: (amount: number, currency?: 'USD' | 'INR') => string;
} => {
  const [currencyData, setCurrencyData] = useState<CurrencyData>({
    currency: 'USD',
    symbol: '$',
    isIndia: false,
  });

  useEffect(() => {
    const detectIndianUser = async () => {
      try {
        // First try timezone detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isIndianTimezone = timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta';
        
        // Try to detect India from other indicators if timezone is not conclusive
        let isIndia = isIndianTimezone;
        
        // Fallback: Check user agent locale
        if (!isIndia) {
          const locale = navigator.language || navigator.languages?.[0] || '';
          isIndia = locale.includes('IN') || locale.includes('hi');
        }

        setCurrencyData({
          currency: isIndia ? 'INR' : 'USD',
          symbol: isIndia ? '₹' : '$',
          isIndia,
        });
      } catch (error) {
        console.error('Error detecting user location:', error);
        // Default to USD on error
        setCurrencyData({
          currency: 'USD',
          symbol: '$',
          isIndia: false,
        });
      }
    };

    detectIndianUser();
  }, []);

  const convertPrice = (usdPrice: number) => {
    if (currencyData.currency === 'USD') {
      return {
        amount: usdPrice,
        formatted: `$${usdPrice.toLocaleString('en-US')}`
      };
    }

    const inrAmount = Math.round(usdPrice * USD_TO_INR_RATE);
    return {
      amount: inrAmount,
      formatted: `₹${inrAmount.toLocaleString('en-IN')}`
    };
  };

  const formatCurrency = (amount: number, currency = currencyData.currency) => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString('en-US')}`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return {
    ...currencyData,
    convertPrice,
    formatCurrency,
  };
};
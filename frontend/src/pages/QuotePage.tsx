import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface Quote {
  content: string;
  author: string;
}

function QuotePage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
      setCountdown(10);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchQuote();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative">
      <div className="max-w-3xl text-center space-y-6 p-8 rounded-xl bg-white/5 backdrop-blur-sm">
        <blockquote className="text-3xl font-serif italic">
          "{quote?.content}"
        </blockquote>
        <p className="text-xl text-gray-300">— {quote?.author}</p>
      </div>
      <div className="absolute bottom-8 text-2xl font-mono">
        {countdown}s
      </div>
    </div>
  );
}

export default QuotePage;
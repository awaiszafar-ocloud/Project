import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { RefreshCw } from 'lucide-react';

const successMessages = [
  "Server's feeling groovy! 🕺",
  "All systems go, captain! 🚀",
  "Server's running smoother than a jazz solo! 🎷",
  "Backend's doing the happy dance! 💃",
];

const errorMessages = [
  "Server took a coffee break without permission! ☕",
  "Backend's playing hide and seek... and winning! 🙈",
  "Server needs a hug... and a restart! 🤗",
  "404: Server's sense of responsibility not found! 😅",
];

function HealthCheckPage() {
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState<string>('');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = async () => {
    try {
      await axios.get('http://localhost:3000/api/health');
      setStatus('success');
      setMessage(successMessages[Math.floor(Math.random() * successMessages.length)]);
    } catch (error) {
      setStatus('error');
      setMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
    }
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <div 
          className={`text-6xl ${
            status === 'success' ? 'text-green-400' : 
            status === 'error' ? 'text-red-400' : 
            'text-gray-400'
          }`}
        >
          {status === 'success' ? '✨' : '💥'}
        </div>
        
        <p className="text-2xl font-medium">{message}</p>
        
        <button
          onClick={checkHealth}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw size={20} />
          Check Again
        </button>
      </div>
      
      {lastChecked && (
        <div className="absolute bottom-8 left-8 text-sm text-gray-400">
          Last checked: {format(lastChecked, 'HH:mm:ss')}
        </div>
      )}
    </div>
  );
}

export default HealthCheckPage;
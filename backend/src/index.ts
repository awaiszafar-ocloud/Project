import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(morgan('dev'));

app.get("/", (req, res) => {
    try {
      return res.status(200).json({message: "Server is running"})
    } catch (error) {
      return res.status(400).json({message: "Server is down"})
    }
})

app.get('/api', (req, res) => {
  return res.json({ message: 'Hello from Express!' });
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({message: "Service is up and running"})
})

const server = app.listen(PORT, '0.0.0.0', () => { // <-- Add 0.0.0.0
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

// Graceful shutdown logic
async function gracefulShutdown() {
    console.log('\nServer Shutdown initiated...');
    
    // 1. Close HTTP server
    server.close(async () => {
      console.log('HTTP server closed');
            
      process.exit(0);
    });
  
    // Force shutdown after 5 seconds
    setTimeout(() => {
      console.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 5000);
  }

// Handle signals
process.on('SIGINT', gracefulShutdown);  // CTRL+C
process.on('SIGTERM', gracefulShutdown); // Docker stop

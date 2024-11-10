import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Include methods like DELETE and PUT
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true,  // Continue preflight requests
  optionsSuccessStatus: 204, // Successful OPTIONS response for legacy browsers
};

export default cors(corsOptions);

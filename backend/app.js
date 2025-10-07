require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173", // local dev
    "https://employee-application-client.vercel.app",
    "https://employee-application-client-git-master-elvis-lazars-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.get('/', (req, res) => res.send('Employee API running'));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

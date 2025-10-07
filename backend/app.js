require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(express.json());

// ✅ Configure CORS properly
app.use(cors({
  origin: [
    "https://employee-application-client.vercel.app",
    "https://employee-application-client-git-master-elvis-lazars-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Optional: Handle preflight requests manually for all routes
app.options('*', cors());

connectDB();

app.get('/', (req, res) => res.send('Employee API running'));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

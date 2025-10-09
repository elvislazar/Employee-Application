require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();


app.use(express.json());


const allowedOrigins = [
  "http://localhost:5173", 
  "https://employee-application-client.vercel.app",
  "https://employee-application-client-git-master-elvis-lazars-projects.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


connectDB();


app.get('/', (req, res) => res.send('Employee API running'));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);


module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

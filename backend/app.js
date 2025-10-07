require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// ✅ Allow only your frontend domain
app.use(
  cors({
    origin: "https://employee-application-client-f4hu79lp2-elvis-lazars-projects.vercel.app?_vercel_share=CGkKSJ4R63S3ONiAqunbjSes24EiNjzx",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('Employee API running'));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

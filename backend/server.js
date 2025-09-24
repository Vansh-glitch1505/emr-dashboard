// server.js (safe version)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import patientDemographicsRoutes from "./routes/patientDemographics.js";
import insuranceRoutes from "./routes/insurance.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/patient-demographics', patientDemographicsRoutes);
app.use('/api/insurance', insuranceRoutes);

app.get('/', (req, res) => res.send("Server is running"));

// Start: connect to DB first
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);

      // Safely inspect mounted routes (guarding against undefined shapes)
      try {
        const mounted = [];
        if (app._router && Array.isArray(app._router.stack)) {
          app._router.stack.forEach((layer) => {
            // layer.route is defined for routes like app.get('/path', ...)
            if (layer.route && layer.route.path) {
              mounted.push(`${Object.keys(layer.route.methods).join(',').toUpperCase()} ${layer.route.path}`);
            } else if (layer.name === 'router' && layer.handle && Array.isArray(layer.handle.stack)) {
              // router-level middleware: iterate its stack
              layer.handle.stack.forEach((l) => {
                if (l.route && l.route.path) {
                  mounted.push(`${Object.keys(l.route.methods).join(',').toUpperCase()} ${l.route.path}`);
                }
              });
            }
          });
        }
        if (mounted.length) {
          console.log('Mounted routes:\n', mounted.join('\n'));
        } else {
          console.log('No routes discovered via app._router (this is fine if you only have mounted routers).');
        }
      } catch (err) {
        console.warn('Could not list routes (non-fatal):', err.message);
      }
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB, server not started:', err);
  });

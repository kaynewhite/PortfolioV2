import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Serve images from the client/src/assets/images directory
app.use('/client/src/assets', express.static(path.join(__dirname, '../client/src/assets')));

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Log the contact form submission (in a real app, you'd save to database or send email)
    console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Simulate processing time
    setTimeout(() => {
        res.json({ success: true, message: 'Message received successfully!' });
    }, 1000);
});

// CV download endpoint
app.get('/api/cv/download', (req, res) => {
    const cvPath = path.join(__dirname, '../client/src/assets/Ron_Religioso_CV.txt');
    res.download(cvPath, 'Ron_Religioso_CV.txt', (err) => {
        if (err) {
            console.error('Error downloading CV:', err);
            res.status(404).send('CV not found');
        }
    });
});

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on port ${PORT}`);
});
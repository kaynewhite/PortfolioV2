import express from "express";
import path from "path";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(`To: religiosoron@gmail.com`);
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('=====================================');
    
    // TODO: Implement actual email sending to religiosoron@gmail.com
    // For now, we're logging the contact form data to the console
    
    setTimeout(() => {
        res.json({ success: true, message: 'Message received successfully!' });
    }, 1000);
});

// CV download endpoint
app.get('/api/cv/download', (req, res) => {
    const cvPath = path.join(process.cwd(), 'client/src/assets/Ron_Religioso_CV.txt');
    res.download(cvPath, 'Ron_Religioso_CV.txt', (err) => {
        if (err) {
            console.error('Error downloading CV:', err);
            res.status(404).send('CV not found');
        }
    });
});

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio server running on port ${PORT}`);
});
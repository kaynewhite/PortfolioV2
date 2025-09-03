import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // In Vercel, we need to adjust the path since the structure changes
    const cvPath = path.join(process.cwd(), 'client/src/assets/Ron_Religioso_CV.txt');
    
    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      console.error('CV file not found at:', cvPath);
      res.status(404).json({ error: 'CV not found' });
      return;
    }

    // Read the file
    const fileBuffer = fs.readFileSync(cvPath);
    
    // Set appropriate headers for file download
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="Ron_Religioso_CV.txt"');
    res.setHeader('Content-Length', fileBuffer.length);
    
    // Send the file
    res.status(200).send(fileBuffer);

  } catch (error) {
    console.error('Error downloading CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
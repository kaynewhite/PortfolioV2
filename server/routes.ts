import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { storage } from "./storage";
import puppeteer from "puppeteer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Generate and download CV PDF
  app.get("/api/cv/download", async (req, res) => {
    try {
      const cvHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ron Religioso - CV</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 40px 20px; 
            }
            h1 { 
              color: #2c3e50; 
              border-bottom: 3px solid #3498db; 
              padding-bottom: 10px; 
              margin-bottom: 20px; 
              font-size: 2.5em; 
            }
            h2 { 
              color: #2c3e50; 
              margin-top: 30px; 
              margin-bottom: 15px; 
              font-size: 1.4em; 
              border-left: 4px solid #3498db; 
              padding-left: 10px; 
            }
            h3 { 
              color: #34495e; 
              margin-bottom: 5px; 
              font-size: 1.1em; 
            }
            .contact-info { 
              background: #f8f9fa; 
              padding: 15px; 
              border-radius: 5px; 
              margin-bottom: 20px; 
            }
            .project { 
              margin-bottom: 20px; 
              padding: 15px; 
              border-left: 3px solid #e74c3c; 
              background: #fff; 
            }
            .skills { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
              gap: 10px; 
              margin-bottom: 15px; 
            }
            .skill-category { 
              background: #f8f9fa; 
              padding: 10px; 
              border-radius: 5px; 
            }
            .tech-list { 
              list-style: none; 
              display: flex; 
              flex-wrap: wrap; 
              gap: 8px; 
            }
            .tech-list li { 
              background: #3498db; 
              color: white; 
              padding: 4px 8px; 
              border-radius: 3px; 
              font-size: 0.9em; 
            }
            p { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Ron Religioso</h1>
          
          <div class="contact-info">
            <p><strong>Software Engineer & Developer</strong></p>
            <p>Email: Contact via portfolio website</p>
            <p>Portfolio: Available on Replit</p>
          </div>

          <h2>Professional Summary</h2>
          <p>Passionate software engineer with expertise in web development, desktop applications, and game development. Experienced in multiple programming languages and frameworks, with a strong foundation in object-oriented programming principles.</p>

          <h2>Technical Skills</h2>
          <div class="skills">
            <div class="skill-category">
              <h3>Web Development</h3>
              <ul class="tech-list">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Python Flask</li>
                <li>React</li>
                <li>Express</li>
              </ul>
            </div>
            <div class="skill-category">
              <h3>Desktop Development</h3>
              <ul class="tech-list">
                <li>Java (OOP)</li>
                <li>C# (OOP)</li>
                <li>Windows Forms</li>
              </ul>
            </div>
            <div class="skill-category">
              <h3>Database</h3>
              <ul class="tech-list">
                <li>SQL</li>
                <li>Database Management</li>
              </ul>
            </div>
            <div class="skill-category">
              <h3>Tools & Concepts</h3>
              <ul class="tech-list">
                <li>OOP Principles</li>
                <li>Game Development</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
          </div>

          <h2>Featured Projects</h2>
          
          <div class="project">
            <h3>RecipeHub</h3>
            <p><strong>Technologies:</strong> Python Flask, Web Development</p>
            <p>A full-stack recipe sharing platform featuring user authentication and recipe management. Built with Python Flask backend and responsive frontend design.</p>
          </div>

          <div class="project">
            <h3>Portfolio Website</h3>
            <p><strong>Technologies:</strong> React, Express, Node.js</p>
            <p>Modern portfolio website with responsive design and smooth animations. Features contact form integration and project showcase.</p>
          </div>

          <div class="project">
            <h3>Bomberman Game</h3>
            <p><strong>Technologies:</strong> Java, Game Development</p>
            <p>Classic Bomberman game implementation using Java with OOP principles. Features AI enemies, power-ups, and interactive gameplay.</p>
          </div>

          <div class="project">
            <h3>Platform Game</h3>
            <p><strong>Technologies:</strong> Java, Game Development</p>
            <p>2D platform game with custom physics engine and level progression system. Demonstrates advanced game development concepts.</p>
          </div>

          <div class="project">
            <h3>QR Generator/Reader</h3>
            <p><strong>Technologies:</strong> Java, Windows Forms</p>
            <p>Desktop application for generating and reading QR codes. Built with Java and Windows Forms integration for cross-platform compatibility.</p>
          </div>

          <div class="project">
            <h3>Conway's Game of Life Simulator</h3>
            <p><strong>Technologies:</strong> C#, Simulation</p>
            <p>Interactive simulation of Conway's Game of Life with custom patterns and real-time visualization. Demonstrates understanding of algorithms and UI development.</p>
          </div>

          <div class="project">
            <h3>Student Violation Management System</h3>
            <p><strong>Technologies:</strong> C#, Database Management</p>
            <p>Desktop application for managing student violations with database integration. Features comprehensive CRUD operations and reporting.</p>
          </div>

          <h2>Core Competencies</h2>
          <ul>
            <li>Object-Oriented Programming (Java, C#)</li>
            <li>Web Development (Frontend & Backend)</li>
            <li>Game Development & Physics Programming</li>
            <li>Database Design & Management</li>
            <li>Desktop Application Development</li>
            <li>Problem Solving & Algorithm Implementation</li>
            <li>User Interface Design</li>
            <li>Software Architecture & Design Patterns</li>
          </ul>

          <h2>Education & Learning</h2>
          <p>Self-taught developer with strong foundations in computer science principles, gained through hands-on project development and continuous learning.</p>
        </body>
        </html>
      `;

      
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.setContent(cvHtml);
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
        printBackground: true
      });
      await browser.close();
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Ron_Religioso_CV.pdf"');
      res.send(pdfBuffer);
      
    } catch (error) {
      console.error('CV generation error:', error);
      res.status(500).json({ 
        message: "Failed to generate CV" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

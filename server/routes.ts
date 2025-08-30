import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { storage } from "./storage";
import { readFileSync } from "fs";
import { join } from "path";

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

  // Download CV file
  app.get("/api/cv/download", async (req, res) => {
    try {
      const cvPath = join(process.cwd(), 'client/src/assets/Ron_Religioso_CV.txt');
      const cvContent = readFileSync(cvPath, 'utf8');
      
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment; filename="Ron_Religioso_CV.txt"');
      res.send(cvContent);
      
    } catch (error) {
      console.error('CV download error:', error);
      res.status(500).json({ 
        message: "Failed to download CV" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
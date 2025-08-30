import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail } from "lucide-react";
import type { InsertContact } from "@shared/schema";

export function ContactSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" ref={ref} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4" data-testid="contact-title">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="contact-subtitle">
            Let's collaborate on your next project
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 rounded-xl"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="glass border-border focus:ring-2 focus:ring-primary transition-all"
                  {...form.register("name")}
                  data-testid="input-name"
                />
                {form.formState.errors.name && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-name">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="glass border-border focus:ring-2 focus:ring-primary transition-all"
                  {...form.register("email")}
                  data-testid="input-email"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-email">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Project Discussion"
                className="glass border-border focus:ring-2 focus:ring-primary transition-all"
                {...form.register("subject")}
                data-testid="input-subject"
              />
              {form.formState.errors.subject && (
                <p className="text-destructive text-sm mt-1" data-testid="error-subject">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project..."
                className="glass border-border focus:ring-2 focus:ring-primary transition-all"
                {...form.register("message")}
                data-testid="textarea-message"
              />
              {form.formState.errors.message && (
                <p className="text-destructive text-sm mt-1" data-testid="error-message">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={contactMutation.isPending}
              className="w-full gradient-purple-blue py-3 rounded-lg font-medium hover:scale-105 transition-transform animate-glow"
              data-testid="button-submit"
            >
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={hasIntersected ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 py-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground mb-4 md:mb-0" data-testid="footer-copyright">
              © 2024 Ron Religioso. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-github"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

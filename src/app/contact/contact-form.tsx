"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Validate form data
      contactFormSchema.parse(formValues);
      
      // Clear any existing errors
      setErrors({});
      
      // Submit form
      setIsSubmitting(true);
      
      // Call API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Show success message
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form
      setFormValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set form errors
        const formErrors: Partial<ContactFormValues> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof ContactFormValues] = err.message;
          }
        });
        setErrors(formErrors);
      } else if (error instanceof Error) {
        // Handle API errors
        toast({
          title: "Error",
          description: error.message || "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      } else {
        // Handle other errors
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ScrollIndicator />
      <div className="container mx-auto py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Have questions or feedback? We'd love to hear from you. Fill out the form below or use our contact information to get in touch.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Your message"
                    className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            <div className="space-y-8 bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:support@educationalplatform.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@educationalplatform.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href="tel:+18005551234" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (800) 555-1234
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <address className="text-muted-foreground not-italic">
                      123 Education Street<br />
                      Tech City, CA 94103<br />
                      United States
                    </address>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Business Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Monday - Friday: 9AM - 6PM<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
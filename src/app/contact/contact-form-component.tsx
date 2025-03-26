"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Reset success state when user interacts with the form again
  useEffect(() => {
    if (isSuccess) {
      const handler = () => setIsSuccess(false);
      document.addEventListener('input', handler);
      return () => document.removeEventListener('input', handler);
    }
  }, [isSuccess]);

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
      
      // Set success state
      setIsSuccess(true);
      
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
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">Contact Us</h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Fill out the form below or use our contact information to get in touch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 bg-white dark:bg-gray-900 p-5 sm:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Thank You!</h2>
                  <p className="text-gray-700 dark:text-gray-300 max-w-md">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSuccess(false)} 
                    variant="outline"
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-medium text-gray-900 dark:text-gray-100">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="font-medium text-gray-900 dark:text-gray-100">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        className={`bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="font-medium text-gray-900 dark:text-gray-100">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      className={`bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}`}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="font-medium text-gray-900 dark:text-gray-100">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formValues.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Your message"
                      className={`w-full rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                        errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>

                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white"
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
                  </motion.div>
                </form>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5 sm:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Contact Information</h2>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Email</p>
                    <a 
                      href="mailto:support@educationalplatform.com" 
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      support@educationalplatform.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Phone</p>
                    <a 
                      href="tel:+18005551234" 
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      +1 (800) 555-1234
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Address</p>
                    <address className="text-gray-700 dark:text-gray-300 not-italic">
                      123 Education Street<br />
                      Tech City, CA 94103<br />
                      United States
                    </address>
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Business Hours</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Monday - Friday: 9AM - 6PM<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 
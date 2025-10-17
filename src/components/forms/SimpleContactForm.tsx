import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { customerInquiryService } from "@/services/customerInquiryService";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const simpleFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[+]?[0-9\s-()]{10,15}$/,
      "Please enter a valid phone number (10-15 digits)"
    ),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type SimpleFormData = z.infer<typeof simpleFormSchema>;

interface SimpleContactFormProps {
  sourcePage?: string;
  onSuccess?: () => void;
  className?: string;
}

const SimpleContactForm = ({
  sourcePage = "home-simple",
  onSuccess,
  className = "",
}: SimpleContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SimpleFormData>({
    resolver: zodResolver(simpleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: SimpleFormData) => {
    console.log(
      "SimpleContactForm: Starting submission process with data:",
      data
    );
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Split name into first and last name (simple approach)
      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0] || data.name;
      const lastName = nameParts.slice(1).join(" ") || "Not Provided";

      const inquiryData = {
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.phone || "",
        company: "",
        service_interest: "General Inquiry",
        budget_range: "To be discussed",
        project_timeline: "To be discussed",
        message: data.message,
        source_page: sourcePage,
      };

      console.log(
        "SimpleContactForm: Calling customerInquiryService.submitInquiry with payload:",
        inquiryData
      );

      const result = await customerInquiryService.submitInquiry(inquiryData);
      console.log(
        "SimpleContactForm: Inquiry submission successful, result:",
        result
      );

      toast({
        title: "Message Sent Successfully! 🎉",
        description:
          "Thanks for reaching out! We'll get back to you within 24 hours.",
      });

      if (onSuccess) {
        console.log("SimpleContactForm: Calling onSuccess callback");
        onSuccess();
      }

      // Reset form
      form.reset();

      // Redirect to thank you page after a brief delay
      setTimeout(() => {
        console.log("SimpleContactForm: Navigating to /thank-you");
        navigate("/thank-you");
      }, 1500);
    } catch (error) {
      console.error("SimpleContactForm: Full error details:", error);

      let errorMessage =
        "There was an error sending your message. Please try again.";

      // Check for specific error types
      if (error instanceof Error) {
        console.error("SimpleContactForm: Error message:", error.message);
        console.error("SimpleContactForm: Error stack:", error.stack);

        if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "Network connection issue. Please check your internet connection and try again.";
        } else if (error.message.includes("Unauthorized")) {
          errorMessage =
            "Authorization error. Please refresh the page and try again.";
        } else if (error.message.includes("Forbidden")) {
          errorMessage =
            "Access denied. Please contact support if this persists.";
        }
      }

      setSubmitError(errorMessage);

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log("SimpleContactForm: Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-lg mx-auto ${className}`}>
      <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 shadow-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
              <div className="flex items-center space-x-2 p-4 bg-red-900/20 border border-red-600 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-300 text-sm">{submitError}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="bg-black/20 backdrop-blur-sm border-cyan-500/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:bg-black/30 transition-all duration-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="bg-black/20 backdrop-blur-sm border-cyan-500/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:bg-black/30 transition-all duration-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="bg-black/20 backdrop-blur-sm border-cyan-500/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:bg-black/30 transition-all duration-300"
                      {...field}
                      onChange={(e) => {
                        // Only allow numbers, spaces, hyphens, parentheses, and plus sign
                        const value = e.target.value.replace(
                          /[^0-9\s\-()]/g,
                          ""
                        );
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project requirements - Web Apps, Mobile Apps, AI Solutions, SaaS, etc."
                      className="bg-black/20 backdrop-blur-sm border-cyan-500/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:bg-black/30 transition-all duration-300 min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SimpleContactForm;

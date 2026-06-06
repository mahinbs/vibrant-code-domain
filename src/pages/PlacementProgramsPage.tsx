import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageGlowLayer from "@/components/ui/PageGlowLayer";
import SectionDivider from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { placementProgramService } from "@/services/placementProgramService";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Database,
  GraduationCap,
  HeadphonesIcon,
  Laptop,
  PhoneCall,
  Rocket,
  Smartphone,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
} from "lucide-react";

const whyChooseItems = [
  {
    icon: BookOpen,
    title: "Industry-Focused Curriculum",
    description:
      "Learn the latest technologies and frameworks used by modern companies and startups.",
  },
  {
    icon: UserCheck,
    title: "Dedicated One-on-One Mentorship",
    description:
      "Get guided personally by experienced professionals throughout your learning journey.",
  },
  {
    icon: Laptop,
    title: "Real Project Experience",
    description:
      "Work on 5 practical industry-level projects to strengthen your portfolio and hands-on skills.",
  },
  {
    icon: Video,
    title: "LMS Access Included",
    description:
      "Get access to recorded learning materials, resources, assignments, and training videos anytime.",
  },
  {
    icon: Briefcase,
    title: "Placement Assistance Program",
    description:
      "Our dedicated placement team helps you prepare for interviews, resumes, job applications, and hiring processes.",
  },
  {
    icon: PhoneCall,
    title: "Guaranteed Interview Opportunities",
    description:
      "Receive a minimum of 5 interview calls through our placement assistance program.",
  },
];

const trainingPhaseItems = [
  "Live Professional Training",
  "Hands-On Practical Sessions",
  "Assignments & Assessments",
  "Real-World Projects",
  "One-on-One Mentorship",
];

const placementPhaseItems = [
  "Placement Assistance",
  "Resume Building",
  "Interview Preparation",
  "LinkedIn Optimization",
  "Custom Job Search Assistance",
  "Mock Interviews",
  "Career Guidance",
];

const programs = [
  {
    icon: Smartphone,
    title: "Mobile Application Development Program",
    subtitle: "Build Modern Mobile Applications Using Flutter",
    description:
      "Learn how to create powerful cross-platform mobile applications for Android and iOS using Flutter, one of the fastest-growing frameworks in the industry.",
    learnings: [
      "Flutter Development",
      "Dart Programming",
      "UI/UX Implementation",
      "API Integration",
      "Firebase Integration",
      "State Management",
      "Cross-Platform App Development",
      "App Deployment",
    ],
    fee: "₹1,14,000 (Inclusive of GST)",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    icon: Code,
    title: "Python Full Stack Development Program",
    subtitle: "Become a Complete Python Developer",
    description:
      "Master both frontend and backend development while learning powerful Python technologies used in web applications, automation, and AI-driven systems.",
    learnings: [
      "Python Programming",
      "Frontend Development",
      "Backend Development",
      "Database Management",
      "API Development",
      "Django / Flask Concepts",
      "Authentication Systems",
      "Deployment & Hosting",
      "Introduction to Machine Learning",
    ],
    fee: "₹79,999",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    icon: Database,
    title: "Data Science & Machine Learning Program",
    subtitle: "Learn Data Analytics, AI & Machine Learning",
    description:
      "Gain expertise in data analysis, predictive modeling, machine learning, and business intelligence with practical implementation-focused training.",
    learnings: [
      "Python for Data Science",
      "Data Analysis",
      "Data Visualization",
      "Machine Learning",
      "Predictive Analytics",
      "Model Training",
      "Business Intelligence Concepts",
      "Real-World Dataset Projects",
    ],
    fee: "₹89,999",
    accent: "from-indigo-500 to-purple-500",
  },
];

const includedItems = [
  "1-on-1 Professional Mentorship",
  "5 Real-World Projects",
  "LMS Video Access",
  "Placement Assistance",
  "Minimum 5 Interview Calls",
];

const placementSupportItems = [
  "Professional Resume Building",
  "Personalized Career Guidance",
  "Mock Interview Sessions",
  "Interview Preparation",
  "LinkedIn Profile Optimization",
  "Job Application Strategy",
  "Custom Job Search Links",
  "Industry Hiring Assistance",
];

const whoCanApplyItems = [
  "Students",
  "Fresh Graduates",
  "Career Switchers",
  "Working Professionals",
  "Freelancers",
  "Aspiring Developers & AI Professionals",
];

const programOptions = [
  "Mobile Application Development (Flutter)",
  "Python Full Stack Development",
  "Data Science & Machine Learning",
  "Not sure yet — need guidance",
];

const backgroundOptions = [
  "Student",
  "Fresh Graduate",
  "Career Switcher",
  "Working Professional",
  "Freelancer",
  "Aspiring Developer / AI Professional",
];

const PlacementProgramsPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    background: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleApplyNow = () => {
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      program: "",
      background: "",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      nextErrors.phone = "Enter a valid phone number (at least 10 digits)";
    }
    if (!formData.program) {
      nextErrors.program = "Please select a program";
    }
    if (!formData.background) {
      nextErrors.background = "Please select your background";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const emailBody = `
New Placement Program Application

Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Program of Interest: ${formData.program}
Current Background: ${formData.background}
${formData.message.trim() ? `Additional Message: ${formData.message.trim()}` : ""}
    `.trim();

    try {
      const { error: saveError } = await placementProgramService.submitApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        program: formData.program,
        background: formData.background,
        message: formData.message,
      });

      if (saveError) throw new Error(saveError);

      const emailResponse = await fetch(
        "https://send-mail-redirect-boostmysites.vercel.app/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "boostmysitescom@gmail.com",
            subject: `New Placement Program Application: ${formData.name}`,
            name: "Boostmysites Placement Programs",
            body: emailBody,
          }),
        }
      );

      if (!emailResponse.ok) {
        throw new Error("Failed to send admin notification email");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting placement application:", error);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <PageGlowLayer />
      <Header />

      <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
        <DialogContent className="bg-gray-900 border border-gray-800 text-white sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-bold text-white text-center">
                  Application Submitted
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-center text-base">
                  Thank you for applying to our placement program. Our team
                  will review your details and contact you shortly.
                </DialogDescription>
              </DialogHeader>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  Apply for Placement Program
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Fill in your details and our team will get in touch with next
                  steps.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-200">
                    Phone / WhatsApp Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="10-digit mobile number"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Program of Interest</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) =>
                      setFormData({ ...formData, program: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {programOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.program && (
                    <p className="text-sm text-red-400">{errors.program}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Current Background</Label>
                  <Select
                    value={formData.background}
                    onValueChange={(value) =>
                      setFormData({ ...formData, background: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select your background" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {backgroundOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.background && (
                    <p className="text-sm text-red-400">{errors.background}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-200">
                    Additional Message (Optional)
                  </Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your goals or questions..."
                    rows={3}
                    className="w-full rounded-md bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      <main className="pt-16 relative z-10">
        {/* Hero */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative">
            <Badge
              variant="secondary"
              className="mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              EdTech · Job Placement Programs
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Launch Your Tech Career With{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Industry-Focused Job Placement Programs
              </span>
            </h1>

            <p className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6">
              Become Job-Ready in 7 Months
            </p>

            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed max-w-4xl mx-auto">
              Master in-demand tech skills with practical training, real-world
              projects, one-on-one mentorship, and dedicated placement assistance
              designed to help you confidently enter the tech industry.
            </p>

            <p className="text-base md:text-lg text-gray-400 mb-10 leading-relaxed max-w-4xl mx-auto">
              Whether you want to become a Mobile App Developer, Python Full
              Stack Developer, or Data Science Professional, our career-focused
              programs are designed to help you build strong technical expertise
              and prepare for real industry opportunities.
            </p>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold"
                onClick={handleApplyNow}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Why Choose */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Why Choose Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Placement Programs?
              </span>
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Everything you need to go from learning fundamentals to landing
              your first tech role.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseItems.map((item) => (
                <Card
                  key={item.title}
                  className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-2">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-lg">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Program Structure */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Program Structure
            </h2>
            <div className="flex items-center justify-center gap-2 mb-12">
              <Clock className="w-5 h-5 text-cyan-400" />
              <p className="text-xl text-cyan-400 font-semibold">
                Duration: 7 Months
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-cyan-500/30">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    First 4 Months
                  </Badge>
                  <CardTitle className="text-white text-xl">
                    Live Training & Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {trainingPhaseItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-blue-500/30">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Next 3 Months
                  </Badge>
                  <CardTitle className="text-white text-xl">
                    Placement & Career Prep
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {placementPhaseItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Career Programs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Our Career Programs
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Choose the path that matches your career goals. Every program
              includes mentorship, projects, LMS access, and placement support.
            </p>

            <div className="space-y-8">
              {programs.map((program) => (
                <Card
                  key={program.title}
                  className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/30 transition-colors overflow-hidden"
                >
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${program.accent} rounded-xl flex items-center justify-center shrink-0`}
                      >
                        <program.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl md:text-2xl mb-1">
                          {program.title}
                        </CardTitle>
                        <p className="text-cyan-400 font-medium mb-3">
                          {program.subtitle}
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Target className="w-4 h-4 text-cyan-400" />
                          What You&apos;ll Learn
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {program.learnings.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-gray-300"
                            >
                              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Rocket className="w-4 h-4 text-cyan-400" />
                          Included
                        </h4>
                        <ul className="space-y-2 mb-6">
                          {includedItems.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-gray-300"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="bg-gray-900/60 border border-cyan-500/20 rounded-lg p-4">
                          <p className="text-gray-400 text-sm mb-1">
                            Program Fee
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {program.fee}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Placement Support */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              What Makes Our Placement Support Different?
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Our placement assistance is designed to help students become
              interview-ready and industry-prepared.
            </p>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <HeadphonesIcon className="w-6 h-6 text-cyan-400" />
                  Dedicated Placement Officer Support Includes:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {placementSupportItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Who Can Apply */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who Can Apply?
            </h2>
            <p className="text-gray-400 mb-8">
              These programs are ideal for:
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {whoCanApplyItems.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="bg-gray-800 text-gray-200 border-gray-600 px-4 py-2 text-sm"
                >
                  <Users className="w-3 h-3 mr-2 inline" />
                  {item}
                </Badge>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              No advanced experience required. We train from fundamentals to
              advanced industry-level implementation.
            </p>
          </div>
        </section>

        {/* Build Skills */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Build Skills That Companies Actually Hire For
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Technology industries are rapidly growing, and companies are
              actively hiring professionals skilled in development, AI, machine
              learning, and data analysis.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our programs focus on practical implementation, project building,
              and placement readiness to help you confidently step into the tech
              industry.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-red-500/20 text-red-400 border-red-500/30"
            >
              Limited seats available for upcoming batches
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Career Transformation Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Enroll Now &amp; Get Industry-Ready With Expert Mentorship +
              Placement Assistance
            </p>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-bold"
                onClick={handleApplyNow}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlacementProgramsPage;

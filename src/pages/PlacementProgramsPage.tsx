import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { WorkShell } from "@/components/work/primitives/WorkShell";
import { WorkHeroFrame } from "@/components/work/primitives/WorkHeroFrame";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
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

const heroStats = [
  "7-month job-ready program",
  "1-on-1 professional mentorship",
  "5 real-world industry projects",
  "Minimum 5 interview calls",
];

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

const fieldClass =
  "border-white/15 bg-black/25 text-white placeholder:text-slate-500 focus-visible:ring-[rgb(72,118,255)]";

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

  const handleApplyNow = () => setIsModalOpen(true);

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
    if (!open) resetForm();
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) nextErrors.name = "Full name is required";
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
    if (!formData.program) nextErrors.program = "Please select a program";
    if (!formData.background) nextErrors.background = "Please select your background";

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
          headers: { "Content-Type": "application/json" },
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
    <WorkShell documentTitle="Job Placement Programs | Boostmysites">
      <Helmet>
        <title>Job Placement Programs | Boostmysites</title>
        <meta
          name="description"
          content="Become job-ready in 7 months with industry-focused tech training, real-world projects, mentorship, and dedicated placement assistance."
        />
      </Helmet>

      <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border border-white/15 bg-[rgb(8,16,40)] text-white sm:max-w-lg">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                <CheckCircle className="h-10 w-10 text-emerald-400" />
              </div>
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-center text-2xl font-semibold text-white">
                  Application Submitted
                </DialogTitle>
                <DialogDescription className="text-center text-base text-slate-300">
                  Thank you for applying. Our team will review your details and
                  contact you shortly.
                </DialogDescription>
              </DialogHeader>
              <Button asChild size="lg" className="btn-gloss mt-8">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-white">
                  Apply for Placement Program
                </DialogTitle>
                <DialogDescription className="text-slate-300">
                  Fill in your details and our team will get in touch with next
                  steps.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">
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
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-200">
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
                    className={fieldClass}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Program of Interest</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) =>
                      setFormData({ ...formData, program: value })
                    }
                  >
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent className="border-white/15 bg-[rgb(8,16,40)] text-white">
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
                  <Label className="text-slate-200">Current Background</Label>
                  <Select
                    value={formData.background}
                    onValueChange={(value) =>
                      setFormData({ ...formData, background: value })
                    }
                  >
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="Select your background" />
                    </SelectTrigger>
                    <SelectContent className="border-white/15 bg-[rgb(8,16,40)] text-white">
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
                  <Label htmlFor="message" className="text-slate-200">
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
                    className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${fieldClass}`}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="btn-gloss w-full font-semibold"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-10">
        <WorkHeroFrame>
          <div className="space-y-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100">
              <GraduationCap className="h-3.5 w-3.5" />
              EdTech · Job placement programs
            </p>
            <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Launch your tech career with industry-focused job placement programs.
            </h1>
            <p className="text-lg font-medium text-cyan-100 md:text-xl">
              Become job-ready in 7 months
            </p>
            <p className="max-w-3xl text-base text-slate-200 md:text-lg">
              Master in-demand tech skills with practical training, real-world
              projects, one-on-one mentorship, and dedicated placement assistance
              designed to help you confidently enter the tech industry.
            </p>
            <p className="max-w-3xl text-sm text-slate-300 md:text-base">
              Whether you want to become a Mobile App Developer, Python Full Stack
              Developer, or Data Science Professional, our career-focused programs
              help you build strong technical expertise and prepare for real industry
              opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleApplyNow} className="btn-gloss">
              Apply now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm text-slate-100 sm:grid-cols-2 md:grid-cols-4">
            {heroStats.map((item) => (
              <div key={item} className="glass-card-soft rounded-xl px-3 py-2">
                {item}
              </div>
            ))}
          </div>
        </WorkHeroFrame>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Why choose our placement programs?
          </h2>
          <p className="text-slate-200">
            Everything you need to go from learning fundamentals to landing your
            first tech role.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseItems.map((item) => (
              <article key={item.title} className="glass-card-soft rounded-2xl p-5">
                <div className="work-icon-tile mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-200">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card space-y-4 rounded-2xl p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-200" />
            <h2 className="text-2xl font-semibold text-white">Program structure</h2>
            <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-sm text-cyan-100">
              Duration: 7 months
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="glass-card-soft rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">
                First 4 months
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                Live training & projects
              </h3>
              <ul className="mt-4 space-y-2">
                {trainingPhaseItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-200">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="glass-card-soft rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">
                Next 3 months
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                Placement & career prep
              </h3>
              <ul className="mt-4 space-y-2">
                {placementPhaseItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-200">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Our career programs</h2>
          <p className="text-slate-200">
            Choose the path that matches your career goals. Every program includes
            mentorship, projects, LMS access, and placement support.
          </p>
          <div className="space-y-4">
            {programs.map((program) => (
              <article key={program.title} className="glass-card rounded-2xl p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="work-icon-tile shrink-0">
                    <program.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-white md:text-2xl">
                      {program.title}
                    </h3>
                    <p className="font-medium text-cyan-100">{program.subtitle}</p>
                    <p className="text-slate-200">{program.description}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                      <Target className="h-4 w-4 text-cyan-200" />
                      What you&apos;ll learn
                    </h4>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {program.learnings.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-200"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                      <Rocket className="h-4 w-4 text-cyan-200" />
                      Included
                    </h4>
                    <ul className="mb-4 space-y-2">
                      {includedItems.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-200"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Program fee
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-white">
                        {program.fee}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">
            What makes our placement support different?
          </h2>
          <p className="mt-2 text-slate-200">
            Our placement assistance is designed to help students become
            interview-ready and industry-prepared.
          </p>
          <div className="mt-4 flex items-center gap-2 text-white">
            <HeadphonesIcon className="h-5 w-5 text-cyan-200" />
            <span className="font-medium">
              Dedicated placement officer support includes:
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {placementSupportItems.map((item) => (
              <p
                key={item}
                className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-100"
              >
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="glass-card space-y-4 rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-white">Who can apply?</h2>
          <p className="text-slate-200">These programs are ideal for:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {whoCanApplyItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm text-slate-100"
              >
                <Users className="h-3.5 w-3.5 text-cyan-200" />
                {item}
              </span>
            ))}
          </div>
          <p className="mx-auto max-w-2xl text-slate-200">
            No advanced experience required. We train from fundamentals to advanced
            industry-level implementation.
          </p>
        </section>

        <section className="glass-card-soft space-y-4 rounded-2xl p-6 text-center">
          <div className="work-icon-tile mx-auto">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Build skills that companies actually hire for
          </h2>
          <p className="mx-auto max-w-3xl text-slate-200">
            Technology industries are rapidly growing, and companies are actively
            hiring professionals skilled in development, AI, machine learning, and
            data analysis.
          </p>
          <p className="mx-auto max-w-3xl text-slate-300">
            Our programs focus on practical implementation, project building, and
            placement readiness to help you confidently step into the tech industry.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-6 text-center">
          <p className="inline-flex rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-sm font-medium text-rose-200">
            Limited seats available for upcoming batches
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Start your career transformation today
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-200">
            Enroll now and get industry-ready with expert mentorship and placement
            assistance.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button onClick={handleApplyNow} className="btn-gloss">
              Apply now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </WorkShell>
  );
};

export default PlacementProgramsPage;

import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Rocket, TrendingUp } from "lucide-react";
import SimpleContactForm from "@/components/forms/SimpleContactForm";

const AppIdeasLabPage = () => {

  return (
    <>
      <Helmet>
        <title>
          App Idea Lab | Innovation Showroom | boostmysites.in
        </title>
        <meta
          name="description"
          content="Explore Boostmysites' Idea Lab - where we prototype the future. Discover our next generation of AI-powered solutions and cutting-edge innovations."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-black text-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Innovation Showcase
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                The Boostmysites Idea Lab: Our Next Generation of AI Solutions
              </h1>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 px-6 bg-black relative">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Turning Vision into Reality
            </h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                At Boostmysites, we don't just build software for clients—we're
                constantly prototyping the future. Our Idea Lab is where our
                developers and AI Experts experiment, innovate, and bring bold
                concepts to life, long before they become industry standards.
              </p>
              <p>
                This showcase provides a look into the next wave of AI-powered
                solutions to problems we believe will transform industries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                <Code2 className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Cutting-Edge Tech
                </h3>
                <p className="text-gray-400">
                  Built with the latest AI, ML, and cloud technologies
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
                <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Launch</h3>
                <p className="text-gray-400">
                  Prototypes ready for customization and deployment
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Industry Impact
                </h3>
                <p className="text-gray-400">
                  Solutions designed to transform businesses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Showcase Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Innovation
            </h2>

            {/* App Idea Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl">
              {/* App Header */}
              <div className="p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-cyan-400">
                      TalkEarn
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                        Social Platform
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
                        Marketplace
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm">
                        Creator Economy
                      </span>
                      <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm">
                        Video/Audio Calls
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm">
                      React Native
                    </span>
                    <span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm">
                      WebRTC
                    </span>
                    <span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm">
                      Stripe/Payment Integration
                    </span>
                    <span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm">
                      Socket.io
                    </span>
                    <span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-lg text-gray-300 text-sm">
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-red-400">
                    The Problem
                  </h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Professionals, creators, and experts struggle to monetize their time and expertise effectively, while people seeking personalized advice or connections face barriers to accessing the right individuals. Traditional platforms lack a unified, secure way to facilitate paid one-on-one conversations across various industries and expertise levels.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-green-400">
                    The Solution
                  </h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    TalkEarn is a global platform where users can pay to chat or video call with professionals, creators, or personalities — from mentors, therapists, and lawyers to influencers, doctors, or even just friendly listeners. It democratizes access to expertise while enabling professionals to monetize their time, creating a win-win marketplace for knowledge sharing and connection.
                  </p>
                </div>
              </div>

              {/* Video Demo */}
              <div className="p-8 pt-0">
                <div className="mb-4 text-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Watch the 2-Minute Demo below
                  </span>
                </div>

                <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-gray-800">
                  <iframe
                    src="https://drive.google.com/file/d/1iCv2SLiBqqs5Mj_InawvjPMFu6zQi3KX/preview"
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-8 pt-0 text-center">
                <Button
                  onClick={() => {
                    const form = document.getElementById("partnership-form");
                    form?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Inquire About This Idea
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership CTA Section */}
        <section
          id="partnership-form"
          className="py-20 px-6 bg-black relative"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Ready to Launch the Next Big Thing?
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                We offer multiple partnership options to bring these innovations
                to life:
              </p>
            </div>

            {/* Partnership Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-cyan-400">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    Exclusive Acquisition
                  </h3>
                </div>
                <p className="text-gray-300 text-center">
                  Fully acquire the idea and have us develop it exclusively for
                  your business.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-400">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">
                    Custom Development
                  </h3>
                </div>
                <p className="text-gray-300 text-center">
                  Get a customized version of the core concept tailored to your
                  specific business needs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-purple-400">
                      3
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-400 mb-2">
                    Collaboration
                  </h3>
                </div>
                <p className="text-gray-300 text-center">
                  Interested in a partnership or investment opportunity to bring
                  this to market together.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6 text-center">
                <p className="text-gray-300 text-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              <SimpleContactForm 
                sourcePage="app-ideas-lab"
              />
            </div>
          </div>
        </section>

        {/* Footer Disclaimer */}
        <section className="py-12 px-6 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Please Note
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                The ideas presented here are prototypes and proof-of-concepts
                developed by the boostmysites.in team. They are presented for
                illustrative purposes and are subject to availability,
                customization, and final development scope upon engagement.
              </p>
              <div className="mt-4 flex gap-4">
                <Button
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-white"
                  onClick={() => (window.location.href = "/services")}
                >
                  View Our Services
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-white"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AppIdeasLabPage;


import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Rocket, TrendingUp, Play, Pause, Square, Loader2 } from "lucide-react";
import SimpleContactForm from "@/components/forms/SimpleContactForm";
import videoThumb from '../assets/images/talkearn-video-thumbnail.webp'
import video from '../assets/videos/TalkEarn Demo.mp4'
import { useState, useRef, useEffect } from "react";

const AppIdeasLabPage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
      setShowThumbnail(false);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
      setShowThumbnail(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowControls(true);
    // Clear any existing timeout
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
      hideControlsTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Set timeout to hide controls after 1.5 seconds
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1500);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>App Idea Lab | Innovation Showroom | boostmysites.in</title>
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
                <h3 className="text-xl font-semibold mb-2">Industry Impact</h3>
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
                {/* Video Demo */}
                <div className="p-8 pt-0">
                  <div className="mb-4 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      Watch the 2-Minute Demo below
                    </span>
                  </div>

                  <div 
                    className="relative aspect-video bg-black rounded-xl overflow-hidden border border-gray-800"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Video Element */}
                    <video
                      ref={videoRef}
                      src={video}
                      className="w-full h-full object-contain"
                      onLoadedData={handleVideoLoaded}
                      preload="auto"
                    />

                    {/* Thumbnail Overlay with Loading and Play Button */}
                    {showThumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <img
                          src={videoThumb}
                          alt="Video Thumbnail"
                          className="w-full h-full object-contain"
                        />
                        
                        {/* Loading State */}
                        {!isVideoLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                            <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
                          </div>
                        )}

                        {/* Play Button - Only shown after video is loaded */}
                        {isVideoLoaded && (
                          <button
                            onClick={handlePlay}
                            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                            aria-label="Play video"
                          >
                            <div className="w-20 h-20 bg-cyan-500/90 hover:bg-cyan-500 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-lg shadow-cyan-500/50">
                              <Play className="w-10 h-10 text-white ml-1" fill="white" />
                            </div>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Video Controls - Shown when video is active (playing or paused) */}
                    {!showThumbnail && (
                      <div 
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                          showControls ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-4">
                          {isVideoPlaying ? (
                            <button
                              onClick={handlePause}
                              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/90 hover:bg-cyan-500 rounded-lg transition-all duration-300 shadow-lg"
                              aria-label="Pause video"
                            >
                              <Pause className="w-5 h-5 text-white" />
                              {/* <span className="text-white font-medium">Pause</span> */}
                            </button>
                          ) : (
                            <button
                              onClick={handlePlay}
                              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/90 hover:bg-cyan-500 rounded-lg transition-all duration-300 shadow-lg"
                              aria-label="Play video"
                            >
                              <Play className="w-5 h-5 text-white" fill="white" />
                              {/* <span className="text-white font-medium">Play</span> */}
                            </button>
                          )}
                          <button
                            onClick={handleStop}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/90 hover:bg-red-500 rounded-lg transition-all duration-300 shadow-lg"
                            aria-label="Stop video"
                          >
                            <Square className="w-5 h-5 text-white" fill="white" />
                            {/* <span className="text-white font-medium">Stop</span> */}
                          </button>
                        </div>
                      </div>
                    )}
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

              {/* Description */}
              <div className="p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  TalkEarn is a global platform where users can pay to chat or
                  video call with professionals, creators, or personalities —
                  from mentors, therapists, and lawyers to influencers, doctors,
                  or even just friendly listeners. It democratizes access to
                  expertise while enabling professionals to monetize their time,
                  creating a win-win marketplace for knowledge sharing and
                  connection.
                </p>

                {/* Target Users */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4 text-cyan-400">
                    Target Users
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                      <h5 className="text-xl font-semibold mb-3 text-cyan-300">
                        In India
                      </h5>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>Students needing academic or career help.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>
                            Content creators and influencers looking to monetize
                            their following.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>
                            Urban youth seeking emotional support or meaningful
                            conversations.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <h5 className="text-xl font-semibold mb-3 text-blue-300">
                        Globally
                      </h5>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>
                            Freelance experts and coaches offering paid
                            sessions.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>
                            Therapists, doctors, and consultants expanding
                            international reach.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>
                            Fans and followers looking for one-on-one celebrity
                            or creator interactions.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Market Potential */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4 text-cyan-400">
                    Market Potential
                  </h4>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 space-y-4">
                    <div>
                      <h5 className="text-lg font-semibold mb-2 text-purple-300">
                        Global Context:
                      </h5>
                      <ul className="space-y-2 text-gray-300 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>
                            Online communication and creator economy markets
                            exceed $100B+ combined.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>
                            Growing demand for instant expert access and mental
                            wellness platforms.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold mb-2 text-pink-300">
                        Indian Context:
                      </h5>
                      <ul className="space-y-2 text-gray-300 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>
                            150M+ creators, mentors, and professionals online.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>
                            Rising comfort with paid advice and digital therapy
                            sessions.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>
                            Strong overlap with Tier 1–2 users spending on
                            personalized digital services.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-gray-300 italic">
                      Projected early adoption in urban India and
                      English-speaking countries, expanding to other markets as
                      awareness and trust grow.
                    </p>
                  </div>
                </div>

                {/* Revenue Model */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4 text-cyan-400">
                    Revenue Model
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5">
                      <h5 className="text-lg font-semibold mb-2 text-green-300">
                        20% Commission
                      </h5>
                      <p className="text-gray-300 text-sm">
                        Platform share per paid interaction.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5">
                      <h5 className="text-lg font-semibold mb-2 text-blue-300">
                        Subscription Plans
                      </h5>
                      <p className="text-gray-300 text-sm">
                        Premium placement for verified or top-rated profiles.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-5">
                      <h5 className="text-lg font-semibold mb-2 text-purple-300">
                        Sponsored Visibility
                      </h5>
                      <p className="text-gray-300 text-sm">
                        Featured listing for top earners and niche experts.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-5">
                      <h5 className="text-lg font-semibold mb-2 text-orange-300">
                        Corporate Partnerships
                      </h5>
                      <p className="text-gray-300 text-sm">
                        For training, therapy, and expert consulting at scale.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Funding Requirement */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4 text-cyan-400">
                    Funding Requirement
                  </h4>
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                    <div className="mb-4">
                      <span className="text-lg font-semibold text-cyan-300">
                        Stage:{" "}
                      </span>
                      <span className="text-gray-300">Seed/Pre-Seed</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-lg font-semibold text-cyan-300">
                        Estimated Funding Need:{" "}
                      </span>
                      <span className="text-gray-300">
                        ₹2–3 crore ($250,000–$350,000)
                      </span>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold mb-3 text-cyan-300">
                        Utilization:
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Product Development & Infrastructure
                          </span>
                          <span className="text-cyan-400 font-semibold">
                            35%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-cyan-500 h-2 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Marketing & User Acquisition
                          </span>
                          <span className="text-blue-400 font-semibold">
                            25%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Verification & Compliance
                          </span>
                          <span className="text-purple-400 font-semibold">
                            20%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Operations & Customer Support
                          </span>
                          <span className="text-green-400 font-semibold">
                            10%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "10%" }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Contingency & Scaling
                          </span>
                          <span className="text-orange-400 font-semibold">
                            10%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "10%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Projection */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4 text-cyan-400">
                    Revenue Projection (First 3 Years)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-cyan-500/20 rounded-xl overflow-hidden">
                      <thead className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                        <tr>
                          <th className="px-4 py-3 text-left text-cyan-300 font-semibold border-b border-cyan-500/20">
                            Year
                          </th>
                          <th className="px-4 py-3 text-left text-cyan-300 font-semibold border-b border-cyan-500/20">
                            Active Users
                          </th>
                          <th className="px-4 py-3 text-left text-cyan-300 font-semibold border-b border-cyan-500/20">
                            Avg Monthly Spend
                          </th>
                          <th className="px-4 py-3 text-left text-cyan-300 font-semibold border-b border-cyan-500/20">
                            Gross Revenue
                          </th>
                          <th className="px-4 py-3 text-left text-cyan-300 font-semibold border-b border-cyan-500/20">
                            Platform Share (20%)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-black/40">
                        <tr className="border-b border-gray-800 hover:bg-cyan-500/5 transition-colors">
                          <td className="px-4 py-3 text-gray-300 font-semibold">
                            1
                          </td>
                          <td className="px-4 py-3 text-gray-300">50,000</td>
                          <td className="px-4 py-3 text-gray-300">₹400</td>
                          <td className="px-4 py-3 text-gray-300">
                            ₹2.4 crore
                          </td>
                          <td className="px-4 py-3 text-green-400 font-semibold">
                            ₹48 lakh
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800 hover:bg-cyan-500/5 transition-colors">
                          <td className="px-4 py-3 text-gray-300 font-semibold">
                            2
                          </td>
                          <td className="px-4 py-3 text-gray-300">2,00,000</td>
                          <td className="px-4 py-3 text-gray-300">₹500</td>
                          <td className="px-4 py-3 text-gray-300">₹12 crore</td>
                          <td className="px-4 py-3 text-green-400 font-semibold">
                            ₹2.4 crore
                          </td>
                        </tr>
                        <tr className="hover:bg-cyan-500/5 transition-colors">
                          <td className="px-4 py-3 text-gray-300 font-semibold">
                            3
                          </td>
                          <td className="px-4 py-3 text-gray-300">10,00,000</td>
                          <td className="px-4 py-3 text-gray-300">₹600</td>
                          <td className="px-4 py-3 text-gray-300">₹72 crore</td>
                          <td className="px-4 py-3 text-green-400 font-semibold">
                            ₹14.4 crore
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-gray-400 text-sm mt-4 italic">
                    These estimates scale with international expansion and brand
                    partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership CTA Section */}
        <section id="partnership-form" className="py-20 px-6 bg-black relative">
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
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>
              <SimpleContactForm sourcePage="app-ideas-lab" />
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

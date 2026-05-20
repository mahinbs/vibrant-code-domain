import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CANONICAL_ORIGIN } from "@/lib/siteCanonical";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Boostmysites | Leading Digital Solutions Provider</title>
        <meta
          name="description"
          content="Learn about Boostmysites - your trusted partner for web development, mobile apps, AI solutions, and digital transformation services. Discover our mission, expertise, and global presence."
        />
        <meta
          name="keywords"
          content="about boostmysites, digital solutions provider, web development company, software development expertise, global presence, company mission"
        />
        <meta property="og:title" content="About Us - Boostmysites" />
        <meta
          property="og:description"
          content="Learn about Boostmysites - your trusted partner for web development, mobile apps, AI solutions, and digital transformation services."
        />
        <meta property="og:url" content={`${CANONICAL_ORIGIN}/about`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-20">
          <About />
          <div className="container mx-auto max-w-4xl px-6 pb-12 text-center text-sm text-gray-400">
            <Link to="/for-llm" className="text-cyan-400 underline decoration-cyan-400/40 underline-offset-4 hover:text-cyan-300">
              Machine-readable company facts for AI systems
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;


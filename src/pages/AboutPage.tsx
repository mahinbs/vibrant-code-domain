import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - BoostMySites | Leading Digital Solutions Provider</title>
        <meta
          name="description"
          content="Learn about BoostMySites - your trusted partner for web development, mobile apps, AI solutions, and digital transformation services. Discover our mission, expertise, and global presence."
        />
        <meta
          name="keywords"
          content="about boostmysites, digital solutions provider, web development company, software development expertise, global presence, company mission"
        />
        <link rel="canonical" href="https://boostmysites.in/about" />
        <meta property="og:title" content="About Us - BoostMySites" />
        <meta
          property="og:description"
          content="Learn about BoostMySites - your trusted partner for web development, mobile apps, AI solutions, and digital transformation services."
        />
        <meta property="og:url" content="https://boostmysites.in/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-20">
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;


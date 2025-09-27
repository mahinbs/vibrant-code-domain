import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnershipPage = () => {
  const navigate = useNavigate();

  const handleSecurePartnership = () => {
    // Navigate to contact page with partnership parameter
    navigate("/contact?source=partnership");
  };

  const handleGetStarted = () => {
    // Navigate to contact page with partnership parameter
    navigate("/contact?source=partnership");
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0"
            >
              <Zap className="w-4 h-4 mr-2" />
              Limited Time Offer
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Partner with{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                BoostMySites
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              This is your once-in-a-lifetime chance to step into the booming AI
              & digital services market without building everything from
              scratch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold"
                onClick={handleSecurePartnership}
              >
                Secure Your Partnership
              </Button>

              <div className="flex items-center text-red-400 font-semibold">
                <Clock className="w-5 h-5 mr-2" />
                <span>Offer Closes 15th August</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why This Partnership is Special
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">
                    No Heavy Investment
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">
                    Start with minimal cost and grow your business organically
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">
                    Ready Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">
                    Website, branding & backend support from day one
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">
                    Earn from Week One
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">
                    Tap into a proven business model and start earning
                    immediately
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Freedom to Grow</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">
                    Add your own services and launch your own company later
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500/30">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Why This is Special
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  We never open this offer to everyone. You've been shortlisted
                  because we see potential in you. This is your opportunity to
                  step into the market now, build your presence, and grow with
                  us.
                </p>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-red-400 mr-3" />
                    <h3 className="text-xl font-bold text-red-400">
                      Last Date to Join: 15th August
                    </h3>
                  </div>
                  <p className="text-center text-gray-300">
                    Spots are extremely limited – once we close, we won't
                    reopen soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Secure Your Partnership Now
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start building your future in the AI & digital services market
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-bold"
                onClick={handleGetStarted}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PartnershipPage;

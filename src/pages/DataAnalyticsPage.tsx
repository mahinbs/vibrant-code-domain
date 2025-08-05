import { BarChart3, Database, TrendingUp, Eye, Zap, Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';

const DataAnalyticsPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Interactive dashboards and reports that provide actionable business insights.'
    },
    {
      icon: Database,
      title: 'Data Warehousing',
      description: 'Centralized data storage and ETL processes for unified business intelligence.'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Machine learning models to forecast trends and predict business outcomes.'
    },
    {
      icon: Eye,
      title: 'Data Visualization',
      description: 'Beautiful, interactive charts and graphs that make complex data understandable.'
    },
    {
      icon: Zap,
      title: 'Real-time Analytics',
      description: 'Live data processing and streaming analytics for immediate business insights.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Automated pattern recognition and anomaly detection in your data streams.'
    }
  ];

  const process = [
    { step: '01', title: 'Data Assessment', description: 'Analyze existing data sources and quality' },
    { step: '02', title: 'Architecture', description: 'Design data pipeline and analytics architecture' },
    { step: '03', title: 'Implementation', description: 'Build ETL processes and analytics models' },
    { step: '04', title: 'Visualization', description: 'Create dashboards and reporting interfaces' },
    { step: '05', title: 'Optimization', description: 'Performance tuning and continuous improvement' }
  ];

  const caseStudies = [
    {
      client: "FinanceFlow Corp",
      industry: "Financial Services",
      challenge: "Fragmented data across multiple systems with no unified reporting, making business decisions slow and unreliable.",
      solution: "Built comprehensive data warehouse with real-time ETL pipelines and interactive BI dashboards for unified reporting.",
      results: ["95% faster reporting", "60% better decision accuracy", "Single source of truth", "Real-time insights"],
      testimonial: "The analytics platform transformed how we make decisions. We now have real-time insights that drive our strategy and have significantly improved our operational efficiency.",
      clientName: "Robert Martinez",
      clientRole: "Chief Data Officer",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      duration: "12 weeks",
      teamSize: "6 specialists"
    },
    {
      client: "RetailMetrics Inc",
      industry: "Retail & E-commerce",
      challenge: "No visibility into customer behavior patterns and inventory optimization, leading to overstocking and lost sales.",
      solution: "Implemented predictive analytics with customer segmentation and inventory optimization algorithms using machine learning.",
      results: ["40% reduction in inventory costs", "25% increase in sales", "Customer retention improved", "Automated forecasting"],
      testimonial: "The predictive analytics solution has revolutionized our inventory management. We can now anticipate demand and optimize our stock levels automatically.",
      clientName: "Lisa Thompson",
      clientRole: "VP of Operations",
      clientImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      duration: "16 weeks",
      teamSize: "8 specialists"
    }
  ];

  const pricingTiers = [
    {
      name: "Analytics Starter",
      price: "$12,500",
      description: "Essential analytics for small to medium businesses",
      features: [
        "Basic BI dashboard",
        "Data warehouse setup",
        "5 data sources",
        "Standard reports",
        "Email support",
        "3 months maintenance"
      ],
      popular: false
    },
    {
      name: "Intelligence Pro",
      price: "$35,000",
      description: "Advanced analytics and machine learning capabilities",
      features: [
        "Advanced BI platform",
        "Predictive analytics",
        "Unlimited data sources",
        "Custom ML models",
        "Real-time dashboards",
        "API integrations",
        "6 months maintenance",
        "Training & support"
      ],
      popular: true
    },
    {
      name: "Enterprise Analytics",
      price: "Custom",
      description: "Full-scale data analytics ecosystem for large organizations",
      features: [
        "Custom analytics platform",
        "Advanced ML & AI",
        "Data governance",
        "Dedicated team",
        "99.9% uptime SLA",
        "Custom integrations",
        "12 months maintenance",
        "On-site consulting"
      ],
      popular: false
    }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Data Analytics & BI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform raw data into actionable insights with advanced analytics and business intelligence solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                Start Analytics Project
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-indigo-400/30 rounded-xl font-semibold hover:bg-indigo-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View BI Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <ServicePortfolioSection 
        serviceId="data-analytics"
        serviceName="Data Analytics & BI"
      />

      {/* Case Studies Section */}
      <ServiceCaseStudiesSection 
        serviceName="Data Analytics & BI"
        caseStudies={caseStudies}
      />

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Analytics Capabilities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive data analytics and business intelligence tools for data-driven decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-indigo-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Analytics Implementation Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From data chaos to clear business insights with proven methodologies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <ServicePricingSection 
        serviceName="Data Analytics & BI"
        pricingTiers={pricingTiers}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Unlock Your Data's Potential?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's turn your data into your competitive advantage with advanced analytics and BI.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DataAnalyticsPage;
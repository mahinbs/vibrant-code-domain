import "./reshab-landing.css"
import { Toaster } from 'react-hot-toast'
import Layout from "../../components/landingpage/reshab/Layout"
import Hero from "../../components/landingpage/reshab/Hero"
import PartnerSupport from "../../components/landingpage/reshab/PartnerSupport"
import InsideTheSoftware from "../../components/landingpage/reshab/InsideTheSoftware"
import SupportedMarketsToSoftware from "../../components/landingpage/reshab/SupportedMarketsToSoftware"
import WhyUs from "../../components/landingpage/reshab/WhyUs"
import WorkSlider from "../../components/landingpage/reshab/WorkSlider"
import Pricing from "../../components/landingpage/reshab/Pricing"
import HowToGetStarted from "../../components/landingpage/reshab/HowToGetStarted"

const ReshabLandingPage = () => {
    return (
        <div className="reshab-page">
            <Toaster />
            <Layout>
                <Hero />
                <PartnerSupport />
                <InsideTheSoftware />
                <SupportedMarketsToSoftware />
                <WhyUs />
                <WorkSlider />
                <Pricing />
                <HowToGetStarted whatsappNumber="+919790035747" />
            </Layout>
        </div>
    )
}

export default ReshabLandingPage
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Terms and Conditions - Boostmysites";
    
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_title: "Terms and Conditions",
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground text-lg">
              Please read these terms carefully before signing up for our services.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-gray-300 leading-relaxed">
            {/* Agreement Header */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Agreement</h2>
              <p className="mb-4">
                This Agreement is entered into as of{" "}
                <span className="font-bold text-cyan-400">((Date))</span> by and between{" "}
                <span className="font-bold text-cyan-400">((Name))</span>,{" "}
                <span className="font-bold text-cyan-400">((Address))</span>, and{" "}
                <span className="font-bold text-cyan-400">
                  TRIPLE-SEVEN BOOSTMYSITES AI SOLUTIONS LLP
                </span>
                , located at House No: 137, 3rd Main, 3rd Cross, 4th Phase,
                Dollars Colony, JP Nagar, Bangalore South, Bengaluru, Karnataka
                560078.
              </p>
            </section>

            {/* Definitions */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-bold text-cyan-400">AIE:</span> Artificial Intelligence
                  Expert
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Subscriber:</span> Recipient of this
                  agreement
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Subscription:</span> Structure of
                  the business model
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Service Provider:</span>{" "}
                  TRIPLE-SEVEN BOOSTMYSITES AI SOLUTIONS LLP
                </li>
                <li>
                  <span className="font-bold text-cyan-400">CM:</span> Client Manager
                </li>
                <li>
                  <span className="font-bold text-cyan-400">POC:</span> Point of Contact
                </li>
                <li>
                  <span className="font-bold text-cyan-400">TTA:</span> Technical Team Access
                </li>
              </ul>
            </section>

            {/* Scope of Services */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Scope of Services</h2>
              <p className="mb-4">
                TRIPLE-SEVEN BOOSTMYSITES AI SOLUTIONS LLP agrees to provide
                infrastructure as a service (IAAS) under the 'AIE Subscription'
                model to <span className="font-bold text-cyan-400">((Name))</span>, provided
                that all terms and conditions are agreed upon and signed.
              </p>
            </section>

            {/* Service Description */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Service Description</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The AIE Subscription is valid for{" "}
                  <span className="font-bold text-cyan-400">One Month</span> from the start{" "}
                  <span className="font-bold text-cyan-400">((Date))</span> with the option to
                  renew.
                </li>
                <li>
                  Upon slot booking and payment of{" "}
                  <span className="font-bold text-cyan-400">Rs. 10,000</span>, the Subscriber
                  can opt for EMI. The booking amount will be deducted from the
                  total subscription fee.
                </li>
                <li>
                  The Service Provider reserves the right to adjust subscription
                  fees.
                </li>
                <li>
                  Renewal requires the Subscriber to pay the current renewal fee
                  at the end of the tenure.
                </li>
              </ul>
            </section>

            {/* Assigned Teams and Responsibilities */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Assigned Teams and Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-bold text-cyan-400">Client Manager:</span> Primary POC
                  to assist with daily operations and processes.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Branding Team:</span> Consults and
                  guides on brand management and operations but does not execute
                  tasks.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Marketing Team:</span> Provides
                  initial training and ongoing consultation in lead generation.
                  Campaign execution is the Subscriber's responsibility.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Company Registration Team:</span>{" "}
                  Manages all legal documentation and registration tasks.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Website Development Team:</span>{" "}
                  Creates and develops the Subscriber's website. Hosting fees are
                  the Subscriber's responsibility.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Enforcement Supervisor:</span>{" "}
                  Ensures the Subscriber completes assigned tasks from the Client
                  Manager, Branding Team, and Marketing Team, tracking work to
                  maintain company functionality.
                </li>
              </ul>
            </section>

            {/* AIE Subscription Clauses */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                AIE Subscription Clauses
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-bold text-cyan-400">Work Requirement:</span> The
                  Subscriber agrees to work a minimum of six hours daily to
                  actively contribute to their business. Compliance will be
                  monitored via a tracked Excel sheet. If unable to work, the
                  Subscriber must notify the Client Manager in advance with a
                  valid reason.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">
                    Project Value and Expense Allocation:
                  </span>{" "}
                  An average of 30% of each project's value is allocated to
                  TRIPLE-SEVEN BOOSTMYSITES AI SOLUTIONS LLP for project
                  implementation, development, and hosting. The company will
                  communicate this amount to the Subscriber prior to finalizing
                  any client projects, ensuring transparency.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">No Additional Charges:</span> No
                  additional fees are charged beyond the agreed subscription fees.
                </li>
              </ul>
            </section>

            {/* Service Entitlements */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Service Entitlements
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to one dedicated Client Manager.</li>
                <li>
                  TTA, allowing collaboration with TRIPLE-SEVEN BOOSTMYSITES AI
                  SOLUTIONS LLP technical team for project fulfillment.
                </li>
                <li>
                  Dedicated marketing professional for lead generation consulting.
                </li>
                <li>
                  Company & Website creation, with additional hosting costs
                  covered by the Subscriber.
                </li>
                <li>
                  Mentorship sessions based on the Subscriber's request and mentor
                  availability.
                </li>
              </ul>
            </section>

            {/* Website Development & Modifications */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Website Development & Modifications
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The website design will be created using pre-designed templates
                  provided by BoostMySites. Clients may select from these
                  templates and customize color schemes according to their
                  preferences. The website will be developed based on these
                  selections.
                </li>
                <li>
                  Any modifications, additional features, or upgrades requested
                  beyond the initial requirements (as outlined in the requirement
                  document/PDF) will incur additional charges. Pricing will depend
                  on the complexity of the changes or may be calculated on an
                  hourly basis.
                </li>
                <li>
                  If the client prefers to create their own custom design instead
                  of using the provided templates, additional charges will apply.
                  The cost will be determined based on the design complexity and
                  development effort required.
                </li>
                <li>Domain has to be purchased by the subscriber.</li>
              </ul>
            </section>

            {/* Mutual Respect and Professional Conduct Clause */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Mutual Respect and Professional Conduct Clause
              </h2>
              <p className="mb-4">
                Both parties agree to conduct all interactions, communications,
                and transactions under this Agreement with mutual respect,
                professionalism, and good faith. Each party shall refrain from any
                behavior, language, or action that may be deemed disrespectful,
                discriminatory, or unprofessional.
              </p>
              <p className="mb-4">
                Disputes, if any, shall be resolved through constructive dialogue
                and, if necessary, formal mediation, ensuring that all concerns
                are addressed in a professional and cooperative manner. Both
                parties commit to maintaining ethical standards and fostering a
                positive working relationship throughout the term of this
                Agreement.
              </p>
            </section>

            {/* Project Quotation & Valuation */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Project Quotation & Valuation
              </h2>
              <p className="mb-4">
                The project valuation, and the proportion of the project value
                retained by the Service Provider, will be based on complexity and
                resources needed. TRIPLE-SEVEN BOOSTMYSITES AI SOLUTIONS LLP will
                ensure the Subscriber's interest is safeguarded, with the final
                percentage communicated transparently to the Subscriber.
              </p>
            </section>

            {/* Terms & Conditions */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Terms & Conditions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-bold text-cyan-400">No Tapping:</span> The Subscriber is
                  prohibited from using TRIPLE-SEVEN BOOSTMYSITES AI SOLUTIONS LLP
                  resources for personal tasks. Unauthorized use may result in
                  legal action and a penalty of Rs. 10,00,000.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Cancellation & Refund:</span> There
                  is a strict no-refund policy, covering both slot booking and
                  full subscription amounts.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Transferability:</span> The
                  subscription is non-transferable.
                </li>
                <li>
                  The Subscriber acknowledges that the Service Provider shall or
                  may in reliance on this agreement provide the subscriber access
                  to trade secrets, customers, and other confidential data and
                  goodwill.
                </li>
                <li>
                  <span className="font-bold text-cyan-400">Confidentiality:</span> Both parties
                  agree to maintain the confidentiality of any proprietary
                  information shared. Any breach may result in legal consequences,
                  with potential penalties of Rs. 25,00,000.
                </li>
              </ul>
            </section>

            {/* Non-Compete */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Non-Compete</h2>
              <p className="mb-4">
                The Subscriber is restricted from starting or operating any
                company or institute offering services similar to IAAS or
                providing training/consultation aimed at helping others establish
                businesses. However, upon subscription termination, they are free
                to operate independently, provided they do not engage in direct
                competition with TRIPLE-SEVEN BOOSTMYSITES AI SOLUTIONS LLP.
              </p>
            </section>

            {/* Acknowledgment */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Acknowledgment</h2>
              <p className="mb-4">
                The Subscriber acknowledges understanding and acceptance of all
                terms and agrees to abide by the Agreement upon signing.
              </p>
            </section>

            {/* Governing Law & Jurisdiction */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Governing Law & Jurisdiction
              </h2>
              <p className="mb-4">
                This Agreement is governed by the laws of India, with exclusive
                jurisdiction in Bengaluru, Karnataka.
              </p>
            </section>

            {/* Subscription Renewal Terms */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Subscription Renewal Terms
              </h2>
              <p className="mb-4">
                The Service Provider will notify the Subscriber one week before
                the end of the subscription. If not renewed, services will be
                immediately suspended upon expiration.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Entire Agreement</h2>
              <p className="mb-4">
                This Agreement represents the entire understanding between the
                parties and supersedes all prior negotiations or agreements,
                written or oral.
              </p>
            </section>

            {/* Annexure A: Non-Disclosure Agreement */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Annexure A: Non-Disclosure Agreement
              </h2>
              <p className="mb-4">
                The Service Provider has appointed{" "}
                <span className="font-bold text-cyan-400">((Name))</span> since/from{" "}
                <span className="font-bold text-cyan-400">((Date))</span>, and this agreement is
                intended to protect the confidential information disclosed by the
                Service Provider in the course of AIE subscription to{" "}
                <span className="font-bold text-cyan-400">((Name))</span>. This NDA is valid
                until fifteen years from the{" "}
                <span className="font-bold text-cyan-400">((Date))</span> of commencement.
              </p>
              <p className="mb-4">
                Confidential Information: Both parties agree that information
                disclosed orally or in writing or made available by the Service
                Provider to another Party including, but not limited to,
                information acquired from subscribers; trade secrets; strategic
                plans; invention plans and disclosures; customer information;
                computer programs; software codes; databases; suppliers; software;
                distribution channels; marketing studies; intellectual property;
                information relating to process and products, designs, business
                plans, business opportunities, marketing plans, finances,
                research, development, know-how or personnel; confidential
                information originally received:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  From third parties; information relating to any type of
                  technology, and all other material whether written or oral,
                  tangible or intangible, shall be deemed "Confidential
                  Information".
                </li>
                <li>
                  In addition, the existence and terms of this agreement shall
                  also be treated as Confidential Information. The parties agree
                  that any Confidential Information disclosed before the execution
                  of this agreement during the course of Subscription was intended
                  to be and shall be subject to the terms and conditions of this
                  Agreement.
                </li>
                <li>
                  The Subscriber expressly agrees that he/she shall not use
                  Confidential Information provided by the Company in the
                  development or delivery or for personal gain from providing of
                  any products or services for his/her account or the account of
                  any third party.
                </li>
                <li>
                  The subscriber shall protect the Confidential Information by
                  using the same degree of care, but no less than reasonable care,
                  to prevent the unauthorized use, dissemination, or publication
                  of the Confidential Information as the subscriber uses to
                  protect its Confidential Information. The subscriber shall limit
                  its internal disclosure of the Confidential Information to only
                  those subscribers and agents who need to know the information
                  for the limited purpose of executing his/her job responsibility.
                </li>
                <li>
                  The Subscriber agrees to maintain the confidentiality of the
                  Confidential Information and to prevent its unauthorized
                  dissemination or use for a period of Subscription tenure years
                  from the date of last disclosure by the Service Provider.
                </li>
                <li>
                  All Confidential Information, and all material items delivered
                  by the Service Provider to the subscriber, remain the property
                  of the Service Provider and no license or other rights in the
                  Confidential Information are granted to the subscriber by this
                  Agreement or by the act of disclosure.
                </li>
                <li>
                  The Subscriber agrees to not circumvent the Service Provider and
                  work with business associates, clients, and other third-party
                  vendors introduced by the Service Provider. This
                  non-circumvention provision shall expire at the end of
                  subscription tenure years from the disclosure from this company.
                </li>
                <li>
                  Upon the written request of the Service Provider, the Subscriber
                  shall return to it (or, at the request of the Service Provider,
                  erase or destroy) all materials that contain or embody any
                  Confidential Information of the Service Provider, including but
                  not limited to all computer programs, documentation, financial
                  statement, forms, notes, plans, drawings, customer information
                  and copies thereof. Return or destruction of such material shall
                  not relieve the subscriber of its obligations of
                  confidentiality. Upon the request of the Service Provider, the
                  subscriber will certify that it has complied with the provisions
                  of this paragraph.
                </li>
              </ul>
              <p className="mb-4">
                This Agreement shall survive and remain in effect and expressly
                terminated in writing and signed by all Parties, or until
                subscription tenure years from the date of termination of
                employment between the Services Provider and the Subscriber.
              </p>
            </section>

            {/* Memorandum of Understanding */}
            <section className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Memorandum of Understanding
              </h2>
              <p className="mb-4">
                The Subscriber should not start his or her own company/training
                institute or in any way indulge in the delivery of the above on or
                related to The Services Provider training Methods.
              </p>
              <p className="mb-4">
                The Subscriber agrees to retain said information as confidential
                and not to use said information on his or her behalf or disclose
                same to any third party.
              </p>
              <p className="mb-4">
                The subscriber has completed the payment of{" "}
                <span className="font-bold text-cyan-400">((Fee))</span> Including GST as
                acknowledged by the service provider as subscription fee for the
                One Month of the subscription.
              </p>
              <p className="mb-4">
                Please signify your agreement to the terms and conditions of this
                agreement by signing below.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;


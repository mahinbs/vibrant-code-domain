
export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  metrics: Record<string, string>;
  timeline: string;
  team: string;
  industry: string;
  testimonial: string;
  clientLogo: string;
  image: string;
  serviceId: string;
  liveUrl?: string;
  // Enhanced case study fields
  challenge: string;
  solution: string;
  approach: string[];
  gallery: string[];
  detailedMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  features: string[];
  extendedTestimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
}

export interface Service {
  id: string;
  icon: any;
  title: string;
  color: 'cyan' | 'blue' | 'purple' | 'pink' | 'green';
  projects: Project[];
}

export const projectsData: Service[] = [
  {
    id: 'web-apps',
    icon: null,
    title: 'Web Applications',
    color: 'cyan',
    projects: [
      {
        id: 'retailmax',
        title: 'RetailMax E-commerce Platform',
        client: 'RetailMax Inc.',
        description: 'Complete e-commerce solution with advanced inventory management and AI-powered recommendations.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
        metrics: { revenue: '+250%', conversion: '+45%', users: '50K+', sales: '$2.5M' },
        timeline: '12 weeks',
        team: '5 developers',
        industry: 'E-commerce',
        testimonial: 'The platform exceeded our expectations. Sales increased dramatically within the first month.',
        clientLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        serviceId: 'web-apps',
        liveUrl: 'https://retailmax-demo.vercel.app',
        challenge: 'RetailMax was struggling with an outdated e-commerce platform that couldn\'t handle their growing customer base and complex inventory needs. Their conversion rates were low, and they were losing sales due to poor user experience and slow loading times.',
        solution: 'We built a modern, scalable e-commerce platform from the ground up with AI-powered product recommendations, real-time inventory tracking, and a seamless checkout process that significantly improved user experience.',
        approach: [
          'Conducted comprehensive UX research and customer journey mapping',
          'Designed a responsive, mobile-first interface with intuitive navigation',
          'Implemented AI-powered recommendation engine using machine learning',
          'Built robust inventory management system with real-time updates',
          'Integrated secure payment processing with multiple payment options',
          'Deployed on scalable cloud infrastructure with CDN optimization'
        ],
        gallery: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        detailedMetrics: [
          { label: 'Revenue Growth', value: '+250%', description: 'Increased monthly revenue from $500K to $1.75M' },
          { label: 'Conversion Rate', value: '+45%', description: 'Improved from 2.1% to 3.7% conversion rate' },
          { label: 'Page Load Speed', value: '75% faster', description: 'Reduced average page load time from 4.2s to 1.1s' },
          { label: 'Customer Satisfaction', value: '96%', description: 'Post-launch customer satisfaction score' }
        ],
        techStack: [
          { category: 'Frontend', technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'React Query'] },
          { category: 'Backend', technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
          { category: 'Payment', technologies: ['Stripe', 'PayPal', 'Apple Pay', 'Google Pay'] },
          { category: 'Infrastructure', technologies: ['AWS', 'CloudFront', 'S3', 'Docker'] }
        ],
        features: [
          'AI-powered product recommendations',
          'Real-time inventory management',
          'Multi-currency support',
          'Advanced search and filtering',
          'Wishlist and favorites',
          'Order tracking and notifications',
          'Admin dashboard with analytics',
          'Mobile-responsive design'
        ],
        extendedTestimonial: {
          quote: 'Working with this team was exceptional. They didn\'t just build us a website - they created a complete digital transformation for our business. The results speak for themselves: our revenue has more than doubled, and our customers love the new experience.',
          author: 'Sarah Johnson',
          position: 'CEO',
          company: 'RetailMax Inc.'
        }
      },
      {
        id: 'medcare',
        title: 'MedCare Healthcare Portal',
        client: 'MedCare Systems',
        description: 'Patient management system with telemedicine capabilities and secure data handling.',
        technologies: ['React', 'TypeScript', 'Firebase', 'WebRTC', 'Socket.io'],
        metrics: { efficiency: '+60%', satisfaction: '95%', appointments: '10K+', cost: '-40%' },
        timeline: '16 weeks',
        team: '6 developers',
        industry: 'Healthcare',
        testimonial: 'Revolutionary improvement in patient care delivery and administrative efficiency.',
        clientLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        serviceId: 'web-apps',
        liveUrl: 'https://medcare-portal-demo.vercel.app',
        challenge: 'MedCare Systems needed a comprehensive digital solution to manage patient records, enable telemedicine consultations, and streamline administrative processes while ensuring HIPAA compliance and data security.',
        solution: 'We developed a secure, cloud-based healthcare portal that integrates patient management, telemedicine capabilities, and administrative tools in one unified platform with end-to-end encryption and compliance features.',
        approach: [
          'Conducted HIPAA compliance assessment and security audit',
          'Designed patient-centric interface with accessibility features',
          'Implemented secure video calling with WebRTC technology',
          'Built comprehensive patient record management system',
          'Created automated appointment scheduling and reminders',
          'Integrated with existing hospital management systems'
        ],
        gallery: [
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        detailedMetrics: [
          { label: 'Administrative Efficiency', value: '+60%', description: 'Reduced administrative overhead and processing time' },
          { label: 'Patient Satisfaction', value: '95%', description: 'Post-implementation patient satisfaction score' },
          { label: 'Telemedicine Adoption', value: '10K+ appointments', description: 'Successful virtual consultations conducted' },
          { label: 'Cost Reduction', value: '-40%', description: 'Operational cost savings through automation' }
        ],
        techStack: [
          { category: 'Frontend', technologies: ['React', 'TypeScript', 'Material-UI', 'React Hook Form'] },
          { category: 'Backend', technologies: ['Firebase', 'Cloud Functions', 'Firestore', 'Authentication'] },
          { category: 'Communication', technologies: ['WebRTC', 'Socket.io', 'Twilio', 'SendGrid'] },
          { category: 'Security', technologies: ['End-to-end encryption', 'HIPAA compliance', 'OAuth 2.0', 'SSL/TLS'] }
        ],
        features: [
          'Secure patient portal',
          'Video consultations',
          'Electronic health records',
          'Appointment scheduling',
          'Prescription management',
          'Medical billing integration',
          'Real-time notifications',
          'Multi-language support'
        ],
        extendedTestimonial: {
          quote: 'This platform has revolutionized how we deliver healthcare. Our patients love the convenience of virtual consultations, and our staff has become significantly more efficient. The security features give us complete confidence in protecting patient data.',
          author: 'Dr. Michael Chen',
          position: 'Chief Medical Officer',
          company: 'MedCare Systems'
        }
      }
    ]
  },
  {
    id: 'saas',
    icon: null,
    title: 'SAAS Solutions',
    color: 'blue',
    projects: [
      {
        id: 'projectflow',
        title: 'ProjectFlow Management Platform',
        client: 'TechCorp Solutions',
        description: 'Enterprise project management with real-time collaboration and advanced analytics.',
        technologies: ['React', 'AWS', 'Redis', 'WebSocket', 'GraphQL'],
        metrics: { productivity: '+75%', teams: '200+', projects: '5K+', time: '-50%' },
        timeline: '20 weeks',
        team: '8 developers',
        industry: 'Technology',
        testimonial: 'Transformed how our teams collaborate. Best investment we\'ve made in years.',
        clientLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        serviceId: 'saas',
        liveUrl: 'https://projectflow-demo.vercel.app',
        challenge: 'TechCorp Solutions was struggling with project visibility, team coordination, and resource allocation across multiple departments. Their existing tools were fragmented, leading to miscommunication and missed deadlines.',
        solution: 'We created a comprehensive project management platform that centralizes all project activities, provides real-time collaboration tools, and offers advanced analytics for better decision-making.',
        approach: [
          'Analyzed existing workflow patterns and pain points',
          'Designed intuitive dashboards for different user roles',
          'Implemented real-time collaboration features',
          'Built advanced reporting and analytics engine',
          'Created automated workflow and notification system',
          'Integrated with existing enterprise tools'
        ],
        gallery: [
          'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        detailedMetrics: [
          { label: 'Team Productivity', value: '+75%', description: 'Measured improvement in task completion rates' },
          { label: 'Active Teams', value: '200+', description: 'Teams actively using the platform daily' },
          { label: 'Projects Managed', value: '5K+', description: 'Total projects successfully managed' },
          { label: 'Time Savings', value: '-50%', description: 'Reduction in project planning and coordination time' }
        ],
        techStack: [
          { category: 'Frontend', technologies: ['React', 'Redux Toolkit', 'TypeScript', 'Ant Design'] },
          { category: 'Backend', technologies: ['Node.js', 'GraphQL', 'AWS Lambda', 'DynamoDB'] },
          { category: 'Real-time', technologies: ['WebSocket', 'Redis', 'Socket.io', 'AWS ElastiCache'] },
          { category: 'Analytics', technologies: ['D3.js', 'Chart.js', 'AWS QuickSight', 'ElasticSearch'] }
        ],
        features: [
          'Real-time project dashboards',
          'Team collaboration tools',
          'Advanced analytics and reporting',
          'Resource allocation management',
          'Automated workflow engine',
          'Time tracking and billing',
          'Custom project templates',
          'Mobile app support'
        ],
        extendedTestimonial: {
          quote: 'ProjectFlow has been a game-changer for our organization. We\'ve seen dramatic improvements in project delivery times and team satisfaction. The real-time collaboration features have made remote work seamless, and the analytics help us make data-driven decisions.',
          author: 'Jennifer Martinez',
          position: 'Director of Operations',
          company: 'TechCorp Solutions'
        }
      }
    ]
  },
  {
    id: 'ai-calling',
    icon: null,
    title: 'AI Calling Agency',
    color: 'pink',
    projects: [
      {
        id: 'leadgen',
        title: 'LeadGen AI System',
        client: 'SalesForce Pro',
        description: 'Intelligent lead generation system with natural conversation AI and CRM integration.',
        technologies: ['OpenAI', 'Twilio', 'Python', 'CRM APIs', 'NLP'],
        metrics: { leads: '+300%', conversion: '+85%', cost: '-60%', calls: '10K+ daily' },
        timeline: '10 weeks',
        team: '4 developers',
        industry: 'Sales & Marketing',
        testimonial: 'Game-changer for our sales team. The AI calls are indistinguishable from human agents.',
        clientLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        serviceId: 'ai-calling',
        liveUrl: 'https://leadgen-ai-demo.vercel.app',
        challenge: 'SalesForce Pro needed to scale their lead generation efforts but faced high costs and inconsistent quality with human agents. They required a solution that could make thousands of calls daily while maintaining natural, engaging conversations.',
        solution: 'We developed an AI-powered calling system that uses advanced natural language processing to conduct human-like conversations, qualify leads, and seamlessly integrate with their existing CRM workflow.',
        approach: [
          'Trained custom AI models on successful sales conversations',
          'Implemented natural language understanding and generation',
          'Built seamless CRM integration for lead management',
          'Created conversation flow optimization system',
          'Developed real-time sentiment analysis',
          'Implemented quality monitoring and improvement loops'
        ],
        gallery: [
          'https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        detailedMetrics: [
          { label: 'Lead Generation', value: '+300%', description: 'Increase in qualified leads generated monthly' },
          { label: 'Conversion Rate', value: '+85%', description: 'Improvement in lead-to-customer conversion' },
          { label: 'Cost Reduction', value: '-60%', description: 'Lower cost per lead compared to human agents' },
          { label: 'Daily Call Volume', value: '10K+', description: 'AI-powered calls handled daily' }
        ],
        techStack: [
          { category: 'AI/ML', technologies: ['OpenAI GPT-4', 'Custom NLP Models', 'TensorFlow', 'Sentiment Analysis'] },
          { category: 'Communication', technologies: ['Twilio Voice API', 'Speech-to-Text', 'Text-to-Speech', 'WebRTC'] },
          { category: 'Backend', technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
          { category: 'Integration', technologies: ['Salesforce API', 'HubSpot API', 'Zapier', 'Webhooks'] }
        ],
        features: [
          'Natural conversation AI',
          'Real-time sentiment analysis',
          'CRM auto-integration',
          'Call quality monitoring',
          'Lead scoring and qualification',
          'Multi-language support',
          'Voice synthesis and recognition',
          'Performance analytics dashboard'
        ],
        extendedTestimonial: {
          quote: 'The LeadGen AI system has completely transformed our sales process. Our team can now focus on closing qualified leads while the AI handles the initial outreach. The conversations are so natural that prospects often don\'t realize they\'re talking to an AI.',
          author: 'Robert Thompson',
          position: 'VP of Sales',
          company: 'SalesForce Pro'
        }
      }
    ]
  }
];

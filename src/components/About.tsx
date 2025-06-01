
import { CheckCircle, Users, Target, Award } from 'lucide-react';

const About = () => {
  const achievements = [
    'ISO 27001 Certified',
    'Agile Development Process',
    'Expert Team of 50+ Developers',
    '99.9% Uptime Guarantee',
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transforming Ideas into Digital Reality
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded in 2018, TechCorp has been at the forefront of software innovation, 
              helping businesses of all sizes achieve their digital transformation goals. 
              Our team of experienced developers, designers, and strategists work together 
              to deliver exceptional software solutions.
            </p>

            <div className="space-y-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{achievement}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Awards Won</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                To empower businesses through innovative software solutions that drive growth, 
                efficiency, and competitive advantage in an ever-evolving digital landscape.
              </p>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Core Values</h4>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Innovation & Excellence</li>
                  <li>• Client-Centric Approach</li>
                  <li>• Transparency & Trust</li>
                  <li>• Continuous Learning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

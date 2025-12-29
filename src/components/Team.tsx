
import { memo } from 'react';

const Team = memo(() => {
  const teamMembers = [
    {
      name: 'Mahin B S',
      role: 'Founder',
    },
    {
      name: 'Reshab Retheesh',
      role: 'CEO',
    },
    {
      name: 'Darshan R Krishnan',
      role: 'COO',
    },
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the leaders behind Boostmysites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div
                  aria-label={member.name}
                  className="w-48 h-48 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white text-4xl font-semibold will-change-transform group-hover:scale-105 transition-transform duration-300 select-none"
                >
                  {member.name
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join('')}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Team.displayName = 'Team';

export default Team;

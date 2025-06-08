
const WebAppsProcess = () => {
  const process = [
    { step: '01', title: 'Discovery', description: 'Understanding your requirements and business goals' },
    { step: '02', title: 'Design', description: 'Creating wireframes and user interface designs' },
    { step: '03', title: 'Development', description: 'Building your application with clean, maintainable code' },
    { step: '04', title: 'Testing', description: 'Rigorous testing across devices and browsers' },
    { step: '05', title: 'Deployment', description: 'Launching your application with monitoring and support' }
  ];

  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Development Process</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A proven methodology that ensures quality delivery and client satisfaction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {process.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebAppsProcess;

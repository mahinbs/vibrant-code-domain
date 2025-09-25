import { memo } from 'react';

const ClientLogos = memo(() => {
  const logos = [
    {
      name: "Microsoft",
      logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=120&h=40&fit=crop&auto=format",
      alt: "Microsoft Logo"
    },
    {
      name: "Google",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=40&fit=crop&auto=format",
      alt: "Google Logo"
    },
    {
      name: "Amazon",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=120&h=40&fit=crop&auto=format",
      alt: "Amazon Logo"
    },
    {
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=120&h=40&fit=crop&auto=format",
      alt: "Apple Logo"
    },
    {
      name: "IBM",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&auto=format",
      alt: "IBM Logo"
    },
    {
      name: "Oracle",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=40&fit=crop&auto=format",
      alt: "Oracle Logo"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-black/50 to-gray-900/50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-gray-300 text-lg font-medium mb-6">
            Trusted by Leading Enterprise Companies
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
          {logos.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
            >
              <img
                src={client.logo}
                alt={client.alt}
                className="h-8 md:h-10 w-auto filter brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Join 500+ companies that trust us with their digital transformation
          </p>
        </div>
      </div>
    </section>
  );
});

ClientLogos.displayName = "ClientLogos";

export default ClientLogos;
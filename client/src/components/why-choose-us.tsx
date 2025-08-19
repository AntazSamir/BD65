import { Shield, Users, FileText, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Security Assurance',
      description: 'Strong authentication system through multiple levels',
      learnMore: 'Learn More >',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Customer Support',
      description: 'Professional customer service 24 hours every day',
      learnMore: 'Learn More >',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Transparent Policies',
      description: 'Transparent service policies with very secure transaction and excellent',
      learnMore: 'Learn More >',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Reputable Affiliations',
      description: 'Partnerships through reputed local suppliers throughout the country',
      learnMore: 'Learn More >',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#fdf2f8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustrations */}
          <div className="relative h-96">
            {/* Main family/customer circle image */}
            <div className="absolute top-4 left-8">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                  alt="Happy family travelers"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Customer Service bubble */}
              <div className="absolute -top-2 -right-4 bg-white rounded-2xl px-4 py-2 shadow-lg">
                <div className="text-xs text-orange-500 font-medium">Customer Service</div>
                <div className="text-lg font-bold text-gray-900">+01 235 368</div>
              </div>
            </div>

            {/* Customer support circular image */}
            <div className="absolute top-16 right-4">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-md bg-teal-100 p-2">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Customer support"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Flight Tickets bubble */}
            <div className="absolute bottom-32 left-4 bg-white rounded-2xl px-4 py-2 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                    alt="Flight"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">Flight Tickets</span>
              </div>
            </div>

            {/* Tour Guide bubble */}
            <div className="absolute bottom-24 right-8 bg-white rounded-2xl px-4 py-2 shadow-md">
              <span className="text-sm font-medium text-gray-900">Tour Guide</span>
            </div>

            {/* Luggage with plant illustration */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Luggage base */}
                <div className="w-28 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg relative">
                  {/* Luggage handle */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-600 rounded-full"></div>
                  {/* Luggage corners */}
                  <div className="absolute inset-1 border-2 border-orange-700 rounded-md"></div>
                </div>
                
                {/* Hat on luggage */}
                <div className="absolute -top-3 right-2">
                  <div className="w-8 h-6 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full shadow-sm"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-amber-300 rounded-full"></div>
                </div>
                
                {/* Plant decoration */}
                <div className="absolute -top-4 -left-4">
                  <div className="w-12 h-16 relative">
                    {/* Plant pot/leaves */}
                    <div className="absolute bottom-0 w-3 h-8 bg-green-500 rounded-full transform rotate-12"></div>
                    <div className="absolute bottom-0 left-2 w-3 h-10 bg-green-400 rounded-full transform -rotate-12"></div>
                    <div className="absolute bottom-0 left-4 w-3 h-6 bg-green-600 rounded-full transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why choose us
            </h2>
            <p className="text-gray-600 mb-8">
              Because more than 268 other customers trust us
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const icons = [Shield, Users, FileText, Award];
                const IconComponent = icons[index];
                
                return (
                  <div key={index} className="space-y-3">
                    <div className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      {feature.learnMore}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

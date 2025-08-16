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
          <div className="relative">
            {/* Main illustration placeholder */}
            <div className="relative bg-white rounded-xl p-8 shadow-lg mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">+01 235 568</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            
            {/* Flight Tickets illustration */}
            <div className="absolute -left-8 top-20 bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                  <span className="text-xs">✈️</span>
                </div>
                <span className="text-sm font-medium">Flight Tickets</span>
              </div>
            </div>
            
            {/* Top Deals illustration */}
            <div className="absolute -right-4 top-12 bg-white rounded-lg p-3 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-xs">🏷️</span>
                </div>
                <span className="text-sm font-medium">Top Deals</span>
              </div>
            </div>
            
            {/* Luggage illustration */}
            <div className="w-32 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg mx-auto mt-8 relative">
              <div className="absolute inset-2 bg-orange-400 rounded-md"></div>
              <div className="absolute top-1 right-1 w-4 h-2 bg-green-400 rounded-full"></div>
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

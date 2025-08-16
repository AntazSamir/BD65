import { Shield, Headphones, DollarSign, Heart } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your transactions are protected with bank-level security',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help anytime, anywhere with our dedicated support team',
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'We guarantee the best prices or we\'ll match the difference',
    },
    {
      icon: Heart,
      title: 'Expert Curation',
      description: 'Hand-picked destinations and accommodations by travel experts',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Bangladesh Explorer?</h2>
          <p className="text-xl opacity-90">Your trusted partner for authentic Bangladesh travel experiences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

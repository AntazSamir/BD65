import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { MapPin, Users, Award, Heart, Shield, Compass } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Users, number: "50K+", label: "Happy Travelers" },
    { icon: MapPin, number: "100+", label: "Destinations Covered" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Heart, number: "99%", label: "Customer Satisfaction" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We prioritize your safety with verified accommodations and experienced local guides."
    },
    {
      icon: Compass,
      title: "Authentic Experiences",
      description: "Discover the real Bangladesh through carefully curated local experiences and hidden gems."
    },
    {
      icon: Heart,
      title: "Passionate Service",
      description: "Our team of travel enthusiasts is dedicated to making your Bangladesh journey unforgettable."
    },
  ];

  const team = [
    {
      name: "Rashid Ahmed",
      role: "Founder & CEO",
      bio: "Travel enthusiast with 15+ years exploring Bangladesh's hidden treasures.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    },
    {
      name: "Fatima Rahman",
      role: "Head of Operations",
      bio: "Expert in sustainable tourism and local community partnerships.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    },
    {
      name: "Karim Hassan",
      role: "Lead Tour Guide",
      bio: "Born and raised in Bangladesh, passionate about sharing local culture and stories.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    },
  ];

  return (
    <div className="min-h-screen section-bg-cool">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')"
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Bangladesh Explorer</h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Your trusted partner in discovering the beauty, culture, and heritage of Bangladesh through authentic travel experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                Bangladesh Explorer was founded in 2009 with a simple mission: to showcase the incredible beauty and rich cultural heritage of Bangladesh to the world. What started as a small local tour company has grown into the country's leading travel platform, helping over 50,000 travelers discover Bangladesh's hidden gems.
              </p>
              <p>
                From the world's longest natural sea beach at Cox's Bazar to the mystical mangrove forests of the Sundarbans, from the rolling tea gardens of Sylhet to the ancient archaeological wonders of Paharpur, we specialize in creating authentic experiences that connect travelers with the heart and soul of Bangladesh.
              </p>
              <p>
                Our commitment goes beyond tourism. We work closely with local communities, support sustainable travel practices, and contribute to the preservation of Bangladesh's natural and cultural heritage for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 section-bg-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="icon-bg-green">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in Bangladesh tourism</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center elegant-card p-6 hover-lift transition-butter">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 section-bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="icon-bg-purple">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center elegant-card p-6 hover-lift transition-butter">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 section-bg-cool">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="icon-bg-orange">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Bangladesh Explorer</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="elegant-card p-8 text-center hover-lift transition-butter">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl leading-relaxed">
            To make Bangladesh's natural beauty and cultural richness accessible to travelers from around the world while supporting local communities and promoting sustainable tourism practices. We believe every journey should be transformative, connecting people with places and creating memories that last a lifetime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
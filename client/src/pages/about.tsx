import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { MapPin, Users, Award, Heart, Shield, Compass, Star, Globe, Camera, Plane, Mountain, Waves } from 'lucide-react';

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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Simple Illustrations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-blue-200">
            <Mountain className="w-16 h-16" />
          </div>
          <div className="absolute top-16 right-16 text-teal-200">
            <Waves className="w-14 h-14" />
          </div>
          <div className="absolute bottom-20 left-20 text-green-200">
            <Camera className="w-12 h-12" />
          </div>
          <div className="absolute bottom-16 right-12 text-purple-200">
            <Plane className="w-14 h-14" />
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-6">
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            About Bangladesh Explorer
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Your trusted partner in discovering the beauty, culture, and heritage of Bangladesh through authentic travel experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mb-4">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
          </div>
          
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-gray-700 leading-relaxed">
                  Bangladesh Explorer was founded in 2009 with a simple mission: to showcase the incredible beauty and rich cultural heritage of Bangladesh to the world. What started as a small local tour company has grown into the country's leading travel platform, helping over 50,000 travelers discover Bangladesh's hidden gems.
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-gray-700 leading-relaxed">
                  From the world's longest natural sea beach at Cox's Bazar to the mystical mangrove forests of the Sundarbans, from the rolling tea gardens of Sylhet to the ancient archaeological wonders of Paharpur, we specialize in creating authentic experiences that connect travelers with the heart and soul of Bangladesh.
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-gray-700 leading-relaxed">
                  Our commitment goes beyond tourism. We work closely with local communities, support sustainable travel practices, and contribute to the preservation of Bangladesh's natural and cultural heritage for future generations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in Bangladesh tourism</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const colors = [
                { bg: 'bg-amber-100', icon: 'text-amber-600', text: 'text-amber-700' },
                { bg: 'bg-blue-100', icon: 'text-blue-600', text: 'text-blue-700' }, 
                { bg: 'bg-emerald-100', icon: 'text-emerald-600', text: 'text-emerald-700' },
                { bg: 'bg-rose-100', icon: 'text-rose-600', text: 'text-rose-700' }
              ];
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${colors[index].bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${colors[index].icon}`} />
                  </div>
                  <div className={`text-3xl font-bold ${colors[index].text} mb-2`}>{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const colors = [
                { bg: 'bg-sky-100', icon: 'text-sky-600', border: 'border-sky-200' },
                { bg: 'bg-teal-100', icon: 'text-teal-600', border: 'border-teal-200' },
                { bg: 'bg-pink-100', icon: 'text-pink-600', border: 'border-pink-200' }
              ];
              return (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm border ${colors[index].border} text-center`}>
                  <div className={`w-14 h-14 ${colors[index].bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className={`w-7 h-7 ${colors[index].icon}`} />
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Bangladesh Explorer</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const colors = [
                'bg-blue-50 border-blue-200',
                'bg-purple-50 border-purple-200', 
                'bg-green-50 border-green-200'
              ];
              const roleColors = [
                'text-blue-600',
                'text-purple-600',
                'text-green-600'
              ];
              return (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm border ${colors[index]} text-center`}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className={`font-medium mb-4 ${roleColors[index]}`}>{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Compass className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          
          <div className="bg-white/10 rounded-2xl p-8">
            <p className="text-lg md:text-xl leading-relaxed">
              To make Bangladesh's natural beauty and cultural richness accessible to travelers from around the world while supporting local communities and promoting sustainable tourism practices. We believe every journey should be transformative, connecting people with places and creating memories that last a lifetime.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-white text-sm font-medium">🌱 Sustainable Tourism</span>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-white text-sm font-medium">🤝 Community Support</span>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-white text-sm font-medium">✨ Authentic Experiences</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
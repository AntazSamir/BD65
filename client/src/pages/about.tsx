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
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300/15 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-purple-300/10 rounded-full animate-pulse"></div>
          
          {/* Geometric Patterns */}
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Floating Icons */}
          <div className="absolute top-8 left-8 text-white/30 animate-float">
            <Mountain className="w-12 h-12" />
          </div>
          <div className="absolute top-16 right-12 text-white/30 animate-float" style={{animationDelay: '1s'}}>
            <Waves className="w-10 h-10" />
          </div>
          <div className="absolute bottom-8 left-16 text-white/30 animate-float" style={{animationDelay: '2s'}}>
            <Camera className="w-8 h-8" />
          </div>
          <div className="absolute bottom-16 right-8 text-white/30 animate-float" style={{animationDelay: '0.5s'}}>
            <Plane className="w-10 h-10" />
          </div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <Globe className="w-10 h-10 text-white animate-spin-slow" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            About Bangladesh Explorer
          </h1>
          <p className="text-xl md:text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
            Your trusted partner in discovering the beauty, culture, and heritage of Bangladesh through authentic travel experiences.
          </p>
          
          {/* Decorative Stars */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-300 fill-current animate-twinkle" style={{animationDelay: `${i * 0.2}s`}} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(-45deg, transparent 24%, rgba(16, 185, 129, 0.05) 25%, rgba(16, 185, 129, 0.05) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.05) 75%, rgba(16, 185, 129, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-8">Our Story</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg text-gray-700 leading-relaxed">
                    Bangladesh Explorer was founded in 2009 with a simple mission: to showcase the incredible beauty and rich cultural heritage of Bangladesh to the world. What started as a small local tour company has grown into the country's leading travel platform, helping over 50,000 travelers discover Bangladesh's hidden gems.
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg text-gray-700 leading-relaxed">
                    From the world's longest natural sea beach at Cox's Bazar to the mystical mangrove forests of the Sundarbans, from the rolling tea gardens of Sylhet to the ancient archaeological wonders of Paharpur, we specialize in creating authentic experiences that connect travelers with the heart and soul of Bangladesh.
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg text-gray-700 leading-relaxed">
                    Our commitment goes beyond tourism. We work closely with local communities, support sustainable travel practices, and contribute to the preservation of Bangladesh's natural and cultural heritage for future generations.
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Side Panel */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white text-center">
                <Globe className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-2">15+ Years</h3>
                <p className="text-blue-100">Exploring Bangladesh</p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-green-600 rounded-3xl p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                <p className="text-teal-100">Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-10 right-1/3 w-20 h-20 bg-white/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-pink-100">Making a difference in Bangladesh tourism</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const gradients = [
                'from-yellow-400 to-orange-500',
                'from-blue-400 to-indigo-500', 
                'from-green-400 to-teal-500',
                'from-pink-400 to-purple-500'
              ];
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${gradients[index]} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">{stat.number}</div>
                  <div className="text-pink-100 font-medium text-lg">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const colors = [
                { bg: 'from-blue-500 to-cyan-500', card: 'border-blue-200' },
                { bg: 'from-emerald-500 to-teal-500', card: 'border-emerald-200' },
                { bg: 'from-pink-500 to-rose-500', card: 'border-pink-200' }
              ];
              return (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 ${colors[index].card} text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${colors[index].bg} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-teal-200/30 to-green-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Bangladesh Explorer</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => {
              const gradients = [
                'from-blue-500 to-indigo-600',
                'from-purple-500 to-pink-600', 
                'from-teal-500 to-green-600'
              ];
              return (
                <div key={index} className="group">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center transform group-hover:-translate-y-3 transition-all duration-500 border border-white/50">
                    <div className="relative mb-8">
                      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index]} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="relative w-28 h-28 rounded-full object-cover mx-auto shadow-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">{member.name}</h3>
                    <p className={`text-lg font-semibold mb-4 bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent`}>{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          
          {/* Wave Pattern */}
          <div className="absolute bottom-0 left-0 right-0" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            height: '200px',
            transform: 'skewY(-2deg)'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <Compass className="w-10 h-10 text-white animate-spin-slow" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">Our Mission</h2>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20">
            <p className="text-xl md:text-2xl leading-relaxed text-cyan-50">
              To make Bangladesh's natural beauty and cultural richness accessible to travelers from around the world while supporting local communities and promoting sustainable tourism practices. We believe every journey should be transformative, connecting people with places and creating memories that last a lifetime.
            </p>
          </div>
          
          {/* Call to Action */}
          <div className="mt-12 flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30">
              <span className="text-cyan-100 font-semibold">🌱 Sustainable Tourism</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30">
              <span className="text-cyan-100 font-semibold">🤝 Community Support</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30">
              <span className="text-cyan-100 font-semibold">✨ Authentic Experiences</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
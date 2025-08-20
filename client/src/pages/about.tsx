import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { MapPin, Users, Award, Heart, Shield, Compass, Globe, Camera, Star, Plane, Mountain, Waves, TreePine, Sun, Moon, Coffee, Map, Anchor, Binoculars, Fish, Bird, Calendar } from 'lucide-react';

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
      <section className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-primary/10 px-6 py-3 rounded-full mb-8">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Discover Bangladesh</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">BD Explorer</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in discovering the beauty, culture, and heritage of Bangladesh through authentic travel experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="elegant-card p-8 text-center hover-lift transition-butter">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Authentic Experiences</h3>
                <p className="text-gray-600">Discover the real Bangladesh through local insights and hidden gems</p>
              </div>
              
              <div className="elegant-card p-8 text-center hover-lift transition-butter">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Safe & Reliable</h3>
                <p className="text-gray-600">Travel with confidence knowing you're in experienced hands</p>
              </div>
              
              <div className="elegant-card p-8 text-center hover-lift transition-butter">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Passionate Service</h3>
                <p className="text-gray-600">Dedicated team committed to making your journey unforgettable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex justify-center py-8">
        <div className="flex items-center space-x-4">
          <Compass className="w-6 h-6 text-primary" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
          <Star className="w-6 h-6 text-secondary" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
          <Compass className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Map className="absolute top-10 right-10 w-32 h-32 text-gray-100" />
          <TreePine className="absolute bottom-20 left-10 w-24 h-24 text-gray-50" />
          <Camera className="absolute top-1/3 left-1/4 w-16 h-16 text-gray-100" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="icon-bg-blue">
                <Map className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="elegant-card p-6 text-center hover-lift transition-butter">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Founded 2009</h3>
                <p className="text-sm text-gray-600">Started as a local tour company</p>
              </div>
              
              <div className="elegant-card p-6 text-center hover-lift transition-butter">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">50K+ Travelers</h3>
                <p className="text-sm text-gray-600">Served happy customers</p>
              </div>
              
              <div className="elegant-card p-6 text-center hover-lift transition-butter">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Leading Platform</h3>
                <p className="text-sm text-gray-600">Bangladesh's top travel company</p>
              </div>
            </div>
            
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <div className="elegant-card p-8 text-left">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <p>
                    BD Explorer was founded in 2009 with a simple mission: to showcase the incredible beauty and rich cultural heritage of Bangladesh to the world. What started as a small local tour company has grown into the country's leading travel platform, helping over 50,000 travelers discover Bangladesh's hidden gems.
                  </p>
                </div>
              </div>
              
              <div className="elegant-card p-8 text-left">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Mountain className="w-6 h-6 text-secondary" />
                  </div>
                  <p>
                    From the world's longest natural sea beach at Cox's Bazar to the mystical mangrove forests of the Sundarbans, from the rolling tea gardens of Sylhet to the ancient archaeological wonders of Paharpur, we specialize in creating authentic experiences that connect travelers with the heart and soul of Bangladesh.
                  </p>
                </div>
              </div>
              
              <div className="elegant-card p-8 text-left">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <p>
                    Our commitment goes beyond tourism. We work closely with local communities, support sustainable travel practices, and contribute to the preservation of Bangladesh's natural and cultural heritage for future generations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 section-bg-soft relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="icon-bg-green">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in Bangladesh tourism</p>
          </div>
          
          {/* Simplified stats layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const colors = [
                { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600' },
                { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600' },
                { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-600' },
                { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600' }
              ];
              
              return (
                <div key={index} className={`elegant-card p-8 text-center hover-lift transition-all duration-300 transform hover:scale-105 ${colors[index].light} border-2 border-transparent hover:border-gray-200`}>
                  <div className={`w-20 h-20 ${colors[index].bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className={`text-4xl font-bold ${colors[index].text} mb-3`}>{stat.number}</div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                  
                  {/* Decorative elements */}
                  <div className="mt-6 flex justify-center space-x-2">
                    <div className={`w-2 h-2 ${colors[index].bg} rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.2}s` }}></div>
                    <div className={`w-2 h-2 ${colors[index].bg} rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.2 + 0.1}s` }}></div>
                    <div className={`w-2 h-2 ${colors[index].bg} rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.2 + 0.2}s` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 section-bg-warm relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="icon-bg-purple">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          
          {/* Creative zigzag values layout */}
          <div className="space-y-16">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const isLeft = index % 2 === 0;
              const colors = [
                { primary: 'bg-gradient-to-br from-rose-500 to-pink-600', light: 'bg-rose-50', accent: 'text-rose-600', shadow: 'shadow-rose-200' },
                { primary: 'bg-gradient-to-br from-emerald-500 to-green-600', light: 'bg-emerald-50', accent: 'text-emerald-600', shadow: 'shadow-emerald-200' },
                { primary: 'bg-gradient-to-br from-blue-500 to-indigo-600', light: 'bg-blue-50', accent: 'text-blue-600', shadow: 'shadow-blue-200' }
              ];
              
              return (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  !isLeft ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* Icon Section */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {/* Large decorative circle */}
                      <div className={`w-40 h-40 ${colors[index].primary} rounded-full flex items-center justify-center shadow-2xl ${colors[index].shadow} transform hover:scale-110 transition-all duration-300`}>
                        <IconComponent className="w-20 h-20 text-white" />
                      </div>
                      
                      {/* Floating elements */}
                      <div className={`absolute -top-4 -right-4 w-8 h-8 ${colors[index].light} rounded-full border-4 border-white shadow-lg animate-bounce`} style={{ animationDelay: `${index * 0.3}s` }}></div>
                      <div className={`absolute -bottom-4 -left-4 w-6 h-6 ${colors[index].primary} rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.5}s` }}></div>
                      
                      {/* Number indicator */}
                      <div className="absolute -top-2 -left-2 w-12 h-12 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center shadow-lg">
                        <span className={`text-2xl font-bold ${colors[index].accent}`}>{index + 1}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={`flex-1 text-center lg:text-${isLeft ? 'left' : 'right'}`}>
                    <div className={`elegant-card p-8 lg:p-10 ${colors[index].light} border-l-4 border-${colors[index].primary.split('-')[2]}-500 hover-lift transition-all duration-300`}>
                      
                      {/* Title with decorative elements */}
                      <div className="mb-6">
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{value.title}</h3>
                        <div className={`w-24 h-1 ${colors[index].primary} mx-auto lg:mx-0 ${!isLeft ? 'lg:ml-auto lg:mr-0' : ''} rounded-full`}></div>
                      </div>
                      
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">{value.description}</p>
                      
                      {/* Feature highlights */}
                      <div className={`inline-flex items-center space-x-2 ${colors[index].light} px-4 py-2 rounded-full border border-${colors[index].primary.split('-')[2]}-200`}>
                        <div className={`w-3 h-3 ${colors[index].primary} rounded-full animate-pulse`}></div>
                        <span className={`text-sm font-medium ${colors[index].accent}`}>Core Value #{index + 1}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting arrow for large screens */}
                  {index < values.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-32">
                      <div className={`w-1 h-16 ${colors[index].primary} opacity-30`}></div>
                      <div className={`w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-${colors[index].primary.split('-')[2]}-400 mx-auto`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 section-bg-cool relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="icon-bg-orange">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind BD Explorer</p>
          </div>
          
          {/* Creative polaroid-style team layout */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 space-y-12 lg:space-y-0">
              {team.map((member, index) => {
                const rotations = ['lg:rotate-[-8deg]', 'lg:rotate-[4deg]', 'lg:rotate-[-6deg]'];
                const translations = ['lg:translate-y-8', 'lg:-translate-y-4', 'lg:translate-y-12'];
                const bgColors = ['bg-gradient-to-br from-blue-50 to-blue-100', 'bg-gradient-to-br from-green-50 to-green-100', 'bg-gradient-to-br from-purple-50 to-purple-100'];
                
                return (
                  <div 
                    key={index} 
                    className={`relative group hover:scale-105 hover:rotate-0 transition-all duration-500 transform ${
                      rotations[index]
                    } ${translations[index]}`}
                  >
                    {/* Polaroid-style card */}
                    <div className={`${bgColors[index]} p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 max-w-sm`}>
                      {/* Photo frame */}
                      <div className="relative mb-6">
                        <div className="w-full h-48 bg-white rounded-xl p-3 shadow-inner">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full rounded-lg object-cover"
                          />
                        </div>
                        
                        {/* Photo corners */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                      
                      {/* Text content */}
                      <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                        <div className="inline-block bg-white px-4 py-2 rounded-full">
                          <p className="text-primary font-semibold text-sm">{member.role}</p>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed px-2">{member.bio}</p>
                      </div>
                      
                      {/* Decorative tape */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-yellow-200 rounded-sm opacity-80 rotate-12 shadow-sm"></div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-sm opacity-60 rotate-12"></div>
                      
                      {/* Index number */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Connecting lines */}
                    {index < team.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2 z-10"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Team connection visualization */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                <defs>
                  <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="rgb(139, 69, 19)" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M200,200 Q400,150 600,200" stroke="url(#teamGradient)" strokeWidth="3" fill="none" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <Sun className="absolute top-10 left-10 w-20 h-20 text-white/10" />
          <Moon className="absolute top-20 right-20 w-16 h-16 text-white/10" />
          <TreePine className="absolute bottom-10 left-1/4 w-24 h-24 text-white/10" />
          <Waves className="absolute bottom-20 right-1/4 w-28 h-28 text-white/10" />
          <Bird className="absolute top-1/3 right-10 w-12 h-12 text-white/15 animate-pulse" />
          <Fish className="absolute bottom-1/3 left-10 w-14 h-14 text-white/15" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Compass className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover-lift transition-butter">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Global Accessibility</h3>
              <p className="text-sm opacity-90">Making Bangladesh accessible to world travelers</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover-lift transition-butter">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Community Support</h3>
              <p className="text-sm opacity-90">Supporting local communities and culture</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover-lift transition-butter">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Sustainability</h3>
              <p className="text-sm opacity-90">Promoting eco-friendly travel practices</p>
            </div>
          </div>
          
          <p className="text-xl leading-relaxed bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            To make Bangladesh's natural beauty and cultural richness accessible to travelers from around the world while supporting local communities and promoting sustainable tourism practices. We believe every journey should be transformative, connecting people with places and creating memories that last a lifetime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { Star, Quote, Heart, MapPin } from 'lucide-react';
import { testimonials } from '../data/travel-data';

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-primary rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
            <Heart className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover why thousands of travelers choose Bangladesh Explorer for their unforgettable journeys
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <div className="w-3 h-3 bg-accent rounded-full mx-4"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-primary to-accent rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              data-testid={`card-testimonial-${testimonial.id}`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Rating stars */}
              <div className="flex items-center mb-6 pt-4">
                <div className="flex text-amber-400 mr-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {testimonial.rating}.0 Rating
                </div>
              </div>
              
              {/* Comment */}
              <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed font-medium italic" data-testid={`text-testimonial-comment-${testimonial.id}`}>
                "{testimonial.comment}"
              </blockquote>
              
              {/* Profile section */}
              <div className="flex items-center pt-6 border-t border-gray-100">
                <div className="relative">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                    data-testid={`img-testimonial-avatar-${testimonial.id}`}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-bold text-gray-900 text-lg" data-testid={`text-testimonial-name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm" data-testid={`text-testimonial-location-${testimonial.id}`}>
                    <MapPin className="w-3 h-3 mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            Join thousands of happy travelers who trust Bangladesh Explorer
          </p>
        </div>
      </div>
    </section>
  );
}

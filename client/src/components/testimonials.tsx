import { Star } from 'lucide-react';
import { testimonials } from '../data/travel-data';

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600">Real experiences from real adventurers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg" data-testid={`card-testimonial-${testimonial.id}`}>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6" data-testid={`text-testimonial-comment-${testimonial.id}`}>"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid={`img-testimonial-avatar-${testimonial.id}`}
                />
                <div>
                  <div className="font-semibold" data-testid={`text-testimonial-name-${testimonial.id}`}>{testimonial.name}</div>
                  <div className="text-sm text-gray-500" data-testid={`text-testimonial-location-${testimonial.id}`}>{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

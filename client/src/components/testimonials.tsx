import { Star } from 'lucide-react';
import { testimonials } from '../data/travel-data';

export default function Testimonials() {
  return (
    <section className="py-16 section-bg-cool">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="icon-bg-green">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600">Real experiences from real adventurers</p>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="elegant-card p-8 hover-lift transition-butter animate-fade-in" data-testid={`card-testimonial-${testimonial.id}`}>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-base" data-testid={`text-testimonial-comment-${testimonial.id}`}>"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid={`img-testimonial-avatar-${testimonial.id}`}
                />
                <div>
                  <div className="font-semibold text-base" data-testid={`text-testimonial-name-${testimonial.id}`}>{testimonial.name}</div>
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

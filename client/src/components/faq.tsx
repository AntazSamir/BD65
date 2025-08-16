import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the best time to visit Bangladesh?",
    answer: "The best time to visit Bangladesh is during the cool, dry season from October to March. This period offers pleasant weather with lower humidity and minimal rainfall, perfect for sightseeing and outdoor activities."
  },
  {
    question: "Do I need a visa to visit Bangladesh?",
    answer: "Most visitors need a visa to enter Bangladesh. You can apply for a tourist visa online or at a Bangladesh embassy. Some countries are eligible for visa-on-arrival. Check with your local Bangladesh embassy for specific requirements."
  },
  {
    question: "What currency is used in Bangladesh?",
    answer: "The currency of Bangladesh is the Bangladeshi Taka (BDT), symbolized as ৳. Major credit cards are accepted in hotels and restaurants in big cities, but it's advisable to carry cash for local markets and smaller establishments."
  },
  {
    question: "Is Bangladesh safe for tourists?",
    answer: "Bangladesh is generally safe for tourists. Like any destination, it's important to stay aware of your surroundings, avoid isolated areas at night, and follow local guidelines. Our tours include experienced local guides for added safety."
  },
  {
    question: "What languages are spoken in Bangladesh?",
    answer: "Bengali (Bangla) is the official language of Bangladesh. English is widely spoken in tourist areas, hotels, and by educated locals, especially in major cities like Dhaka and Chittagong."
  },
  {
    question: "What should I pack for my trip to Bangladesh?",
    answer: "Pack lightweight, breathable clothing, comfortable walking shoes, sunscreen, insect repellent, and modest attire for visiting religious sites. During monsoon season (June-September), waterproof clothing is essential."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about traveling to Bangladesh</p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  HelpCircle, 
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  AlertCircle,
  Info,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

// Form schema for support ticket
const supportFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  category: z.string().min(1, 'Please select a category'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  priority: z.string().min(1, 'Please select a priority level'),
});

type SupportFormData = z.infer<typeof supportFormSchema>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      message: '',
      priority: '',
    },
  });

  // FAQ data
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I book a hotel or flight through BD Explorer?',
      answer: 'To book accommodations or flights, navigate to the Hotels or Trip Planner section, use our search filters to find options that match your preferences, select your desired option, and follow the booking process. You can pay securely through our integrated payment system.',
      category: 'booking'
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, mobile banking (bKash, Nagad, Rocket), and bank transfers. All payments are processed securely through our encrypted payment gateway.',
      category: 'payment'
    },
    {
      id: '3',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify most bookings. The cancellation policy depends on the specific hotel, flight, or service provider. Please check the cancellation terms during booking or contact our support team for assistance.',
      category: 'booking'
    },
    {
      id: '4',
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we partner with leading insurance providers to offer comprehensive travel insurance covering trip cancellation, medical emergencies, lost luggage, and more. You can add insurance during the booking process.',
      category: 'services'
    },
    {
      id: '5',
      question: 'What destinations does BD Explorer cover?',
      answer: 'BD Explorer specializes in Bangladesh tourism, covering all major destinations including Cox\'s Bazar, Sundarbans, Sylhet Tea Gardens, Saint Martin Island, Chittagong Hill Tracts, and many more beautiful locations across Bangladesh.',
      category: 'destinations'
    },
    {
      id: '6',
      question: 'How can I get a refund for my booking?',
      answer: 'Refund eligibility depends on the cancellation policy of your specific booking. Most refunds are processed within 5-7 business days. Contact our support team with your booking reference number to initiate a refund request.',
      category: 'payment'
    },
    {
      id: '7',
      question: 'Do you provide 24/7 customer support?',
      answer: 'Yes, our customer support team is available 24/7 to assist you. You can reach us via phone, email, live chat, or by submitting a support ticket through this page.',
      category: 'support'
    },
    {
      id: '8',
      question: 'Are there group booking discounts available?',
      answer: 'Yes, we offer special rates for group bookings (10+ people). Contact our group booking specialists for customized packages and discounted rates for your group travel needs.',
      category: 'booking'
    },
    {
      id: '9',
      question: 'How do I create an account on BD Explorer?',
      answer: 'You can create an account by clicking the "Sign Up" button in the top navigation. You\'ll need to provide your email, create a password, and verify your email address. Having an account allows you to track bookings and receive personalized recommendations.',
      category: 'account'
    },
    {
      id: '10',
      question: 'What if I need special assistance during my trip?',
      answer: 'We provide 24/7 travel assistance for all our customers. If you need help during your trip, contact our emergency support line. We can assist with rebooking, emergency accommodations, medical assistance referrals, and more.',
      category: 'services'
    }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onSubmit = async (data: SupportFormData) => {
    console.log('Support form submitted:', data);
    // Here you would typically send the data to your API
    setFormSubmitted(true);
    form.reset();
  };

  return (
    <div className="min-h-screen section-bg-soft">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="icon-bg-blue">
              <Headphones className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get instant support for your travel needs. Our expert team is here to assist you 24/7 with bookings, payments, and travel guidance.
          </p>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="relative -mt-8 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="elegant-card hover-lift">
              <CardContent className="p-6 text-center">
                <div className="icon-bg-green mb-4 mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">Speak directly with our support team</p>
                <div className="space-y-1">
                  <p className="font-medium text-blue-600">+880 1711-123456</p>
                  <p className="font-medium text-blue-600">+880 2-9876543</p>
                </div>
                <Badge className="mt-3 bg-green-100 text-green-800">24/7 Available</Badge>
              </CardContent>
            </Card>

            <Card className="elegant-card hover-lift">
              <CardContent className="p-6 text-center">
                <div className="icon-bg-orange mb-4 mx-auto">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-3">Get instant help through chat</p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Start Chat
                </Button>
                <Badge className="mt-3 bg-orange-100 text-orange-800">Average response: 2 min</Badge>
              </CardContent>
            </Card>

            <Card className="elegant-card hover-lift">
              <CardContent className="p-6 text-center">
                <div className="icon-bg-purple mb-4 mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-3">Send us detailed inquiries</p>
                <div className="space-y-1">
                  <p className="font-medium text-blue-600">support@bdexplorer.com</p>
                  <p className="font-medium text-blue-600">booking@bdexplorer.com</p>
                </div>
                <Badge className="mt-3 bg-purple-100 text-purple-800">Response within 2 hours</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Privacy Policy & Terms Section */}
            <div className="mb-12">
              <div className="flex justify-center mb-4">
                <div className="icon-bg-purple">
                  <Info className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Legal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Privacy Policy Card */}
                <Card className="elegant-card hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="icon-bg-blue mr-3">
                        <Info className="w-5 h-5" />
                      </div>
                      Privacy Policy
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your privacy is important to us. Learn how we collect, use, and protect your personal information.
                    </p>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>We encrypt all personal data</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>No data sharing with third parties</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Secure payment processing</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>GDPR compliant data handling</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" data-testid="button-privacy-policy">
                      Read Full Privacy Policy
                    </Button>
                  </CardContent>
                </Card>

                {/* Terms of Service Card */}
                <Card className="elegant-card hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="icon-bg-orange mr-3">
                        <Info className="w-5 h-5" />
                      </div>
                      Terms of Service
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Understand the terms and conditions that govern your use of BD Explorer services.
                    </p>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Fair booking and cancellation policies</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>User rights and responsibilities</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Service availability and limitations</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Dispute resolution process</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" data-testid="button-terms-service">
                      Read Full Terms of Service
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="icon-bg-blue">
                  <HelpCircle className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Find quick answers to common questions about BD Explorer services
              </p>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-faq-search"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48" data-testid="select-faq-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="destinations">Destinations</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* FAQ Accordion */}
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="elegant-card border-0"
                      data-testid={`faq-item-${faq.id}`}
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                        <div className="flex items-start space-x-3">
                          <Badge variant="secondary" className="mt-1 capitalize">
                            {faq.category}
                          </Badge>
                          <span className="font-medium text-gray-900">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No FAQs Found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* Support Form Sidebar */}
          <div className="lg:col-span-1">
            <Card className="elegant-card sticky top-8">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="icon-bg-green">
                    <Send className="w-6 h-6" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Submit a Support Ticket
                </CardTitle>
                <p className="text-gray-600">
                  Can't find what you're looking for? Send us a detailed message.
                </p>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Ticket Submitted!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We've received your support ticket and will respond within 2 hours.
                    </p>
                    <Button 
                      onClick={() => setFormSubmitted(false)}
                      variant="outline"
                      className="w-full"
                    >
                      Submit Another Ticket
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} data-testid="input-support-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-support-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+880 1XXX-XXXXXX" {...field} data-testid="input-support-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-support-category">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="booking">Booking Issues</SelectItem>
                                <SelectItem value="payment">Payment Problems</SelectItem>
                                <SelectItem value="technical">Technical Support</SelectItem>
                                <SelectItem value="refund">Refund Request</SelectItem>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-support-priority">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low - General question</SelectItem>
                                <SelectItem value="medium">Medium - Need assistance</SelectItem>
                                <SelectItem value="high">High - Urgent issue</SelectItem>
                                <SelectItem value="urgent">Urgent - Critical problem</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of your issue" {...field} data-testid="input-support-subject" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide detailed information about your issue..."
                                className="min-h-[120px]"
                                {...field}
                                data-testid="textarea-support-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-submit-ticket"
                      >
                        {form.formState.isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="elegant-card mt-8">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Office Address</p>
                    <p className="text-gray-600">
                      House 45, Road 12, Dhanmondi<br />
                      Dhaka 1209, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 8:00 PM<br />
                      Saturday: 10:00 AM - 6:00 PM<br />
                      Sunday: 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Emergency Support</p>
                    <p className="text-gray-600">
                      24/7 emergency travel assistance available for all active bookings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
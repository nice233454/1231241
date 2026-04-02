import { useState } from 'react';
import { FileText } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', company: '', email: '', phone: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewPricelist = () => {
    window.open('https://drive.google.com/file/d/1bZbSPBln6fHUafa4mS3NPxKoPQB5M4Tr/preview', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <header className="bg-white py-6 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <img
            src="https://i.postimg.cc/RCHjZ02S/Iron-Free-favicon-150x150.png"
            alt="Iron Free Logo"
            className="h-20 mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-[#191970]">IRON FREE</h1>
        </div>
      </header>

      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#191970] mb-8">
              Premium Linen Hire for Your Property
            </h2>

            <div className="mb-8">
              <img
                src="https://i.postimg.cc/mr1012hJ/DSC-8570.webp"
                alt="Premium Linen"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <p className="text-lg text-center text-gray-700 mb-12 leading-relaxed">
              Your guests deserve more than just a place to stay at - they deserve an experience.
              We provide premium, hotel-grade linen hire and bespoke commercial laundry services
              designed to elevate your property. From crisp sheets to plush towels, we handle the
              details so you can focus on the hosting.
            </p>

            <div className="text-center mb-16">
              <button
                onClick={handleViewPricelist}
                className="bg-[#191970] text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-all inline-flex items-center gap-3 shadow-lg"
              >
                <FileText size={24} />
                View Pricelist
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-2xl">
            <h3 className="text-3xl font-bold text-center text-[#191970] mb-8">
              Get in Touch
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-white border border-[#C0C0C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970]"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Company"
                    className="w-full px-4 py-3 bg-white border border-[#C0C0C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white border border-[#C0C0C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone"
                    className="w-full px-4 py-3 bg-white border border-[#C0C0C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970]"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#191970] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <p className="text-2xl text-[#191970] font-medium">
                  Thank you for your request! We'll get in touch with you soon.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <a
              href="https://ironfree.uk/commercial-corporate-dry-cleaning/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#191970] text-[#FFFF00] px-8 py-4 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
            >
              Visit our website
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-white py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto text-center">
          <p className="text-gray-700 mb-2">
            © 2026 Iron Free LTD. All rights reserved.
          </p>
          <p className="text-[#191970] font-medium">
            <a href="mailto:info@ironfree.uk" className="hover:underline">
              info@ironfree.uk
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

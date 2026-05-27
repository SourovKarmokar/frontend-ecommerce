import { useState } from "react";
import { Phone, Mail } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="py-10 md:py-16 font-poppins">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Info Card */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Call */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-base text-gray-900">Call To Us</h3>
              </div>
              <p className="text-sm text-gray-500 mb-1">We are available 24/7, 7 days a week.</p>
              <p className="text-sm text-gray-700 font-medium">Phone: +8801611112222</p>
            </div>

            {/* Write */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-base text-gray-900">Write To US</h3>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-sm text-gray-700">Emails: customer@exclusive.com</p>
              <p className="text-sm text-gray-700">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
          {sent && (
            <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              ✓ Message sent successfully! We'll get back to you within 24 hours.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name *"
                required
                className="w-full bg-[#F5F5F5] rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Your Email *"
                required
                className="w-full bg-[#F5F5F5] rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Your Phone *"
                required
                className="w-full bg-[#F5F5F5] rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={8}
              className="w-full bg-[#F5F5F5] rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary hover:bg-red-600 text-white font-semibold px-10 py-3.5 rounded transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

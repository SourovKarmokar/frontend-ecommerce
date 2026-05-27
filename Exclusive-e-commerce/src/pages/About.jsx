import { Store, DollarSign, ShoppingBag, Briefcase } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

const stats = [
  { icon: Store, value: "10.5k", label: "Sellers active our site" },
  { icon: DollarSign, value: "33k", label: "Monthly Product Sale", highlight: true },
  { icon: ShoppingBag, value: "45.5k", label: "Customer active in our site" },
  { icon: Briefcase, value: "25k", label: "Annual gross sales in our site" },
];

const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

const services = [
  {
    icon: TbTruckDelivery,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over ৳15000",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: RiSecurePaymentLine,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

const About = () => {
  return (
    <div className="py-10 md:py-16 font-poppins">
      {/* Story Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 md:mb-20">
        <div className="flex-1">
          <h1 className="font-inter font-semibold text-3xl md:text-4xl text-primary mb-6">
            Our Story
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
          </p>
        </div>
        <div className="flex-1 w-full">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
            alt="Shopping"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-20">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`border rounded-lg p-6 text-center transition-all hover:shadow-md ${
              stat.highlight
                ? "bg-secondary text-white border-secondary"
                : "bg-white border-gray-200 hover:border-secondary"
            }`}
          >
            <div className={`flex justify-center mb-3 ${stat.highlight ? "text-white" : "text-gray-700"}`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <p className={`font-inter font-bold text-2xl md:text-3xl mb-1 ${stat.highlight ? "text-white" : "text-primary"}`}>
              {stat.value}
            </p>
            <p className={`text-xs md:text-sm ${stat.highlight ? "text-white/80" : "text-gray-500"}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="mb-16 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, i) => (
            <div key={i} className="text-center group">
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-inter font-semibold text-lg text-primary">{member.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{member.role}</p>
              <div className="flex justify-center gap-3 mt-3">
                {[FaTwitter, FaInstagram, FaLinkedin].map((Icon, j) => (
                  <a
                    key={j}
                    href="#"
                    className="text-gray-400 hover:text-secondary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              className={`rounded-full transition-all ${
                i === 0 ? "w-6 h-3 bg-secondary" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, i) => (
          <div key={i} className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 ring-4 ring-black ring-offset-2">
              <service.icon className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-inter font-semibold text-sm md:text-base text-primary mb-2">
              {service.title}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

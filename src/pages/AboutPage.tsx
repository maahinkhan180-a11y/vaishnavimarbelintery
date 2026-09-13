import { Award, Users, Truck, ShieldCheck, MapPin, Phone, MessageCircle } from 'lucide-react';
import { whatsappEnquiry } from '@/lib/whatsapp';

export function AboutPage() {
  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-[#071522] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#ff9d17] font-semibold text-sm tracking-widest uppercase mb-3">
            About Us
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Vaishnavi <span className="text-[#ff9d17]">Marble</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Kolkata's trusted destination for premium marble, tiles, sanitaryware, kitchen sinks, vanities and handcrafted marble statues.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-video rounded-2xl overflow-hidden bg-stone-200">
            <img
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
              alt="Vaishnavi Marble showroom"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Our Story</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              At Vaishnavi Marble, we bring you the finest selection of marble, tiles, sanitaryware, and handcrafted marble statues. With years of experience in the industry, we take pride in offering premium quality products at the best prices across Kolkata.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Our commitment to excellence and customer satisfaction has made us a trusted name for homeowners, builders, and interior designers alike. Visit our showroom to explore our exclusive collection.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+919330300408"
                className="inline-flex items-center gap-2 bg-[#071522] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff9d17] hover:text-black transition-colors"
              >
                <Phone size={18} /> Call Us
              </a>
              <a
                href={whatsappEnquiry('I would like to know more about Vaishnavi Marble.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#ff9d17] font-semibold text-sm tracking-widest uppercase mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-bold text-stone-800">Our Promise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award,         title: 'Premium Quality',    text: 'Hand-picked stones & tiles from trusted brands.' },
              { icon: ShieldCheck,   title: 'Secure Packaging',   text: 'Damage-proof packing for every single order.' },
              { icon: Truck,         title: 'Fast Delivery',      text: 'Pan-India shipping with quick turnaround.' },
              { icon: Users,         title: 'Expert Guidance',    text: 'Free consultation for your interior projects.' },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="text-center p-6 rounded-2xl border border-stone-200 hover:border-[#ff9d17] hover:shadow-lg transition-all">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#ff9d17]/15 flex items-center justify-center">
                    <Icon className="text-[#ff9d17]" size={26} />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-2">{v.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-[#071522] rounded-2xl p-8 md:p-12 text-white">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="text-[#ff9d17] mt-1 shrink-0" size={26} />
            <div>
              <h2 className="text-2xl font-bold mb-3">Visit Our Showroom</h2>
              <p className="text-slate-300 leading-relaxed mb-2">
                Krishnapur Taruliya Main Road, near Chanchal Kumari Girls High School, Sonartari Apartment, P.S. New Town, Kolkata - 700102
              </p>
              <p className="text-slate-300 leading-relaxed">
                Omathati, Kashinathpur, Bishnupur, on 211 road, to, Patharghata, Newtown, Kolkata, West Bengal 700135
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">Open Daily: 9:30 AM – 7:30 PM</p>
        </div>
      </section>
    </div>
  );
}

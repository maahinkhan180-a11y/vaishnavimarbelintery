import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, Headphones, MessageCircle, Facebook, Instagram, Youtube, Clock, Calculator, ArrowRight } from 'lucide-react';
import { navigate } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/types';
import { whatsappEnquiry } from '@/lib/whatsapp';

const FOOTER_GROUPS = [
  { title: 'Tiles by Space', items: ['Floor Tiles', 'Wall Tiles', 'Bathroom Tiles', 'Kitchen Tiles', 'Living Room Tiles', 'Outdoor Tiles', 'Parking Tiles', 'Bedroom Tiles', 'Elevation Tiles', 'Balcony Tiles', 'Pooja Room Tiles', 'Stair Tiles'] },
  { title: 'Tiles by Finish', items: ['Anti Skid Tiles', 'Glossy Tiles', 'Polished Tiles', 'Matt Tiles', 'Carving Tiles', 'Metallic Tiles', 'Rustic Tiles', 'Lappato Tiles', 'Satin Tiles', 'Hi-Gloss Tiles', 'Wall Panels', 'Fluted Panels'] },
  { title: 'Tiles by Design', items: ['3D Tiles', 'Wooden Tiles', 'Marble Tiles', 'Texture Tiles', 'Mosaic Tiles', 'Granite Tiles', 'Stone Tiles', 'Pattern Tiles', 'Geometric Tiles', 'Cement Tiles', 'Travertine Tiles', 'Terrazzo Tiles'] },
  { title: 'Tiles by Type', items: ['Vitrified Tiles', 'Ceramic Tiles', 'Porcelain Tiles', 'Designer Tiles', 'Digital Tiles', 'Glazed Tiles', 'Cool Tiles', 'Printed Tiles', 'Nano Tiles', 'Imported Tiles', 'Italian Tiles', 'Spanish Tiles'] },
];

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: '', mobile: '', city: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase.from('categories').select('*').order('display_order').then(({ data }) => setCategories(data ?? []));
  }, []);

  const handleCallback = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    window.open(whatsappEnquiry(`I would like a callback. Name: ${form.name}, Mobile: ${form.mobile}, City: ${form.city}`), '_blank');
  };

  return (
    <footer className="bg-[#071522] text-slate-300 mt-16">
      <div className="border-b border-slate-700 bg-[#102236]">
        <div className="max-w-7xl mx-auto px-4 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-[#ff9d17]" size={28} /><div><p className="text-sm font-semibold text-white">Secure Packaging</p><p className="text-xs text-slate-400">Safe & damage-proof</p></div></div>
          <div className="flex items-center gap-3"><Truck className="text-[#ff9d17]" size={28} /><div><p className="text-sm font-semibold text-white">Fast Delivery</p><p className="text-xs text-slate-400">Pan-India shipping</p></div></div>
          <div className="flex items-center gap-3"><RefreshCw className="text-[#ff9d17]" size={28} /><div><p className="text-sm font-semibold text-white">Easy Returns</p><p className="text-xs text-slate-400">7-day return policy</p></div></div>
          <div className="flex items-center gap-3"><Headphones className="text-[#ff9d17]" size={28} /><div><p className="text-sm font-semibold text-white">Customer Support</p><p className="text-xs text-slate-400">Mon-Sat, 9am-7pm</p></div></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4"><img src="/logo.jpeg" alt="Vaishnavi Marble" className="w-11 h-11 rounded-lg object-cover" /><h3 className="text-white font-bold text-lg tracking-wide">VAISHNAVI <span className="text-[#ff9d17]">MARBLE</span></h3></div>
          <p className="text-sm text-slate-400 leading-relaxed">The leading destination for exquisite marble in Kolkata. Tiles, sanitaryware, kitchen sinks, vanities, parking tiles, marble statues, mandirs, marble and granite.</p>
          <div className="flex items-center gap-3 mt-5">
            {[['Facebook', Facebook, 'https://facebook.com/vaishnavimarble'], ['Instagram', Instagram, 'https://instagram.com/vaishnavimarble'], ['YouTube', Youtube, 'https://youtube.com/@vaishnavimarble']].map(([label, Icon, href]) => {
              const SocialIcon = Icon as typeof Facebook;
              return <a key={label as string} href={href as string} target="_blank" rel="noopener noreferrer" aria-label={label as string} className="w-9 h-9 rounded-full bg-[#14263a] hover:bg-[#ff9d17] hover:text-black text-white flex items-center justify-center transition-colors"><SocialIcon size={18} /></a>;
            })}
            <a href={whatsappEnquiry('I have a general enquiry about your products.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-[#14263a] hover:bg-green-600 text-white flex items-center justify-center transition-colors"><MessageCircle size={18} /></a>
          </div>
        </div>

        <div><h4 className="text-white font-semibold mb-4 text-sm">Shop Categories</h4><ul className="space-y-2">{categories.slice(0, 8).map(cat => <li key={cat.id}><button onClick={() => navigate(`/category/${cat.slug}`)} className="text-sm text-slate-400 hover:text-[#ff9d17] transition-colors">{cat.name}</button></li>)}<li><button onClick={() => navigate('/blog')} className="text-sm text-slate-400 hover:text-[#ff9d17] transition-colors">Inspiration & Blog</button></li></ul></div>

        <div><h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4><ul className="space-y-2"><li><button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-[#ff9d17]">Home</button></li><li><button onClick={() => navigate('/cart')} className="text-sm text-slate-400 hover:text-[#ff9d17]">Cart</button></li><li><button onClick={() => navigate('/admin')} className="text-sm text-slate-400 hover:text-[#ff9d17]">Admin Login</button></li><li><a href="#callback" className="text-sm text-slate-400 hover:text-[#ff9d17]">Request a Callback</a></li><li><a href="#map" className="text-sm text-slate-400 hover:text-[#ff9d17]">Map Location</a></li></ul></div>

        <div><h4 className="text-white font-semibold mb-4 text-sm">Request a Callback</h4><p className="text-xs text-slate-400 mb-4">Tell us what you need and our team will call you back.</p><form id="callback" onSubmit={handleCallback} className="space-y-2"><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter Your Name" className="w-full bg-white text-stone-800 rounded-sm px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#ff9d17]" /><input required type="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder="Enter Your Mobile" className="w-full bg-white text-stone-800 rounded-sm px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#ff9d17]" /><input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Enter Your City" className="w-full bg-white text-stone-800 rounded-sm px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#ff9d17]" /><button type="submit" className="w-full bg-[#ff9d17] text-black py-2.5 rounded-sm font-bold text-sm hover:bg-white transition-colors">{submitted ? 'Request Sent' : 'Submit'}</button></form></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div><h4 className="text-white font-semibold mb-4 text-sm">Visit Our Showroom</h4><div className="space-y-3 text-sm text-slate-400"><p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-[#ff9d17]" /> Krishnapur Taruliya Main Road, near Chanchal Kumari Girls High School, Sonartari Apartment, P.S. New Town, Kolkata - 700102</p><p className="flex items-center gap-2"><Phone size={16} className="text-[#ff9d17]" /> +91 93303 00408 &nbsp; +91 98363 44786</p><p className="flex items-center gap-2"><Mail size={16} className="text-[#ff9d17]" /> marblevaishnavi@gmail.com</p><p className="flex items-center gap-2"><Clock size={16} className="text-[#ff9d17]" /> Showroom Timings: 9:30 AM - 7:30 PM (Sunday Open)</p><p className="flex items-center gap-2"><Calculator size={16} className="text-[#ff9d17]" /> Tile Calculator available in-store</p></div></div>
        <div id="map" className="rounded-lg overflow-hidden border border-slate-700 min-h-[240px]"><iframe title="Vaishnavi Marble showroom map" src="https://www.google.com/maps?q=Krishnapur%20Taruliya%20Main%20Road%20Kolkata%20700102&output=embed" className="w-full h-full min-h-[240px] border-0" loading="lazy" /></div>
      </div>

      <div className="border-t border-slate-700"><div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500"><span>&copy; {new Date().getFullYear()} Vaishnavi Marble. All rights reserved.</span><span className="flex items-center gap-1">Premium surfaces for beautiful spaces <ArrowRight size={13} /></span></div></div>
    </footer>
  );
}

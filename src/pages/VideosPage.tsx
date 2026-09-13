import { Play, Youtube, Instagram, ExternalLink } from 'lucide-react';

const VIDEOS = [
  {
    id: 1,
    title: 'Vaishnavi Marble Showroom Tour',
    desc: 'Take a full walkthrough of our Kolkata showroom — marble, tiles, sanitaryware & more.',
    thumb: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    url: 'https://youtube.com/@vaishnavimarble',
  },
  {
    id: 2,
    title: 'Designer Kitchen Sink Collection',
    desc: 'Explore our premium stainless steel & quartz kitchen sink range.',
    thumb: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    url: 'https://youtube.com/@vaishnavimarble',
  },
  {
    id: 3,
    title: 'Marble Statue & Mandir Craftsmanship',
    desc: 'Hand-carved Radha Krishna, Lakshmi & custom mandirs — see the artisans at work.',
    thumb: 'https://images.pexels.com/photos/35587787/pexels-photo-35587787.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    url: 'https://youtube.com/@vaishnavimarble',
  },
  {
    id: 4,
    title: 'Bathroom Tile Installation Guide',
    desc: 'Step-by-step tile installation tips from our experts.',
    thumb: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    url: 'https://youtube.com/@vaishnavimarble',
  },
  {
    id: 5,
    title: 'Wash Basin & Vanity Showcase',
    desc: 'Modern wash basin, counter basin & vanity collections.',
    thumb: 'https://images.pexels.com/photos/6588597/pexels-photo-6588597.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    url: 'https://youtube.com/@vaishnavimarble',
  },
  {
    id: 6,
    title: 'Living Room Tiles Inspiration',
    desc: 'Get inspired by our latest living room tile designs.',
    thumb: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    url: 'https://youtube.com/@vaishnavimarble',
  },
];

export function VideosPage() {
  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-[#071522] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#ff9d17] font-semibold text-sm tracking-widest uppercase mb-3">
            Video Gallery
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Watch & <span className="text-[#ff9d17]">Explore</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Product walkthroughs, installation guides, and design inspiration from Vaishnavi Marble.
          </p>
        </div>
      </section>

      {/* Videos grid */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((v) => (
            <a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden bg-stone-100">
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#ff9d17] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-black ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-stone-800 mb-2 line-clamp-2 group-hover:text-[#ff9d17] transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm text-stone-600 line-clamp-2">{v.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Follow CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-black rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Follow Us for More</h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Subscribe to our YouTube channel and follow on Instagram for new videos, product launches & design tips.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://youtube.com/@vaishnavimarble"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Youtube size={20} /> YouTube
            </a>
            <a
              href="https://www.instagram.com/vaishnavimarble/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} /> Instagram
            </a>
            <a
              href="https://share.google/NwdYRdK6JAvO8rkJk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#ff9d17] transition-colors"
            >
              <ExternalLink size={18} /> Google Business
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { X, Send, CheckCircle, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
  });

  useEffect(() => {
    // Show popup when website opens
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      alert('Please enter your name and mobile number.');
      return;
    }

    if (!isSupabaseConfigured) {
      alert('Database is not connected.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          requirement: form.requirement.trim() || null,
        },
      ]);

      if (error) {
        console.error('Enquiry error:', error);
        alert('Unable to submit enquiry. Please try again.');
        return;
      }

      setSubmitted(true);
      localStorage.setItem('vaishnavimarble_enquiry_submitted', 'true');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
      onClick={closePopup}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md transition hover:bg-stone-100"
          aria-label="Close enquiry popup"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-black px-6 py-7 text-white sm:px-8">
          <div className="pr-8">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[#ff9d17]">
              Vaishnavi Marble
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Send Your Enquiry
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-stone-300">
              Looking for tiles, marble, granite or sanitaryware?
              Tell us what you need and our team will contact you.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center sm:px-8">
            <CheckCircle
              size={58}
              className="mx-auto mb-4 text-green-600"
            />

            <h3 className="text-2xl font-bold text-stone-900">
              Enquiry Received!
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Thank you for contacting Vaishnavi Marble.
              Our team will contact you shortly.
            </p>

            <button
              type="button"
              onClick={closePopup}
              className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#ff9d17] hover:text-black"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6 sm:px-8">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-800">
                Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-stone-300 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#ff9d17] focus:ring-2 focus:ring-[#ff9d17]/20"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-800">
                Mobile Number <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  autoComplete="tel"
                  inputMode="numeric"
                  required
                  className="w-full rounded-lg border border-stone-300 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#ff9d17] focus:ring-2 focus:ring-[#ff9d17]/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-800">
                Email <span className="text-stone-400">(Optional)</span>
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  autoComplete="email"
                  className="w-full rounded-lg border border-stone-300 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#ff9d17] focus:ring-2 focus:ring-[#ff9d17]/20"
                />
              </div>
            </div>

            {/* Requirement */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-800">
                Your Requirement
              </label>

              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-3 top-3 text-stone-400"
                />

                <textarea
                  name="requirement"
                  value={form.requirement}
                  onChange={handleChange}
                  placeholder="Example: 500 sq.ft. floor tiles"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-stone-300 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#ff9d17] focus:ring-2 focus:ring-[#ff9d17]/20"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-[#ff9d17] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  <Send size={18} />
                  Submit Enquiry
                </>
              )}
            </button>

            <p className="text-center text-xs text-stone-500">
              Your information will be used only to contact you regarding
              your enquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

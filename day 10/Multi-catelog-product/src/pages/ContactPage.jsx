import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Globe, Heart, MessageSquare, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import "./ContactPage.css";

const contactInfo = [
  {
    icon: <Mail size={24} />,
    title: "Email Us",
    value: "antonyl@gmail.com",
    sub: "We reply within 24 hours",
    color: "#2563eb",
    link: "mailto:antonyl@gmail.com",
  },
  {
    icon: <Phone size={24} />,
    title: "Call Us",
    value: "83794393",
    sub: "Mon–Sat, 9 AM – 6 PM",
    color: "#10b981",
    link: "tel:83794393",
  },
  {
    icon: <MapPin size={24} />,
    title: "Visit Us",
    value: "Chennai, Tamil Nadu",
    sub: "India — 600001",
    color: "#f59e0b",
    link: "#map",
  },
  {
    icon: <Clock size={24} />,
    title: "Business Hours",
    value: "Mon–Sat: 9 AM–6 PM",
    sub: "Sunday: Closed",
    color: "#7c3aed",
    link: "#",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSent(true);
    toast.success("Message sent! We'll get back to you soon. 📧");
  };

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="contact-hero">
        <div className="container contact-hero__inner">
          <span className="contact-hero__tag">💬 Contact Us</span>
          <h1 className="contact-hero__title">We'd Love to Hear From You</h1>
          <p className="contact-hero__subtitle">
            Have a question, feedback, or need help with your order? Our team is ready to help you.
          </p>
        </div>
      </div>

      <div className="container contact-body">
        {/* Contact Cards */}
        <div className="contact-cards">
          {contactInfo.map((c) => (
            <a key={c.title} href={c.link} className="contact-card card" style={{ "--card-color": c.color }}>
              <div className="contact-card__icon" style={{ background: c.color + "20", color: c.color }}>
                {c.icon}
              </div>
              <div className="contact-card__info">
                <h3 className="contact-card__title">{c.title}</h3>
                <p className="contact-card__value">{c.value}</p>
                <p className="contact-card__sub">{c.sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Main Content */}
        <div className="contact-main">
          {/* Form */}
          <div className="contact-form-wrap card">
            <div className="contact-form-wrap__header">
              <MessageCircle size={24} style={{ color: "var(--clr-primary)" }} />
              <div>
                <h2>Send a Message</h2>
                <p>Fill out the form and we'll get back to you within 24 hours.</p>
              </div>
            </div>
            <div className="divider" />

            {sent ? (
              <div className="contact-success scale-in">
                <CheckCircle size={56} color="var(--clr-success)" />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll reply to <strong>{form.email}</strong> within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>Full Name *</label>
                    <input type="text" name="name" placeholder="Your full name" className="input" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="contact-form__field">
                    <label>Email Address *</label>
                    <input type="email" name="email" placeholder="your@email.com" className="input" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label>Subject</label>
                  <select name="subject" className="input" value={form.subject} onChange={handleChange}>
                    <option value="">Select a topic</option>
                    <option>Order Inquiry</option>
                    <option>Return & Refund</option>
                    <option>Product Question</option>
                    <option>Payment Issue</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="contact-form__field">
                  <label>Message *</label>
                  <textarea name="message" placeholder="Tell us how we can help you..." className="input contact-form__textarea" rows={6} value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: "flex-start" }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="contact-sidebar">
            {/* Quick Contact */}
            <div className="contact-quick card">
              <h3 className="contact-quick__title">Quick Contact</h3>
              <div className="contact-quick__items">
                <a href="mailto:antonyl@gmail.com" className="contact-quick__item">
                  <div className="contact-quick__icon" style={{ background: "#dbeafe", color: "#2563eb" }}><Mail size={18} /></div>
                  <div>
                    <p className="contact-quick__label">Email</p>
                    <p className="contact-quick__val">antonyl@gmail.com</p>
                  </div>
                </a>
                <a href="tel:83794393" className="contact-quick__item">
                  <div className="contact-quick__icon" style={{ background: "#d1fae5", color: "#10b981" }}><Phone size={18} /></div>
                  <div>
                    <p className="contact-quick__label">Phone</p>
                    <p className="contact-quick__val">83794393</p>
                  </div>
                </a>
                <div className="contact-quick__item">
                  <div className="contact-quick__icon" style={{ background: "#fef3c7", color: "#f59e0b" }}><MapPin size={18} /></div>
                  <div>
                    <p className="contact-quick__label">Address</p>
                    <p className="contact-quick__val">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="contact-social card">
              <h3 className="contact-quick__title">Follow Us</h3>
              <div className="contact-social__grid">
                {[
                  { icon: <Heart size={20} />, name: "Instagram", color: "#e1306c", handle: "@tony.catalog" },
                  { icon: <MessageSquare size={20} />, name: "Twitter", color: "#1da1f2", handle: "@tonycatalog" },
                  { icon: <Globe size={20} />, name: "Facebook", color: "#1877f2", handle: "Tony Catalog" },
                ].map((s) => (
                  <a key={s.name} href="#" className="contact-social__item" style={{ "--s-color": s.color }}>
                    <div style={{ color: s.color }}>{s.icon}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "0.85rem" }}>{s.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--txt-muted)" }}>{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="contact-faq card">
              <h3 className="contact-quick__title">Quick FAQs</h3>
              {[
                { q: "How long does delivery take?", a: "2–5 business days for standard delivery." },
                { q: "Can I return a product?", a: "Yes! Easy 7-day returns on all products." },
                { q: "What payment methods do you accept?", a: "UPI, Cards, Net Banking, and COD." },
                { q: "How to track my order?", a: "Check your profile page under Order History." },
              ].map((f) => (
                <details key={f.q} className="contact-faq__item">
                  <summary className="contact-faq__q">{f.q}</summary>
                  <p className="contact-faq__a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div id="map" className="contact-map card">
          <div className="contact-map__header">
            <MapPin size={20} color="var(--clr-primary)" />
            <h3>Find Us in Chennai</h3>
          </div>
          <div className="contact-map__embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.00382666!3d13.047513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "var(--border-radius)" }}
              allowFullScreen=""
              loading="lazy"
              title="Tony Catalog Location - Chennai"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

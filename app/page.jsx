"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// THEME & CONSTANTS
// ============================================================
const COLORS = {
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldDark: "#A07830",
  brown: "#3B2314",
  brownMid: "#5C3520",
  beige: "#F5EDD8",
  beigeLight: "#FAF5EA",
  black: "#0D0A08",
  white: "#FDFAF5",
  textDark: "#1A1008",
  textMid: "#6B4C2A",
  textLight: "#A08060",
};

const PHONE1 = "9205597537";
const PHONE2 = "9205590537";
const WA_MSG = encodeURIComponent("Hi! I'd like to place an order from Cafe Desire.");
const WA_BOOK = encodeURIComponent("Hi! I'd like to book a table at Cafe Desire.");
const ADDRESS = "Holambi Khurd, Near DIRD College, Opposite C.L. Indian Public School, Delhi - 110082";

// ============================================================
// FONT LOADER
// ============================================================
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyle = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { 
      background: ${COLORS.black}; 
      color: ${COLORS.beige}; 
      font-family: 'Jost', sans-serif;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${COLORS.black}; }
    ::-webkit-scrollbar-thumb { background: ${COLORS.gold}; border-radius: 3px; }
    
    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }
    
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes slideLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
      50% { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(201,168,76,0); }
    }
    @keyframes heroZoom {
      from { transform: scale(1.05); }
      to { transform: scale(1.15); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes slideInMenu {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes ripple {
      0% { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(4); opacity: 0; }
    }
    
    .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    
    .gold-border { border: 1px solid ${COLORS.gold}; }
    .gold-text { color: ${COLORS.gold}; }
    .gold-bg { background: ${COLORS.gold}; }
    
    .btn-gold {
      background: linear-gradient(135deg, ${COLORS.goldDark}, ${COLORS.gold}, ${COLORS.goldLight});
      color: ${COLORS.black};
      font-family: 'Jost', sans-serif;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-size: 11px;
      padding: 14px 28px;
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.4); }
    
    .btn-outline {
      background: transparent;
      color: ${COLORS.gold};
      border: 1px solid ${COLORS.gold};
      font-family: 'Jost', sans-serif;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-size: 11px;
      padding: 13px 27px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-outline:hover { background: ${COLORS.gold}; color: ${COLORS.black}; transform: translateY(-2px); }
    
    .section-label {
      font-family: 'Jost', sans-serif;
      font-size: 10px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: ${COLORS.gold};
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-label::before, .section-label::after {
      content: '';
      width: 40px;
      height: 1px;
      background: ${COLORS.gold};
    }
    
    .card-hover {
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
    }
    .card-hover:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: ${COLORS.gold} !important;
    }
    
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
    }
    @media (min-width: 769px) {
      .hide-desktop { display: none !important; }
    }
  `}</style>
);

// ============================================================
// SCROLL REVEAL HOOK
// ============================================================
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
};

// ============================================================
// DIVIDER COMPONENT
// ============================================================
const GoldDivider = ({ style = {} }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${COLORS.gold})` }} />
    <span style={{ color: COLORS.gold, fontSize: 18 }}>✦</span>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${COLORS.gold})` }} />
  </div>
);

// ============================================================
// NAVBAR
// ============================================================
const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "about", label: "About" },
    { id: "gallery", label: "Gallery" },
    { id: "offers", label: "Offers" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "12px 40px" : "20px 40px",
        background: scrolled ? "rgba(13,10,8,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", animation: "fadeIn 1s ease" }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 300, color: COLORS.gold, letterSpacing: "0.05em", lineHeight: 1 }}>
            Café Desire
          </div>
          <div style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: COLORS.textLight, marginTop: 2 }}>
            ✦ Delhi's Finest ✦
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hide-mobile" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => setPage(link.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: page === link.id ? COLORS.gold : COLORS.beige,
              opacity: page === link.id ? 1 : 0.7,
              transition: "all 0.3s ease",
              paddingBottom: 2,
              borderBottom: page === link.id ? `1px solid ${COLORS.gold}` : "1px solid transparent",
            }}
            onMouseEnter={e => { e.target.style.color = COLORS.gold; e.target.style.opacity = 1; }}
            onMouseLeave={e => { if (page !== link.id) { e.target.style.color = COLORS.beige; e.target.style.opacity = 0.7; } }}
            >{link.label}</button>
          ))}
          <button className="btn-gold" onClick={() => setPage("book")} style={{ borderRadius: 0, padding: "10px 20px" }}>
            Book Table
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 8,
        }}>
          <div style={{ width: 24, height: 2, background: COLORS.gold, margin: "5px 0", transition: "0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: COLORS.gold, margin: "5px 0", opacity: menuOpen ? 0 : 1, transition: "0.3s" }} />
          <div style={{ width: 24, height: 2, background: COLORS.gold, margin: "5px 0", transition: "0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "80%", maxWidth: 320,
          background: COLORS.brown, zIndex: 1001, padding: "80px 40px 40px",
          animation: "slideInMenu 0.3s ease",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: COLORS.gold, fontSize: 24, cursor: "pointer" }}>✕</button>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: COLORS.gold, marginBottom: 24 }}>Café Desire</div>
          {[...navLinks, { id: "book", label: "Book Table" }].map(link => (
            <button key={link.id} onClick={() => { setPage(link.id); setMenuOpen(false); }} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 500,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: page === link.id ? COLORS.gold : COLORS.beige,
              textAlign: "left", padding: "12px 0",
              borderBottom: `1px solid rgba(201,168,76,0.1)`,
              transition: "color 0.3s",
            }}>{link.label}</button>
          ))}
          <div style={{ marginTop: "auto", display: "flex", gap: 16 }}>
            <a href={`tel:${PHONE1}`} style={{ flex: 1, padding: "14px 0", background: COLORS.gold, color: COLORS.black, textAlign: "center", fontFamily: "Jost", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }}>📞 Call</a>
            <a href={`https://wa.me/91${PHONE1}?text=${WA_MSG}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "14px 0", background: "#25D366", color: "#fff", textAlign: "center", fontFamily: "Jost", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }}>💬 WhatsApp</a>
          </div>
        </div>
      )}
      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000 }} />}
    </>
  );
};

// ============================================================
// FLOATING BUTTONS
// ============================================================
const FloatingButtons = () => (
  <div style={{ position: "fixed", bottom: 80, right: 20, zIndex: 999, display: "flex", flexDirection: "column", gap: 12 }}>
    <a href={`https://wa.me/91${PHONE1}?text=${WA_MSG}`} target="_blank" rel="noreferrer"
      title="Order on WhatsApp"
      style={{
        width: 54, height: 54, borderRadius: "50%", background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        animation: "pulse 2s infinite", textDecoration: "none", fontSize: 24,
      }}>💬</a>
    <a href={`tel:${PHONE1}`}
      title="Call Now"
      style={{
        width: 54, height: 54, borderRadius: "50%", background: COLORS.gold,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
        textDecoration: "none", fontSize: 24, animation: "float 3s ease-in-out infinite",
      }}>📞</a>
  </div>
);

// ============================================================
// MOBILE BOTTOM BAR
// ============================================================
const MobileBottomBar = ({ setPage }) => (
  <div className="hide-desktop" style={{
    position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 998,
    display: "flex", background: COLORS.brown,
    borderTop: `1px solid rgba(201,168,76,0.3)`,
  }}>
    {[
      { icon: "🏠", label: "Home", action: () => setPage("home") },
      { icon: "🍕", label: "Menu", action: () => setPage("menu") },
      { icon: "📞", label: "Call", action: () => window.location.href = `tel:${PHONE1}` },
      { icon: "💬", label: "Order", action: () => window.open(`https://wa.me/91${PHONE1}?text=${WA_MSG}`) },
      { icon: "📅", label: "Book", action: () => setPage("book") },
    ].map(item => (
      <button key={item.label} onClick={item.action} style={{
        flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        color: COLORS.beige, transition: "color 0.3s",
      }}>
        <span style={{ fontSize: 18 }}>{item.icon}</span>
        <span style={{ fontFamily: "Jost", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</span>
      </button>
    ))}
  </div>
);

// ============================================================
// HOME PAGE
// ============================================================
const HomePage = ({ setPage }) => {
  useScrollReveal();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeDishCategory, setActiveDishCategory] = useState(0);
  const [offerPopup, setOfferPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOfferPopup(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { emoji: "🍕", name: "Pizza", desc: "Wood-fired perfection" },
    { emoji: "🍔", name: "Burgers", desc: "Loaded & saucy" },
    { emoji: "🥟", name: "Momos", desc: "Steamed & fried" },
    { emoji: "🍜", name: "Chinese", desc: "Wok-tossed flavors" },
    { emoji: "🍗", name: "Tandoori", desc: "Clay oven magic" },
    { emoji: "🥤", name: "Shakes", desc: "Thick & creamy" },
    { emoji: "☕", name: "Coffee", desc: "Brewed with love" },
    { emoji: "🍰", name: "Desserts", desc: "Sweet endings" },
  ];

  const dishes = [
    { name: "Butter Chicken Pizza", price: "₹249", tag: "Bestseller", cat: "Pizza", emoji: "🍕", desc: "Creamy butter chicken sauce, mozzarella, capsicum on crispy base" },
    { name: "Peri Peri Burger", price: "₹149", tag: "🔥 Hot", cat: "Burger", emoji: "🍔", desc: "Spicy peri peri patty, crisp lettuce, special sauce" },
    { name: "Steamed Momos", price: "₹99", tag: "Veg", cat: "Momos", emoji: "🥟", desc: "Classic steamed momos with signature chutney, 8 pcs" },
    { name: "Hakka Noodles", price: "₹129", tag: "Veg", cat: "Chinese", emoji: "🍜", desc: "Wok-tossed hakka noodles with fresh vegetables" },
    { name: "Malai Tikka", price: "₹219", tag: "Must Try", cat: "Tandoori", emoji: "🍗", desc: "Creamy marinated chicken tikka from clay oven" },
    { name: "Oreo Shake", price: "₹119", tag: "Fan Fav", cat: "Shakes", emoji: "🥤", desc: "Thick oreo milkshake topped with whipped cream" },
  ];

  const testimonials = [
    { name: "Priya Sharma", loc: "Rohini, Delhi", stars: 5, text: "Absolutely loved the food! The butter chicken pizza is divine. Staff was super friendly and ambience is perfect for family outings." },
    { name: "Rahul Verma", loc: "Alipur, Delhi", stars: 5, text: "Best cafe near DIRD College. The momos are outstanding and prices are very reasonable. Will definitely come back!" },
    { name: "Sneha Gupta", loc: "Bawana, Delhi", stars: 5, text: "Celebrated my birthday here and it was magical. The team decorated the table beautifully. Best memories ever!" },
    { name: "Amit Kumar", loc: "Holambi Khurd", stars: 5, text: "My go-to cafe! The malai tikka and shakes are incredible. Cozy seating, fast service. Highly recommend!" },
  ];

  const faqs = [
    { q: "What are your opening hours?", a: "We're open every day from 11:00 AM to 11:00 PM, including weekends and holidays." },
    { q: "Do you offer home delivery?", a: "Yes! Order directly on WhatsApp for the freshest food. We also deliver via Zomato & Swiggy." },
    { q: "Can you arrange birthday parties?", a: "Absolutely! We offer special birthday packages with decoration, cake, and group meals. Contact us to customize your celebration." },
    { q: "Do you accept advance table reservations?", a: "Yes, you can book tables in advance via our Book Table page or by calling/WhatsApp." },
    { q: "Is the food halal?", a: "Yes, all our meat products are 100% halal certified." },
  ];

  const whyUs = [
    { icon: "🌿", title: "Fresh Ingredients", desc: "Sourced daily from trusted local vendors" },
    { icon: "👨‍🍳", title: "Expert Chefs", desc: "Trained with years of culinary passion" },
    { icon: "💰", title: "Affordable Prices", desc: "Premium taste without premium pricing" },
    { icon: "🏠", title: "Family Friendly", desc: "Welcoming space for all ages" },
    { icon: "⚡", title: "Fast Service", desc: "Quick turnaround, never a long wait" },
    { icon: "✨", title: "Hygienic Kitchen", desc: "Spotless preparation, always fresh" },
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* BG */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, #1a0a00 0%, #3b1500 40%, #0d0500 100%)`,
          animation: "heroZoom 20s ease-in-out infinite alternate",
        }} />
        {/* Overlay pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%)` }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />

        {/* Food emoji decorations */}
        {["🍕","🍔","🥟","🍜","🍗","🥤","☕","🌮"].map((e,i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${15 + (i * 11) % 70}%`,
            left: `${5 + (i * 13) % 90}%`,
            fontSize: `${20 + (i%3)*8}px`,
            opacity: 0.06,
            animation: `float ${3 + i*0.5}s ease-in-out infinite`,
            animationDelay: `${i*0.4}s`,
          }}>{e}</div>
        ))}

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px", maxWidth: 900 }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: 20, animation: "fadeIn 1s ease 0.3s both" }}>
            Est. Since 2020 · Holambi Khurd, Delhi
          </div>
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "clamp(48px, 9vw, 96px)",
            lineHeight: 1.05, color: COLORS.white, marginBottom: 16,
            animation: "fadeUp 1s ease 0.5s both",
          }}>
            North Delhi's<br/>
            <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Favorite</span> Family Cafe
          </h1>
          <p style={{
            fontFamily: "Jost", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 300,
            color: "rgba(245,237,216,0.8)", letterSpacing: "0.05em", marginBottom: 48,
            animation: "fadeUp 1s ease 0.8s both",
          }}>
            Fresh food, warm vibes & unforgettable moments — since 2020
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", animation: "fadeUp 1s ease 1s both" }}>
            <button className="btn-gold" onClick={() => setPage("menu")} style={{ borderRadius: 0 }}>🍕 View Menu</button>
            <a href={`https://wa.me/91${PHONE1}?text=${WA_MSG}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ background: "#25D366", color: "#fff", border: "none", fontFamily: "Jost", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 28px", cursor: "pointer", transition: "all 0.3s" }}>💬 Order on WhatsApp</button>
            </a>
            <a href={`tel:${PHONE1}`} style={{ textDecoration: "none" }}>
              <button className="btn-outline" style={{ borderRadius: 0 }}>📞 Call Now</button>
            </a>
            <button className="btn-outline" onClick={() => setPage("book")} style={{ borderRadius: 0, background: "rgba(201,168,76,0.1)" }}>📅 Book Table</button>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 60, animation: "fadeUp 1s ease 1.3s both" }}>
            {[["500+","Happy Families/Day"], ["4.8★","Google Rating"], ["50+","Menu Items"], ["3+","Years of Love"]].map(([n,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: COLORS.gold, fontWeight: 600 }}>{n}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,237,216,0.6)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom, ${COLORS.gold}, transparent)`, margin: "0 auto" }} />
        </div>
      </section>

      {/* ── OFFER BANNER ── */}
      <section style={{ background: `linear-gradient(90deg, ${COLORS.brownMid}, ${COLORS.brown}, ${COLORS.brownMid})`, padding: "14px 20px", textAlign: "center", borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
        <p style={{ fontFamily: "Jost", fontSize: 13, letterSpacing: "0.1em", color: COLORS.beige }}>
          🎉 <span style={{ color: COLORS.gold, fontWeight: 600 }}>SPECIAL OFFER</span> — Family Combo Meal @ ₹499 · Wednesday 20% Off · Birthday Package Available &nbsp;
          <button onClick={() => setPage("offers")} style={{ background: "none", border: "none", color: COLORS.gold, cursor: "pointer", fontFamily: "Jost", fontSize: 12, textDecoration: "underline" }}>View All Offers →</button>
        </p>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: "80px 20px", background: COLORS.black }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label reveal" style={{ justifyContent: "center", marginBottom: 16 }}>Our Specialties</div>
            <h2 className="reveal font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: COLORS.white }}>
              Explore Our <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Flavors</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16 }}>
            {categories.map((cat, i) => (
              <div key={cat.name} className="reveal card-hover" onClick={() => setPage("menu")}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.brown} 0%, rgba(59,35,20,0.6) 100%)`,
                  border: `1px solid rgba(201,168,76,0.15)`, padding: "24px 16px",
                  textAlign: "center", cursor: "pointer",
                  transitionDelay: `${i * 0.05}s`,
                }}>
                <div style={{ fontSize: 36, marginBottom: 10, display: "block" }}>{cat.emoji}</div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 500, color: COLORS.beige }}>{cat.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 4, letterSpacing: "0.05em" }}>{cat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DISHES ── */}
      <section style={{ padding: "80px 20px", background: `linear-gradient(to bottom, ${COLORS.black}, ${COLORS.brown})` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label reveal" style={{ justifyContent: "center", marginBottom: 16 }}>Fresh From The Kitchen</div>
            <h2 className="reveal font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: COLORS.white }}>
              Signature <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Dishes</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {dishes.map((dish, i) => (
              <div key={dish.name} className="reveal card-hover"
                style={{
                  background: COLORS.brown, border: `1px solid rgba(201,168,76,0.15)`,
                  overflow: "hidden", transitionDelay: `${i * 0.1}s`,
                }}>
                <div style={{ height: 200, background: `linear-gradient(135deg, #2a1200, #1a0800)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, position: "relative", overflow: "hidden" }}>
                  <span style={{ transition: "transform 0.5s", display: "block" }} onMouseEnter={e => e.target.style.transform = "scale(1.2)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}>{dish.emoji}</span>
                  <span style={{ position: "absolute", top: 12, left: 12, background: COLORS.gold, color: COLORS.black, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 8px", textTransform: "uppercase" }}>{dish.tag}</span>
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 500, color: COLORS.beige }}>{dish.name}</h3>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: COLORS.gold, fontWeight: 600 }}>{dish.price}</span>
                  </div>
                  <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.5, marginBottom: 16 }}>{dish.desc}</p>
                  <a href={`https://wa.me/91${PHONE1}?text=${encodeURIComponent(`Hi! I'd like to order ${dish.name} - ${dish.price}`)}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <button style={{ width: "100%", background: "transparent", border: `1px solid ${COLORS.gold}`, color: COLORS.gold, fontFamily: "Jost", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", padding: "10px 0", cursor: "pointer", transition: "all 0.3s" }}
                      onMouseEnter={e => { e.target.style.background = COLORS.gold; e.target.style.color = COLORS.black; }}
                      onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.gold; }}>
                      💬 Order on WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-gold reveal" onClick={() => setPage("menu")} style={{ borderRadius: 0 }}>View Full Menu →</button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "80px 20px", background: COLORS.brown }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div className="section-label reveal" style={{ marginBottom: 16 }}>Why We're Different</div>
              <h2 className="reveal font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: COLORS.white, marginBottom: 20 }}>
                Crafted With<br/><span style={{ color: COLORS.gold, fontStyle: "italic" }}>Love & Care</span>
              </h2>
              <p className="reveal" style={{ color: COLORS.textLight, lineHeight: 1.8, marginBottom: 32 }}>
                At Café Desire, every dish tells a story of passion. We believe great food brings families together — that's why we pour our hearts into every plate we serve.
              </p>
              <GoldDivider style={{ marginBottom: 32, maxWidth: 300 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {whyUs.map((item, i) => (
                  <div key={item.title} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: COLORS.beige, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: COLORS.textLight }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["🍕","🍔","🥟","🍗"].map((e, i) => (
                <div key={i} className="reveal card-hover" style={{
                  aspectRatio: "1", background: `linear-gradient(135deg, ${COLORS.black}, ${COLORS.brownMid})`,
                  border: `1px solid rgba(201,168,76,0.15)`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64,
                  transitionDelay: `${i * 0.1}s`,
                }}>{e}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 20px", background: COLORS.black }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label reveal" style={{ justifyContent: "center", marginBottom: 16 }}>Guest Reviews</div>
          <h2 className="reveal font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: COLORS.white, marginBottom: 60 }}>
            What Our <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Guests Say</span>
          </h2>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{
              background: COLORS.brown, border: `1px solid rgba(201,168,76,0.2)`,
              padding: "48px 56px", transition: "all 0.5s ease",
            }}>
              <div style={{ fontSize: 48, color: COLORS.gold, fontFamily: "Georgia", lineHeight: 1, marginBottom: 20 }}>"</div>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 3vw, 26px)", fontStyle: "italic", color: COLORS.beige, lineHeight: 1.6, marginBottom: 32 }}>
                {testimonials[activeTestimonial].text}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  {testimonials[activeTestimonial].name[0]}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "Jost", fontWeight: 600, color: COLORS.beige }}>{testimonials[activeTestimonial].name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textLight }}>{testimonials[activeTestimonial].loc}</div>
                </div>
                <div style={{ color: COLORS.gold, fontSize: 16, marginLeft: 8 }}>{"★".repeat(testimonials[activeTestimonial].stars)}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                  width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === activeTestimonial ? COLORS.gold : "rgba(201,168,76,0.3)",
                  border: "none", cursor: "pointer", transition: "all 0.3s",
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BIRTHDAY CTA ── */}
      <section style={{ padding: "80px 20px", background: `linear-gradient(135deg, ${COLORS.brown}, ${COLORS.brownMid})`, textAlign: "center", borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🎂</div>
          <h2 className="font-display reveal" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, color: COLORS.white, marginBottom: 16 }}>
            Celebrate Your <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Birthday</span> With Us
          </h2>
          <p className="reveal" style={{ color: COLORS.textLight, lineHeight: 1.8, marginBottom: 32 }}>
            Special decoration · Custom cakes · Group packages · Personalized service<br/>
            Make your special day truly unforgettable at Café Desire.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/91${PHONE1}?text=${encodeURIComponent("Hi! I'd like to book a birthday party at Cafe Desire.")}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ background: "#25D366", color: "#fff", border: "none", fontFamily: "Jost", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 32px", cursor: "pointer" }}>💬 Book Birthday Party</button>
            </a>
            <a href={`tel:${PHONE1}`} style={{ textDecoration: "none" }}>
              <button className="btn-outline" style={{ padding: "15px 31px" }}>📞 Call to Inquire</button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 20px", background: COLORS.black }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label reveal" style={{ justifyContent: "center", marginBottom: 16 }}>Common Questions</div>
            <h2 className="font-display reveal" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, color: COLORS.white }}>
              Frequently <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Asked</span>
            </h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="reveal" style={{
              borderBottom: `1px solid rgba(201,168,76,0.15)`,
              transitionDelay: `${i * 0.08}s`,
            }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 0", textAlign: "left",
              }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: COLORS.beige }}>{faq.q}</span>
                <span style={{ color: COLORS.gold, fontSize: 20, transition: "transform 0.3s", transform: faqOpen === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {faqOpen === i && (
                <p style={{ color: COLORS.textLight, lineHeight: 1.7, paddingBottom: 20, animation: "fadeUp 0.3s ease", fontSize: 14 }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── OFFER POPUP ── */}
      {offerPopup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", animation: "fadeIn 0.3s ease" }}>
          <div style={{
            background: COLORS.brown, border: `1px solid ${COLORS.gold}`, padding: 48,
            maxWidth: 480, width: "90%", textAlign: "center", position: "relative",
            animation: "scaleIn 0.4s ease",
          }}>
            <button onClick={() => setOfferPopup(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: COLORS.gold, fontSize: 20, cursor: "pointer" }}>✕</button>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, color: COLORS.gold, marginBottom: 8 }}>Special Welcome Offer!</h3>
            <p style={{ color: COLORS.beige, marginBottom: 8, lineHeight: 1.6 }}>Show this popup & get <strong style={{ color: COLORS.gold }}>10% OFF</strong> your first order!</p>
            <div style={{ background: "rgba(201,168,76,0.1)", border: `1px dashed ${COLORS.gold}`, padding: "12px 20px", margin: "20px 0", fontFamily: "Jost", letterSpacing: "0.3em", fontSize: 20, color: COLORS.gold, fontWeight: 700 }}>DESIRE10</div>
            <a href={`https://wa.me/91${PHONE1}?text=${encodeURIComponent("Hi! I have the coupon DESIRE10 for 10% off my first order.")}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-gold" onClick={() => setOfferPopup(false)} style={{ width: "100%", marginTop: 8 }}>💬 Claim on WhatsApp</button>
            </a>
            <p style={{ fontSize: 10, color: COLORS.textLight, marginTop: 12 }}>Valid for first-time customers only. Dine-in & delivery.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MENU PAGE
// ============================================================
const MenuPage = () => {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All");

  const menuItems = [
    // Pizza
    { cat: "Pizza", name: "Margherita Pizza", price: "₹199", desc: "Classic tomato sauce, mozzarella, fresh basil", veg: true },
    { cat: "Pizza", name: "Butter Chicken Pizza", price: "₹249", desc: "Creamy butter chicken, mozzarella, capsicum", veg: false, tag: "Bestseller" },
    { cat: "Pizza", name: "Paneer Tikka Pizza", price: "₹229", desc: "Spiced paneer tikka, onion, peppers on crispy base", veg: true, tag: "Must Try" },
    { cat: "Pizza", name: "Double Cheese Pepperoni", price: "₹279", desc: "Extra mozzarella, pepperoni, oregano drizzle", veg: false },
    { cat: "Pizza", name: "BBQ Chicken Pizza", price: "₹259", desc: "Smoky BBQ sauce, grilled chicken, caramelized onion", veg: false },
    { cat: "Pizza", name: "Mushroom Delight", price: "₹219", desc: "Wild mushrooms, pesto, sun-dried tomatoes", veg: true },
    // Burgers
    { cat: "Burgers", name: "Peri Peri Burger", price: "₹149", desc: "Spicy peri peri patty, crisp lettuce, special sauce", veg: false, tag: "🔥 Hot" },
    { cat: "Burgers", name: "Classic Veg Burger", price: "₹119", desc: "Crispy veg patty, fresh veggies, chipotle mayo", veg: true },
    { cat: "Burgers", name: "Chicken Zinger", price: "₹169", desc: "Crispy fried chicken, coleslaw, mustard sauce", veg: false, tag: "Bestseller" },
    { cat: "Burgers", name: "Double Smash Burger", price: "₹199", desc: "Double beef smash patty, American cheese, pickles", veg: false },
    { cat: "Burgers", name: "Mushroom Swiss Burger", price: "₹159", desc: "Sautéed mushrooms, Swiss cheese, garlic aioli", veg: true },
    // Wraps
    { cat: "Wraps", name: "Chicken Tikka Wrap", price: "₹149", desc: "Grilled chicken tikka, mint chutney, onion rings", veg: false },
    { cat: "Wraps", name: "Paneer Kathi Roll", price: "₹129", desc: "Tandoori paneer, veggies, coriander mint chutney", veg: true, tag: "Popular" },
    { cat: "Wraps", name: "BBQ Beef Wrap", price: "₹159", desc: "Smoky BBQ beef, caramelized onions, cheese", veg: false },
    // Chinese
    { cat: "Chinese", name: "Hakka Noodles", price: "₹129", desc: "Classic wok-tossed hakka noodles with vegetables", veg: true },
    { cat: "Chinese", name: "Chicken Fried Rice", price: "₹149", desc: "Wok-fried rice with chicken, egg, spring onion", veg: false, tag: "Bestseller" },
    { cat: "Chinese", name: "Chilli Paneer (Dry)", price: "₹169", desc: "Crispy paneer tossed in spicy Indo-Chinese sauce", veg: true },
    { cat: "Chinese", name: "Chicken Manchurian", price: "₹179", desc: "Crispy chicken in tangy Manchurian gravy", veg: false },
    { cat: "Chinese", name: "Veg Spring Rolls (6 pcs)", price: "₹119", desc: "Crispy rolls filled with cabbage, carrot, mushroom", veg: true },
    // Momos
    { cat: "Momos", name: "Steamed Veg Momos (8 pcs)", price: "₹99", desc: "Classic steamed momos with signature chutney", veg: true, tag: "Fan Fav" },
    { cat: "Momos", name: "Steamed Chicken Momos (8 pcs)", price: "₹119", desc: "Juicy chicken momos, steamed to perfection", veg: false },
    { cat: "Momos", name: "Fried Paneer Momos (8 pcs)", price: "₹129", desc: "Crispy fried paneer momos with spicy dip", veg: true },
    { cat: "Momos", name: "Tandoori Chicken Momos (6 pcs)", price: "₹139", desc: "Smoked in tandoor, served with onion & lemon", veg: false, tag: "Must Try" },
    // Tandoori
    { cat: "Tandoori", name: "Malai Tikka", price: "₹219", desc: "Creamy marinated chicken from clay oven, 6 pcs", veg: false, tag: "Must Try" },
    { cat: "Tandoori", name: "Paneer Tikka", price: "₹199", desc: "Marinated cottage cheese grilled in tandoor, 6 pcs", veg: true, tag: "Popular" },
    { cat: "Tandoori", name: "Seekh Kebab", price: "₹229", desc: "Minced chicken seekh kebab, mint chutney, 4 pcs", veg: false },
    { cat: "Tandoori", name: "Chicken Tikka", price: "₹239", desc: "Classic Punjabi chicken tikka, 6 pcs", veg: false },
    // Coffee
    { cat: "Coffee", name: "Cafe Latte", price: "₹99", desc: "Smooth espresso with velvety steamed milk", veg: true },
    { cat: "Coffee", name: "Cold Coffee", price: "₹89", desc: "Chilled coffee blended with milk & ice cream", veg: true, tag: "Popular" },
    { cat: "Coffee", name: "Cappuccino", price: "₹89", desc: "Espresso, steamed milk, thick frothy foam", veg: true },
    { cat: "Coffee", name: "Mocha", price: "₹109", desc: "Espresso, chocolate sauce, steamed milk, whipped cream", veg: true },
    // Shakes
    { cat: "Shakes", name: "Oreo Shake", price: "₹119", desc: "Thick oreo milkshake topped with whipped cream", veg: true, tag: "Fan Fav" },
    { cat: "Shakes", name: "Strawberry Shake", price: "₹109", desc: "Fresh strawberry blended with thick vanilla ice cream", veg: true },
    { cat: "Shakes", name: "Chocolate Fudge Shake", price: "₹129", desc: "Rich chocolate shake with brownie chunks", veg: true },
    { cat: "Shakes", name: "Mango Madness", price: "₹119", desc: "Alphonso mango pulp, vanilla ice cream", veg: true, tag: "Seasonal" },
    // Desserts
    { cat: "Desserts", name: "Brownie with Ice Cream", price: "₹129", desc: "Warm chocolate brownie, 2 scoops vanilla ice cream", veg: true, tag: "Bestseller" },
    { cat: "Desserts", name: "Waffle Stack", price: "₹149", desc: "Belgian waffles, whipped cream, mixed berry compote", veg: true },
    { cat: "Desserts", name: "Gulab Jamun", price: "₹79", desc: "Soft gulab jamun soaked in rose sugar syrup, 4 pcs", veg: true },
    // Combos
    { cat: "Combos", name: "Family Meal Combo", price: "₹499", desc: "2 Pizzas + 4 Burgers + 2 Shakes + Fries", veg: false, tag: "Best Value" },
    { cat: "Combos", name: "Date Night Combo", price: "₹399", desc: "Pizza + 2 Momos + 2 Coffee + Dessert", veg: true, tag: "Popular" },
    { cat: "Combos", name: "Momo Mania Combo", price: "₹249", desc: "2 Plates Momos + 2 Cold Coffee + Fries", veg: true },
  ];

  const categories = ["All", "Pizza", "Burgers", "Wraps", "Chinese", "Momos", "Tandoori", "Coffee", "Shakes", "Desserts", "Combos"];
  const filtered = activeCategory === "All" ? menuItems : menuItems.filter(i => i.cat === activeCategory);

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Header */}
      <section style={{ padding: "60px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Explore Our Offerings</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: COLORS.white }}>
          Our <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Menu</span>
        </h1>
        <p style={{ color: COLORS.textLight, marginTop: 12, fontFamily: "Jost", letterSpacing: "0.05em" }}>
          Fresh ingredients · Made to order · Served with love
        </p>
      </section>

      {/* Category Tabs */}
      <div style={{ background: COLORS.black, borderBottom: `1px solid rgba(201,168,76,0.15)`, overflowX: "auto", whiteSpace: "nowrap", padding: "0 20px" }}>
        <div style={{ display: "inline-flex", gap: 0, minWidth: "max-content" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Jost", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em",
              textTransform: "uppercase", padding: "18px 20px",
              color: activeCategory === cat ? COLORS.gold : COLORS.textLight,
              borderBottom: activeCategory === cat ? `2px solid ${COLORS.gold}` : "2px solid transparent",
              transition: "all 0.3s",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ padding: "40px 20px 80px", background: COLORS.black, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {filtered.map((item, i) => (
            <div key={`${item.name}-${i}`} className="reveal card-hover" style={{
              background: COLORS.brown, border: `1px solid rgba(201,168,76,0.1)`,
              display: "flex", gap: 16, padding: "20px", alignItems: "flex-start",
              transitionDelay: `${(i % 6) * 0.05}s`,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: item.veg ? "#4CAF50" : "#E53935", border: `2px solid ${item.veg ? "#4CAF50" : "#E53935"}`, flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 500, color: COLORS.beige }}>{item.name}</span>
                  {item.tag && <span style={{ fontSize: 9, background: COLORS.gold, color: COLORS.black, padding: "2px 6px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{item.tag}</span>}
                </div>
                <p style={{ fontSize: 12, color: COLORS.textLight, lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: COLORS.gold, fontWeight: 600 }}>{item.price}</span>
                  <a href={`https://wa.me/91${PHONE1}?text=${encodeURIComponent(`Hi! I want to order: ${item.name} (${item.price})`)}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <button style={{
                      background: "transparent", border: `1px solid rgba(201,168,76,0.4)`,
                      color: COLORS.gold, fontFamily: "Jost", fontSize: 9, fontWeight: 600,
                      letterSpacing: "0.15em", textTransform: "uppercase", padding: "7px 12px", cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.color = COLORS.black; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.gold; }}>
                      Order →
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ABOUT PAGE
// ============================================================
const AboutPage = () => {
  useScrollReveal();
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Our Story</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: COLORS.white }}>
          About <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Café Desire</span>
        </h1>
      </section>

      <section style={{ padding: "80px 20px", background: COLORS.black }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="section-label reveal" style={{ marginBottom: 16 }}>Our Passion</div>
            <h2 className="font-display reveal" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: COLORS.white, marginBottom: 24 }}>
              Born from a love of <span style={{ color: COLORS.gold, fontStyle: "italic" }}>great food</span>
            </h2>
            <p className="reveal" style={{ color: COLORS.textLight, lineHeight: 1.9, marginBottom: 20 }}>
              Café Desire was founded with a simple mission: bring premium restaurant-quality food to everyday families in North Delhi. Nestled in the heart of Holambi Khurd, we've become the neighborhood's most beloved dining spot.
            </p>
            <p className="reveal" style={{ color: COLORS.textLight, lineHeight: 1.9, marginBottom: 32 }}>
              Every dish we serve reflects our commitment to freshness, flavor, and affordability. Our kitchen operates with the highest standards of hygiene, and our chefs bring years of culinary training to your table every single day.
            </p>
            <GoldDivider style={{ marginBottom: 32, maxWidth: 300 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { n: "3+", l: "Years Serving" },
                { n: "10,000+", l: "Happy Guests" },
                { n: "50+", l: "Menu Items" },
                { n: "4.8★", l: "Google Rating" },
              ].map(s => (
                <div key={s.l} className="reveal" style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: 16 }}>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, color: COLORS.gold }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { icon: "🌿", t: "Fresh Every Day", d: "We source our ingredients daily from trusted local vendors, ensuring peak freshness in every dish." },
              { icon: "🧹", t: "Hygienic Kitchen", d: "Our kitchen is maintained to the highest cleanliness standards, certified and inspected regularly." },
              { icon: "👨‍👩‍👧‍👦", t: "Family Atmosphere", d: "We create a warm, welcoming environment where families can relax and make memories." },
              { icon: "💝", t: "Made with Love", d: "Every plate is crafted with genuine care and passion for delivering joy through food." },
            ].map((item, i) => (
              <div key={item.t} className="reveal card-hover" style={{ background: COLORS.brown, border: `1px solid rgba(201,168,76,0.15)`, padding: "24px", display: "flex", gap: 16, transitionDelay: `${i * 0.1}s` }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: COLORS.beige, marginBottom: 6 }}>{item.t}</div>
                  <div style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6 }}>{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="font-display reveal" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: COLORS.white, marginBottom: 24 }}>
            Our <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Mission</span>
          </h2>
          <p className="reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontStyle: "italic", color: COLORS.beige, lineHeight: 1.8 }}>
            "To serve every guest the finest food at the most honest prices, in a space that feels like home — because at Café Desire, you're not just a customer, you're family."
          </p>
          <GoldDivider style={{ margin: "40px auto", maxWidth: 300 }} />
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${PHONE1}`} style={{ textDecoration: "none" }}><button className="btn-gold">📞 Call Us</button></a>
            <a href={`https://wa.me/91${PHONE1}?text=${WA_MSG}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><button className="btn-outline">💬 WhatsApp</button></a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================
// GALLERY PAGE
// ============================================================
const GalleryPage = () => {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const items = [
    { cat: "Food", emoji: "🍕", title: "Pizza Collection", bg: "#3b1500" },
    { cat: "Food", emoji: "🍔", title: "Burger Tower", bg: "#2a1200" },
    { cat: "Ambience", emoji: "🕯️", title: "Evening Warmth", bg: "#1a0a00" },
    { cat: "Food", emoji: "🥟", title: "Momo Platters", bg: "#3b2000" },
    { cat: "Celebrations", emoji: "🎂", title: "Birthday Bliss", bg: "#2a1800" },
    { cat: "Seating", emoji: "🪑", title: "Cozy Seating", bg: "#201000" },
    { cat: "Food", emoji: "🍗", title: "Tandoori Platter", bg: "#3a1600" },
    { cat: "Family", emoji: "👨‍👩‍👧‍👦", title: "Family Moments", bg: "#2b1400" },
    { cat: "Food", emoji: "🥤", title: "Shake Station", bg: "#1e1000" },
    { cat: "Ambience", emoji: "✨", title: "Café Interior", bg: "#301a08" },
    { cat: "Celebrations", emoji: "🎉", title: "Party Night", bg: "#251200" },
    { cat: "Food", emoji: "🍜", title: "Chinese Spread", bg: "#2e1400" },
  ];

  const filters = ["All", "Food", "Ambience", "Seating", "Celebrations", "Family"];
  const filtered = activeFilter === "All" ? items : items.filter(i => i.cat === activeFilter);

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Visual Journey</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: COLORS.white }}>
          Our <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Gallery</span>
        </h1>
      </section>

      <div style={{ background: COLORS.black, borderBottom: `1px solid rgba(201,168,76,0.15)`, display: "flex", justifyContent: "center", padding: "0 20px", overflowX: "auto", whiteSpace: "nowrap" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "Jost", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em",
            textTransform: "uppercase", padding: "18px 20px",
            color: activeFilter === f ? COLORS.gold : COLORS.textLight,
            borderBottom: activeFilter === f ? `2px solid ${COLORS.gold}` : "2px solid transparent",
            transition: "all 0.3s",
          }}>{f}</button>
        ))}
      </div>

      <div style={{ padding: "40px 20px 80px", background: COLORS.black }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", columns: "3 280px", gap: 16 }}>
          {filtered.map((item, i) => (
            <div key={`${item.title}-${i}`} className="reveal" onClick={() => setLightbox(item)}
              style={{
                breakInside: "avoid", marginBottom: 16, overflow: "hidden",
                cursor: "pointer", border: `1px solid rgba(201,168,76,0.1)`,
                transitionDelay: `${(i % 6) * 0.08}s`,
              }}>
              <div style={{
                height: 150 + (i % 3) * 80,
                background: `linear-gradient(135deg, ${item.bg}, ${COLORS.black})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 64, position: "relative", overflow: "hidden",
                transition: "transform 0.5s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
                {item.emoji}
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.3s" }}
                  onMouseEnter={e => { e.target.style.background = "rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { e.target.style.background = "rgba(0,0,0,0)"; }} />
              </div>
              <div style={{ background: COLORS.brown, padding: "12px 16px" }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 16, color: COLORS.beige }}>{item.title}</div>
                <div style={{ fontSize: 10, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.3s ease" }}>
          <div style={{ textAlign: "center", animation: "scaleIn 0.3s ease" }}>
            <div style={{ fontSize: 120, marginBottom: 20 }}>{lightbox.emoji}</div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: COLORS.beige }}>{lightbox.title}</div>
            <div style={{ fontSize: 11, color: COLORS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginTop: 8 }}>{lightbox.cat}</div>
            <div style={{ color: COLORS.textLight, marginTop: 20, fontSize: 12 }}>Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// CONTACT PAGE
// ============================================================
const ContactPage = () => {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    const msg = encodeURIComponent(`Hi! My name is ${form.name}.\nPhone: ${form.phone}\nMessage: ${form.message}`);
    window.open(`https://wa.me/91${PHONE1}?text=${msg}`, "_blank");
    setSent(true);
  };

  const quickActions = [
    { icon: "🗺️", label: "Get Directions", desc: "Navigate to Café Desire", action: () => window.open(`https://maps.google.com/?q=Holambi+Khurd+DIRD+College+Delhi`, "_blank") },
    { icon: "🎂", label: "Book Birthday", desc: "Plan your celebration", action: () => window.open(`https://wa.me/91${PHONE1}?text=${encodeURIComponent("Hi! I'd like to book a birthday party.")}`, "_blank") },
    { icon: "🍽️", label: "Catering", desc: "Events & bulk orders", action: () => window.open(`https://wa.me/91${PHONE1}?text=${encodeURIComponent("Hi! I need catering for an event.")}`, "_blank") },
    { icon: "📦", label: "Bulk Order", desc: "Corporate & group meals", action: () => window.open(`https://wa.me/91${PHONE1}?text=${encodeURIComponent("Hi! I need to place a bulk order.")}`, "_blank") },
    { icon: "💬", label: "Support", desc: "Any query or feedback", action: () => window.open(`https://wa.me/91${PHONE1}?text=${WA_MSG}`, "_blank") },
  ];

  const inputStyle = {
    width: "100%", background: COLORS.black, border: `1px solid rgba(201,168,76,0.2)`,
    color: COLORS.beige, fontFamily: "Jost", fontSize: 14, padding: "14px 16px",
    outline: "none", transition: "border-color 0.3s", marginBottom: 16,
  };

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Get In Touch</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: COLORS.white }}>
          Contact <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Us</span>
        </h1>
      </section>

      {/* Quick Action Cards */}
      <section style={{ padding: "60px 20px", background: COLORS.black }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 60 }}>
            {quickActions.map((qa, i) => (
              <div key={qa.label} className="reveal card-hover" onClick={qa.action} style={{
                background: COLORS.brown, border: `1px solid rgba(201,168,76,0.15)`,
                padding: "24px 16px", textAlign: "center", cursor: "pointer",
                transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{qa.icon}</div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: COLORS.beige, marginBottom: 4 }}>{qa.label}</div>
                <div style={{ fontSize: 11, color: COLORS.textLight }}>{qa.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Info */}
            <div>
              <h2 className="font-display reveal" style={{ fontSize: 36, fontWeight: 300, color: COLORS.white, marginBottom: 32 }}>
                Visit <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Anytime</span>
              </h2>
              {[
                { icon: "📍", t: "Address", v: ADDRESS },
                { icon: "📞", t: "Phone Numbers", v: `${PHONE1} / ${PHONE2}` },
                { icon: "⏰", t: "Opening Hours", v: "11:00 AM – 11:00 PM (Daily)" },
                { icon: "📧", t: "WhatsApp Orders", v: `wa.me/91${PHONE1}` },
              ].map(info => (
                <div key={info.t} className="reveal" style={{ display: "flex", gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid rgba(201,168,76,0.1)` }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{info.icon}</span>
                  <div>
                    <div style={{ fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 4 }}>{info.t}</div>
                    <div style={{ color: COLORS.beige, fontSize: 14 }}>{info.v}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={`tel:${PHONE1}`} style={{ textDecoration: "none" }}><button className="btn-gold" style={{ padding: "12px 20px" }}>📞 Call {PHONE1}</button></a>
                <a href={`tel:${PHONE2}`} style={{ textDecoration: "none" }}><button className="btn-outline" style={{ padding: "11px 19px" }}>📞 Call {PHONE2}</button></a>
                <a href={`https://wa.me/91${PHONE1}?text=${WA_MSG}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <button style={{ background: "#25D366", color: "#fff", border: "none", fontFamily: "Jost", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "12px 20px", cursor: "pointer" }}>💬 WhatsApp</button>
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="reveal">
              <h2 className="font-display" style={{ fontSize: 36, fontWeight: 300, color: COLORS.white, marginBottom: 32 }}>
                Send <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Message</span>
              </h2>
              {sent ? (
                <div style={{ textAlign: "center", padding: 48, border: `1px solid ${COLORS.gold}`, background: COLORS.brown }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: COLORS.gold, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: COLORS.textLight }}>We'll get back to you on WhatsApp very soon.</p>
                  <button onClick={() => setSent(false)} className="btn-gold" style={{ marginTop: 24 }}>Send Another</button>
                </div>
              ) : (
                <div>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name *" style={inputStyle} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Your Phone Number *" style={inputStyle} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your Message" rows={5} style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
                  <button className="btn-gold" onClick={handleSubmit} style={{ width: "100%" }}>Send via WhatsApp →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section style={{ height: 350, position: "relative" }}>
        <iframe
          src="https://maps.google.com/maps?q=Holambi+Khurd+Delhi+110082&output=embed"
          width="100%" height="350" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.5)" }}
          allowFullScreen loading="lazy" title="Cafe Desire Location"
        />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", border: `2px solid rgba(201,168,76,0.3)` }} />
      </section>
    </div>
  );
};

// ============================================================
// BOOK TABLE PAGE
// ============================================================
const BookTablePage = () => {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2", occasion: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.date || !form.time) return;
    const msg = encodeURIComponent(`🍽️ TABLE RESERVATION REQUEST\n\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nOccasion: ${form.occasion || "General Dining"}\nNotes: ${form.notes || "None"}`);
    window.open(`https://wa.me/91${PHONE1}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%", background: COLORS.black, border: `1px solid rgba(201,168,76,0.2)`,
    color: COLORS.beige, fontFamily: "Jost", fontSize: 14, padding: "14px 16px",
    outline: "none", transition: "border-color 0.3s",
  };

  const occasions = ["General Dining", "Birthday Celebration", "Anniversary", "Date Night", "Family Gathering", "Business Meeting", "Engagement", "Other"];
  const times = ["11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","10:30 PM"];

  if (submitted) return (
    <div style={{ paddingTop: 80, minHeight: "80vh", background: COLORS.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 500, width: "90%", textAlign: "center", animation: "scaleIn 0.5s ease" }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, margin: "0 auto 24px" }}>✓</div>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 300, color: COLORS.white, marginBottom: 16 }}>Reservation <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Confirmed!</span></h2>
        <p style={{ color: COLORS.textLight, lineHeight: 1.8, marginBottom: 32 }}>
          Your table request for <strong style={{ color: COLORS.beige }}>{form.guests} guests</strong> on <strong style={{ color: COLORS.beige }}>{form.date} at {form.time}</strong> has been sent. We'll confirm via WhatsApp shortly.
        </p>
        <GoldDivider style={{ marginBottom: 32 }} />
        <p style={{ color: COLORS.textLight, fontSize: 13, marginBottom: 24 }}>Need to speak with us?</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a href={`tel:${PHONE1}`} style={{ textDecoration: "none" }}><button className="btn-gold">📞 Call Us</button></a>
          <button className="btn-outline" onClick={() => setSubmitted(false)}>New Booking</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Reserve Your Spot</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: COLORS.white }}>
          Book a <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Table</span>
        </h1>
        <p style={{ color: COLORS.textLight, marginTop: 12 }}>Open daily 11:00 AM – 11:00 PM</p>
      </section>

      <section style={{ padding: "60px 20px 80px", background: COLORS.black }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: COLORS.brown, border: `1px solid rgba(201,168,76,0.2)`, padding: "48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 8 }}>Full Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" style={inputStyle} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 8 }}>Phone Number *</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Your Phone" style={inputStyle} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 8 }}>Date *</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ ...inputStyle, colorScheme: "dark" }} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 8 }}>Time *</label>
                <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}>
                  <option value="">Select Time</option>
                  {times.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 8 }}>Guests</label>
                <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}>
                  {[1,2,3,4,5,6,7,8,9,10,"10+"].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 8 }}>Occasion</label>
                <select value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}>
                  {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontFamily: "Jost", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 8 }}>Special Requests / Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any dietary requirements, special decoration requests, etc." rows={4} style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = COLORS.gold} onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"} />
            </div>
            <button className="btn-gold" onClick={handleSubmit} style={{ width: "100%", padding: "18px", fontSize: 12 }}>
              📅 Confirm Reservation via WhatsApp
            </button>
            <p style={{ fontSize: 11, color: COLORS.textLight, textAlign: "center", marginTop: 16 }}>
              Reservation request will be sent via WhatsApp. We'll confirm within 30 minutes.
            </p>
          </div>

          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { icon: "⏰", t: "Hours", v: "11 AM – 11 PM" },
              { icon: "📞", t: "Call Us", v: PHONE1 },
              { icon: "📍", t: "Location", v: "Holambi Khurd" },
            ].map(i => (
              <div key={i.t} style={{ background: COLORS.brown, border: `1px solid rgba(201,168,76,0.1)`, padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{i.icon}</div>
                <div style={{ fontFamily: "Jost", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 4 }}>{i.t}</div>
                <div style={{ fontSize: 13, color: COLORS.beige }}>{i.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================
// OFFERS PAGE
// ============================================================
const OffersPage = ({ setPage }) => {
  useScrollReveal();

  const offers = [
    { emoji: "👨‍👩‍👧‍👦", title: "Family Feast Combo", price: "₹499", orig: "₹699", discount: "29% OFF", desc: "2 Large Pizzas + 4 Burgers + 2 Thick Shakes + Masala Fries", tag: "Best Value", valid: "Daily" },
    { emoji: "📅", title: "Wednesday Special", price: "20% OFF", orig: null, discount: null, desc: "Get 20% off your entire bill every Wednesday. Dine-in only.", tag: "Weekly Deal", valid: "Every Wednesday" },
    { emoji: "🎂", title: "Birthday Party Package", price: "₹1,499", orig: "₹2,200", discount: "32% OFF", desc: "Table for 6 · Decoration · Birthday Cake · 6 Combo Meals · Special dessert", tag: "Celebration", valid: "Book 2 days prior" },
    { emoji: "🍕", title: "Pizza Party Duo", price: "₹349", orig: "₹450", discount: "22% OFF", desc: "2 Medium Pizzas + 2 Cold Coffees + 1 Garlic Bread", tag: "Great Deal", valid: "Daily" },
    { emoji: "🌙", title: "Evening Combo", price: "₹299", orig: "₹380", discount: "21% OFF", desc: "Momos + Chinese Main + 2 Beverages. Perfect evening plan!", tag: "Evening Special", valid: "5 PM – 9 PM" },
    { emoji: "🎉", title: "Group Celebration Pack", price: "Custom", orig: null, discount: null, desc: "Catering for 20+ guests. Custom menu. Special decorations. Great pricing.", tag: "Group Offer", valid: "Pre-booking required" },
  ];

  const coupons = ["DESIRE10", "FAMILY20", "BDAY15", "PIZZA25"];

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Save More, Eat More</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: COLORS.white }}>
          Today's <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Offers</span>
        </h1>
      </section>

      <section style={{ padding: "60px 20px 80px", background: COLORS.black }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 60 }}>
            {offers.map((offer, i) => (
              <div key={offer.title} className="reveal card-hover" style={{
                background: COLORS.brown, border: `1px solid rgba(201,168,76,0.15)`,
                overflow: "hidden", transitionDelay: `${i * 0.1}s`,
              }}>
                <div style={{ background: `linear-gradient(135deg, rgba(201,168,76,0.15), rgba(59,35,20,0.5))`, padding: "32px 24px 24px", position: "relative" }}>
                  <div style={{ position: "absolute", top: 12, right: 12, background: COLORS.gold, color: COLORS.black, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px", textTransform: "uppercase" }}>{offer.tag}</div>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{offer.emoji}</div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: COLORS.white, marginBottom: 8 }}>{offer.title}</h3>
                  <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>{offer.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: COLORS.gold, fontWeight: 600 }}>{offer.price}</span>
                    {offer.orig && <span style={{ fontSize: 16, color: COLORS.textLight, textDecoration: "line-through" }}>{offer.orig}</span>}
                    {offer.discount && <span style={{ fontSize: 11, background: "rgba(76,175,80,0.2)", color: "#4CAF50", padding: "3px 8px", fontWeight: 700 }}>{offer.discount}</span>}
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.textLight, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Valid: {offer.valid}</div>
                </div>
                <div style={{ padding: "16px 24px", borderTop: `1px solid rgba(201,168,76,0.1)` }}>
                  <a href={`https://wa.me/91${PHONE1}?text=${encodeURIComponent(`Hi! I'd like to avail the ${offer.title} offer.`)}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <button style={{ width: "100%", background: "transparent", border: `1px solid ${COLORS.gold}`, color: COLORS.gold, fontFamily: "Jost", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", padding: "10px 0", cursor: "pointer", transition: "all 0.3s" }}
                      onMouseEnter={e => { e.target.style.background = COLORS.gold; e.target.style.color = COLORS.black; }}
                      onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.gold; }}>
                      💬 Claim This Offer
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Section */}
          <div style={{ background: COLORS.brown, border: `1px solid rgba(201,168,76,0.2)`, padding: 48, textAlign: "center" }}>
            <h2 className="font-display" style={{ fontSize: 36, fontWeight: 300, color: COLORS.white, marginBottom: 8 }}>
              Coupon <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Codes</span>
            </h2>
            <p style={{ color: COLORS.textLight, marginBottom: 32 }}>Use these codes when ordering on WhatsApp</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              {coupons.map(code => (
                <div key={code} style={{ background: COLORS.black, border: `1px dashed ${COLORS.gold}`, padding: "12px 24px", fontFamily: "Jost", fontSize: 20, fontWeight: 700, letterSpacing: "0.3em", color: COLORS.gold, cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => navigator.clipboard?.writeText(code)}
                  title="Click to copy">
                  {code}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: COLORS.textLight, marginTop: 16 }}>Click to copy · Subject to availability · Cannot be clubbed</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================
// BLOG PAGE
// ============================================================
const BlogPage = ({ setPage }) => {
  useScrollReveal();

  const posts = [
    {
      slug: "best-cafe-north-delhi",
      title: "Best Cafe in North Delhi: Why Café Desire Leads the Pack",
      category: "Café Culture",
      date: "April 15, 2025",
      excerpt: "Discover why thousands of families in North Delhi choose Café Desire for their dining experience. From award-winning pizza to legendary momos...",
      readTime: "4 min read",
      emoji: "☕"
    },
    {
      slug: "best-pizza-holambi-khurd",
      title: "Best Pizza Near Holambi Khurd: A Complete Guide",
      category: "Food Guide",
      date: "March 28, 2025",
      excerpt: "If you're searching for the best pizza near Holambi Khurd, DIRD College, or Alipur, your search ends here. Café Desire serves Delhi's most-loved pizzas...",
      readTime: "5 min read",
      emoji: "🍕"
    },
    {
      slug: "affordable-family-cafe-delhi",
      title: "Affordable Family Cafe in Delhi: Premium Food, Honest Prices",
      category: "Family Dining",
      date: "March 10, 2025",
      excerpt: "Looking for a premium dining experience that doesn't break the bank? Café Desire offers restaurant-quality food at everyday prices for families across Delhi...",
      readTime: "3 min read",
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      slug: "best-momos-north-delhi",
      title: "Best Momos in North Delhi: Steamed, Fried & Tandoori",
      category: "Food Guide",
      date: "February 20, 2025",
      excerpt: "From classic steamed to smoky tandoori — our momo varieties have made Café Desire the top momo destination in North Delhi's Holambi Khurd area...",
      readTime: "4 min read",
      emoji: "🥟"
    },
    {
      slug: "birthday-party-cafe-delhi",
      title: "Planning a Birthday Party? Here's Why Café Desire is Perfect",
      category: "Events & Parties",
      date: "February 5, 2025",
      excerpt: "From custom decorations to group meal packages, Café Desire makes your birthday unforgettable. Here's everything included in our birthday packages...",
      readTime: "6 min read",
      emoji: "🎂"
    },
    {
      slug: "late-night-food-delhi",
      title: "Late Night Food Near Me in Delhi: Open Till 11 PM Daily",
      category: "Night Life",
      date: "January 18, 2025",
      excerpt: "Craving good food late at night near Holambi Khurd or DIRD College? Café Desire is open until 11 PM every single day, serving fresh hot food...",
      readTime: "3 min read",
      emoji: "🌙"
    },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 20px", background: COLORS.brown, textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Stories & Guides</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: COLORS.white }}>
          Our <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Blog</span>
        </h1>
        <p style={{ color: COLORS.textLight, marginTop: 12 }}>Food stories, local guides & cafe updates</p>
      </section>

      <section style={{ padding: "60px 20px 80px", background: COLORS.black }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Featured Post */}
          <div className="reveal" style={{ background: COLORS.brown, border: `1px solid rgba(201,168,76,0.15)`, marginBottom: 40, overflow: "hidden", display: "grid", gridTemplateColumns: "2fr 3fr" }}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.brownMid}, ${COLORS.black})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100, padding: 40 }}>{posts[0].emoji}</div>
            <div style={{ padding: "40px" }}>
              <div style={{ fontSize: 9, color: COLORS.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>{posts[0].category} · {posts[0].date} · {posts[0].readTime}</div>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 400, color: COLORS.white, marginBottom: 16, lineHeight: 1.3 }}>{posts[0].title}</h2>
              <p style={{ color: COLORS.textLight, lineHeight: 1.7, marginBottom: 24, fontSize: 14 }}>{posts[0].excerpt}</p>
              <button className="btn-gold" style={{ borderRadius: 0 }}>Read Article →</button>
            </div>
          </div>

          {/* Other Posts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {posts.slice(1).map((post, i) => (
              <div key={post.slug} className="reveal card-hover" style={{
                background: COLORS.brown, border: `1px solid rgba(201,168,76,0.1)`,
                overflow: "hidden", transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{ height: 160, background: `linear-gradient(135deg, ${COLORS.brownMid}, ${COLORS.black})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72 }}>{post.emoji}</div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 9, color: COLORS.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{post.category} · {post.readTime}</div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: COLORS.white, marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</p>
                  <button style={{ background: "none", border: "none", color: COLORS.gold, fontFamily: "Jost", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", padding: 0 }}>Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = ({ setPage }) => (
  <footer style={{ background: COLORS.brown, borderTop: `1px solid rgba(201,168,76,0.2)` }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 20px 30px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 40 }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 300, color: COLORS.gold, marginBottom: 4 }}>Café Desire</div>
          <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: COLORS.textLight, marginBottom: 16 }}>✦ Delhi's Finest ✦</div>
          <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20 }}>
            North Delhi's favorite family cafe, serving fresh food with warmth and love since 2020.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["📘","📸","💬","⭐"].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s", fontSize: 16 }}
                onMouseEnter={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.borderColor = COLORS.gold; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}>
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: "Jost", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 20 }}>Quick Links</h4>
          {["home","menu","about","gallery","offers","blog","contact","book"].map(link => (
            <button key={link} onClick={() => setPage(link)} style={{
              display: "block", background: "none", border: "none", cursor: "pointer",
              fontFamily: "Jost", fontSize: 13, color: COLORS.textLight, textAlign: "left",
              padding: "5px 0", textTransform: "capitalize", transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = COLORS.gold}
            onMouseLeave={e => e.target.style.color = COLORS.textLight}>
              → {link === "book" ? "Book Table" : link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "Jost", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 20 }}>Contact</h4>
          <div style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 2 }}>
            <p>📍 {ADDRESS}</p>
            <p>📞 <a href={`tel:${PHONE1}`} style={{ color: COLORS.textLight, textDecoration: "none" }}>{PHONE1}</a></p>
            <p>📞 <a href={`tel:${PHONE2}`} style={{ color: COLORS.textLight, textDecoration: "none" }}>{PHONE2}</a></p>
            <p>⏰ 11:00 AM – 11:00 PM Daily</p>
          </div>
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <a href={`tel:${PHONE1}`} style={{ textDecoration: "none", flex: 1 }}>
              <button className="btn-gold" style={{ width: "100%", padding: "10px 0", fontSize: 10 }}>📞 Call</button>
            </a>
            <a href={`https://wa.me/91${PHONE1}?text=${WA_MSG}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none", flex: 1 }}>
              <button style={{ width: "100%", padding: "10px 0", background: "#25D366", color: "#fff", border: "none", fontFamily: "Jost", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>💬 WhatsApp</button>
            </a>
          </div>
        </div>

        {/* Hours & Map Mini */}
        <div>
          <h4 style={{ fontFamily: "Jost", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 20 }}>Hours & Location</h4>
          <div style={{ fontSize: 13, color: COLORS.textLight, marginBottom: 16 }}>
            {["Monday–Sunday","11:00 AM","to 11:00 PM","Open Daily"].map((t, i) => (
              <p key={i} style={{ padding: "4px 0", borderBottom: `1px solid rgba(201,168,76,0.08)` }}>{i === 0 ? "📅 " : ""}{t}</p>
            ))}
          </div>
          <div style={{ height: 100, overflow: "hidden", borderRadius: 4 }}>
            <iframe src="https://maps.google.com/maps?q=Holambi+Khurd+Delhi+110082&output=embed" width="100%" height="180" style={{ border: 0, marginTop: -40, filter: "invert(90%) hue-rotate(180deg) saturate(0.3)" }} title="Map" />
          </div>
        </div>
      </div>

      <GoldDivider style={{ marginBottom: 24 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 11, color: COLORS.textLight }}>© 2025 Café Desire. All rights reserved. · Holambi Khurd, Delhi</p>
        <p style={{ fontSize: 11, color: COLORS.textLight }}>Made with ❤️ for families of North Delhi</p>
      </div>
    </div>
  </footer>
);

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");

  const navigateTo = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={navigateTo} />;
      case "menu": return <MenuPage />;
      case "about": return <AboutPage />;
      case "gallery": return <GalleryPage />;
      case "contact": return <ContactPage />;
      case "book": return <BookTablePage />;
      case "offers": return <OffersPage setPage={navigateTo} />;
      case "blog": return <BlogPage setPage={navigateTo} />;
      default: return <HomePage setPage={navigateTo} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.black }}>
      <FontLoader />
      <GlobalStyle />
      <Navbar page={page} setPage={navigateTo} />
      <main style={{ paddingBottom: 80 }}>
        {renderPage()}
      </main>
      <Footer setPage={navigateTo} />
      <FloatingButtons />
      <MobileBottomBar setPage={navigateTo} />
    </div>
  );
}

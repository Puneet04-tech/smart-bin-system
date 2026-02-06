"use client";

import { motion } from "framer-motion";
import { Battery, Zap, Search, Home, Users, Award, TrendingUp, Globe, Sparkles, Shield, Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const stats = [
  { label: "E-Waste Recycled", value: "500+ Tons", icon: Battery, color: "var(--primary-600)" },
  { label: "Active Users", value: "10,000+", icon: Users, color: "var(--accent-500)" },
  { label: "Rewards Earned", value: "₹50L+", icon: Award, color: "var(--primary-600)" },
  { label: "CO₂ Saved", value: "1000+ Tons", icon: TrendingUp, color: "var(--accent-500)" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Detection",
    description: "Advanced AI automatically identifies and sorts different types of e-waste, ensuring proper recycling.",
    gradient: "var(--gradient-primary)"
  },
  {
    icon: Award,
    title: "Earn Rewards",
    description: "Get rewarded for every item you recycle. Earn points, badges, and exclusive offers from partners.",
    gradient: "var(--gradient-accent)"
  },
  {
    icon: Globe,
    title: "Environmental Impact",
    description: "Track your contribution to sustainability. See CO₂ saved and waste diverted from landfills.",
    gradient: "var(--gradient-primary)"
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Your data is protected. Smart bins ensure secure disposal of electronic devices.",
    gradient: "var(--gradient-accent)"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Zero-landfill approach. Every item is processed through sustainable recycling methods.",
    gradient: "var(--gradient-primary)"
  },
  {
    icon: Search,
    title: "Easy to Find",
    description: "Locate nearby smart bins instantly with our intelligent location-based system.",
    gradient: "var(--gradient-accent)"
  }
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      {/* Background Decorative Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '600px', overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '80px',
          width: '288px',
          height: '288px',
          background: 'rgba(34, 197, 94, 0.2)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '160px',
          right: '80px',
          width: '384px',
          height: '384px',
          background: 'rgba(250, 204, 21, 0.2)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 3s ease-in-out infinite 1s'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <Battery size={24} />
              </div>
              <span>Smart E-Waste Bin</span>
            </div>
            <div className="nav-links">
              <button onClick={() => window.location.href = "/rewards"}>
                Rewards
              </button>
              <button onClick={() => window.location.href = "/waste-detection"}>
                Waste Detection
              </button>
              <button onClick={() => window.location.href = "/community"}>
                Community
              </button>
              <button onClick={() => window.location.href = "/carbon-marketplace"}>
                Marketplace
              </button>
              <button onClick={() => window.location.href = "/analytics"}>
                Analytics
              </button>
              <button onClick={() => window.location.href = "/gamification"}>
                Gamify
              </button>
              <button onClick={() => window.location.href = "/admin"}>
                Admin
              </button>
              <ThemeToggle />
              <button 
                onClick={() => window.location.href = "/login"}
                style={{
                  background: 'none',
                  border: '2px solid var(--primary-600)',
                  color: 'var(--primary-600)',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                Sign In
              </button>
              <button className="btn btn-primary" onClick={() => window.location.href = "/register"}>
                Get Started
              </button>
            </div>
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <button onClick={() => { window.location.href = "/rewards"; setMobileMenuOpen(false); }}>
            Rewards
          </button>
          <button onClick={() => { window.location.href = "/waste-detection"; setMobileMenuOpen(false); }}>
            Waste Detection
          </button>
          <button onClick={() => { window.location.href = "/community"; setMobileMenuOpen(false); }}>
            Community
          </button>
          <button onClick={() => { window.location.href = "/carbon-marketplace"; setMobileMenuOpen(false); }}>
            Marketplace
          </button>
          <button onClick={() => { window.location.href = "/analytics"; setMobileMenuOpen(false); }}>
            Analytics
          </button>
          <button onClick={() => { window.location.href = "/gamification"; setMobileMenuOpen(false); }}>
            Gamify
          </button>
          <button onClick={() => { window.location.href = "/admin"; setMobileMenuOpen(false); }}>
            Admin
          </button>
          <button onClick={() => window.location.href = "/login"}>
            Sign In
          </button>
          <button className="btn-primary" onClick={() => setMobileMenuOpen(false)}>
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" style={{ 
        padding: '120px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge" style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: '#fef9c3',
              color: '#a16207',
              borderRadius: 'var(--radius-2xl)',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '24px',
              border: '1px solid #fef08a'
            }}>
              🌍 Transforming E-Waste into Environmental Gold
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: '800', 
              marginBottom: '24px',
              lineHeight: '1.1'
            }}>
              <span style={{ color: '#047857' }}>Smart E-Waste</span>
              <br />
              <span style={{ color: '#b45309' }}>Management System</span>
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#334155', 
              maxWidth: '600px', 
              margin: '0 auto 40px',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              Transform your electronic waste into rewards with our AI-powered smart bins. 
              Join the revolution in sustainable recycling.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.href = "/bin-finder/ewaste-products"}
                style={{ fontSize: '1.1rem', padding: '16px 32px' }}
              >
                <Zap size={20} />
                Choose Products to Recycle
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => window.location.href = "/bin-finder"}
                style={{ fontSize: '1.1rem', padding: '16px 32px' }}
              >
                <Search size={20} />
                Find Bins
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #ecfdf5 0%, #fce7f3 50%, #eff6ff 100%)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: '#1f2937' }}>
              Environmental Impact in Numbers
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>
              Join thousands making a difference through smart e-waste recycling
            </p>
          </motion.div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '32px'
          }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                  whileHover={{ scale: 1.05 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: stat.color,
                    borderRadius: 'var(--radius-2xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: 'var(--shadow-lg)'
                  }}>
                    <Icon size={40} color="white" />
                  </div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: stat.color,
                    marginBottom: '8px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'var(--neutral-600)', fontSize: '1.1rem', fontWeight: '500' }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #ecfdf5 0%, #fce7f3 50%, #eff6ff 100%)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: '#1f2937' }}>
              Why Choose Smart Bins?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>
              Experience the future of e-waste management with cutting-edge technology
            </p>
          </motion.div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '32px' 
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: feature.gradient,
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    <Icon size={32} color="white" />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: 'var(--neutral-800)' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--neutral-600)', lineHeight: '1.7', fontSize: '1rem' }}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section style={{ 
        padding: '80px 20px', 
        background: 'linear-gradient(135deg, #ecfdf5 0%, #fce7f3 50%, #eff6ff 100%)',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <div style={{ 
              display: 'inline-block',
              padding: '8px 20px',
              background: 'var(--accent-100)',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--accent-700)',
              marginBottom: '20px',
              border: '1px solid var(--accent-200)'
            }}>
              📚 Did You Know?
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: 'white' }}>
              E-Waste Facts & Impact
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px', margin: '0 auto' }}>
              Learn about the importance of proper e-waste disposal and recycling
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '30px'
          }}>
            {[
              {
                icon: "🌍",
                title: "Global E-Waste Crisis",
                fact: "50 million tons",
                description: "of e-waste is generated globally each year, and only 20% is formally recycled."
              },
              {
                icon: "♻️",
                title: "Valuable Resources",
                fact: "$62 billion",
                description: "worth of gold, silver, and other precious metals are thrown away in e-waste annually."
              },
              {
                icon: "🌱",
                title: "Environmental Impact",
                fact: "1 smartphone",
                description: "recycled properly can save enough energy to power a laptop for 44 hours."
              },
              {
                icon: "⚠️",
                title: "Toxic Hazards",
                fact: "E-waste contains",
                description: "lead, mercury, cadmium, and other harmful substances that pollute soil and water."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
                style={{
                  padding: '30px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                whileHover={{ 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: 'var(--neutral-800)' }}>
                  {item.title}
                </h3>
                <div style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '800', 
                  color: 'var(--primary-600)',
                  marginBottom: '12px'
                }}>
                  {item.fact}
                </div>
                <p style={{ color: 'var(--neutral-600)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="card"
            style={{
              marginTop: '50px',
              padding: '30px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: 'var(--neutral-800)' }}>
              💡 Recycling Tips
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {[
                "Remove batteries before disposal",
                "Delete personal data from devices",
                "Keep cables and accessories together",
                "Don't break or dismantle electronics",
                "Clean devices before recycling",
                "Check for take-back programs"
              ].map((tip, index) => (
                <div key={index} style={{
                  padding: '12px',
                  background: 'var(--primary-100)',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: 'var(--primary-700)',
                  border: '1px solid var(--primary-200)'
                }}>
                  ✓ {tip}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 20px', 
        background: 'linear-gradient(135deg, #ecfdf5 0%, #fce7f3 50%, #eff6ff 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              marginBottom: '20px', 
              color: '#1f2937' 
            }}>
              Ready to Make a Difference?
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '40px', 
              color: '#4b5563',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Join thousands of Indians who are already making a positive impact on the environment.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = "/bin-finder/ewaste-products"}
              style={{ 
                background: 'white', 
                color: 'var(--primary-700)', 
                fontSize: '1.1rem',
                padding: '18px 36px',
                fontWeight: '700',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              Start Recycling Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

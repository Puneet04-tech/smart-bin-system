"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Laptop, 
  Battery, 
  Monitor, 
  Tablet, 
  Headphones, 
  Camera, 
  Gamepad2, 
  HardDrive, 
  Router,
  Cpu,
  Mouse,
  Keyboard,
  Speaker,
  Tv,
  Watch,
  Cable,
  Usb,
  Wifi,
  IdCard,
  Printer,
  Webcam,
  Zap,
  Search,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

interface EwasteProduct {
  id: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  recyclable: boolean;
  hazardous: boolean;
  binTypes: string[];
  recyclingProcess: string;
}

const ewasteProducts: EwasteProduct[] = [
  // Mobile Devices
  {
    id: "smartphone",
    name: "Smartphone",
    category: "Mobile Devices",
    icon: Smartphone,
    description: "Mobile phones with advanced computing capabilities",
    recyclable: true,
    hazardous: true,
    binTypes: ["smartphone", "battery", "charger"],
    recyclingProcess: "Battery removal, data destruction, component separation"
  },
  {
    id: "tablet",
    name: "Tablet",
    category: "Mobile Devices",
    icon: Tablet,
    description: "Portable touchscreen computers larger than smartphones",
    recyclable: true,
    hazardous: true,
    binTypes: ["tablet", "battery", "charger"],
    recyclingProcess: "Battery removal, screen separation, component recovery"
  },
  {
    id: "laptop",
    name: "Laptop",
    category: "Computers",
    icon: Laptop,
    description: "Portable personal computers",
    recyclable: true,
    hazardous: true,
    binTypes: ["laptop", "battery", "charger"],
    recyclingProcess: "Battery removal, hard drive destruction, component separation"
  },
  {
    id: "battery",
    name: "Battery",
    category: "Power & Batteries",
    icon: Battery,
    description: "Portable power sources for electronic devices",
    recyclable: true,
    hazardous: true,
    binTypes: ["battery"],
    recyclingProcess: "Chemical separation, material recovery, hazardous waste handling"
  },
  {
    id: "charger",
    name: "Charger/Power Adapter",
    category: "Power & Batteries",
    icon: Zap,
    description: "Devices for charging electronic equipment",
    recyclable: true,
    hazardous: false,
    binTypes: ["charger"],
    recyclingProcess: "Component separation, material recovery, copper extraction"
  },
  {
    id: "monitor",
    name: "Computer Monitor",
    category: "Display Devices",
    icon: Monitor,
    description: "Display devices for computers",
    recyclable: true,
    hazardous: true,
    binTypes: ["monitor"],
    recyclingProcess: "CRT/LCD panel removal, backlight recycling, material recovery"
  },
  {
    id: "printer",
    name: "Printer",
    category: "Peripherals",
    icon: Printer,
    description: "Devices for printing documents and images",
    recyclable: true,
    hazardous: true,
    binTypes: ["printer"],
    recyclingProcess: "Ink/toner removal, component separation, material recovery"
  },
  {
    id: "keyboard",
    name: "Keyboard",
    category: "Peripherals",
    icon: Keyboard,
    description: "Input devices for typing",
    recyclable: true,
    hazardous: false,
    binTypes: ["smartphone"],
    recyclingProcess: "Material separation, plastic recycling, component recovery"
  },
  {
    id: "mouse",
    name: "Mouse",
    category: "Peripherals",
    icon: Mouse,
    description: "Pointing devices for computers",
    recyclable: true,
    hazardous: false,
    binTypes: ["smartphone"],
    recyclingProcess: "Material separation, plastic recycling, component recovery"
  }
];

const categories = Array.from(new Set(ewasteProducts.map(product => product.category)));

export default function EwasteProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<EwasteProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = ewasteProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #fef3c7 50%, #f0fdf4 100%)' }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <Battery size={24} />
              </div>
              <span>E-Waste Products</span>
            </div>
            <div className="nav-links">
              <button onClick={() => window.location.href = "/"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Home
              </button>
              <button onClick={() => window.location.href = "/bin-finder"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Bin Finder
              </button>
              <button onClick={() => window.location.href = "/waste-detection"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Waste Detection
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
            <span className="text-green">E-Waste Products Guide</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Learn about different types of electronic waste and how to recycle them properly.
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                  }}
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card"
                whileHover={{ scale: 1.02 }}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProduct(product)}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <Icon size={24} color="#16a34a" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '4px' }}>{product.name}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{product.category}</p>
                  </div>
                </div>

                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '16px', lineHeight: '1.5' }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {product.recyclable && (
                    <div style={{
                      padding: '4px 8px',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      color: '#16a34a',
                      fontWeight: 'bold'
                    }}>
                      Recyclable
                    </div>
                  )}
                  {product.hazardous && (
                    <div style={{
                      padding: '4px 8px',
                      background: '#fef3c7',
                      border: '1px solid #fde68a',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      color: '#d97706',
                      fontWeight: 'bold'
                    }}>
                      Hazardous
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  <strong>Accepted in:</strong> {product.binTypes.join(", ")}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <AlertTriangle size={48} color="#64748b" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
              Try adjusting your search criteria or filters
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              <RefreshCw size={16} style={{ marginRight: '8px' }} />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#f0fdf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px'
              }}>
                <selectedProduct.icon size={32} color="#16a34a" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '4px' }}>{selectedProduct.name}</h2>
                <p style={{ color: '#64748b' }}>{selectedProduct.category}</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Description</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>{selectedProduct.description}</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Properties</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedProduct.recyclable && (
                  <div style={{
                    padding: '6px 12px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    color: '#16a34a',
                    fontWeight: 'bold'
                  }}>
                    Recyclable
                  </div>
                )}
                {selectedProduct.hazardous && (
                  <div style={{
                    padding: '6px 12px',
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    color: '#d97706',
                    fontWeight: 'bold'
                  }}>
                    Hazardous
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Accepted Bin Types</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedProduct.binTypes.map((binType) => (
                  <div
                    key={binType}
                    style={{
                      padding: '6px 12px',
                      background: '#f3f4f6',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textTransform: 'capitalize'
                    }}
                  >
                    {binType}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Recycling Process</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>{selectedProduct.recyclingProcess}</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  // Store selected product in localStorage
                  localStorage.setItem('selectedEwasteProduct', JSON.stringify(selectedProduct));
                  window.location.href = "/bin-finder";
                }}
              >
                Find Bins for This Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

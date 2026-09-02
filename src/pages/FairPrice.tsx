import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { 
  Search, 
  Info, 
  ShieldCheck, 
  Volume2, 
  Copy, 
  MapPin, 
  Heart, 
  CheckCircle2, 
  X, 
  Check, 
  AlertTriangle,
  QrCode,
  Scan,
  Sparkles,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FairPrice.css';

interface RegistryProduct {
  id: string;
  name: string;
  category: string;
  isCertified: boolean;
  registryId: string;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  artisan: {
    name: string;
    location: string;
    cooperative: string;
    avatar: string;
    bio: string;
    experience: string;
    upiId: string;
  };
  checks?: string[];
  warningMessage?: string;
}

const REGISTRY_PRODUCTS: RegistryProduct[] = [
  {
    id: 'channapatna',
    name: 'Channapatna Wooden Toys',
    category: 'Handicraft / Wood',
    isCertified: true,
    registryId: 'GI-IND-12093-CWT',
    priceRange: '₹150 – ₹800',
    minPrice: 150,
    maxPrice: 800,
    artisan: {
      name: 'Narayana Swamy',
      location: 'Channapatna, Ramanagara, Karnataka',
      cooperative: 'Toymaker Heritage Cooperative',
      avatar: '🪵',
      experience: '25 years',
      upiId: 'narayana.crafts@upi',
      bio: 'Narayana Swamy uses ivory wood and vegetable dye lacquers to shape baby-safe, eco-friendly wooden toys. He has been doing lacquerware carving for 25 years.'
    },
    checks: [
      '100% natural vegetable dyes (turmeric, indigo, kumkum)',
      'Smooth hand-buffed finish using Talegari palm leaf',
      'Child-safe non-toxic certified wood'
    ]
  },
  {
    id: 'pashmina',
    name: 'Kashmir Pashmina Shawl',
    category: 'Handloom / Fine Wool',
    isCertified: true,
    registryId: 'GI-IND-00046-KPS',
    priceRange: '₹8,000 – ₹25,000',
    minPrice: 8000,
    maxPrice: 25000,
    artisan: {
      name: 'Ghulam Mohammad Mir',
      location: 'Rainawari, Srinagar, Jammu & Kashmir',
      cooperative: 'Kashmir Handloom Artisans Guild',
      avatar: '🧣',
      experience: '38 years',
      upiId: 'ghulam.pashmina@upi',
      bio: 'Master Ghulam spins 12-micron pure Changthangi mountain goat wool on traditional wooden Charkhas, hand-weaving each shawl over 180 hours.'
    },
    checks: [
      'Govt. Optical Microscope GI Hologram & Secure QR tag',
      'Burn test certified (natural protein aroma, soft ash)',
      'Pure single-origin Changthang pashm fibre'
    ]
  },
  {
    id: 'blue-pottery',
    name: 'Jaipur Blue Pottery Vase',
    category: 'Ceramics / Quartz Stone',
    isCertified: true,
    registryId: 'GI-IND-00027-JBP',
    priceRange: '₹350 – ₹1,800',
    minPrice: 350,
    maxPrice: 1800,
    artisan: {
      name: 'Ustad Ram Kishore',
      location: 'Kot Jewar, Jaipur, Rajasthan',
      cooperative: 'Kot Jewar Ceramic Artists Union',
      avatar: '🏺',
      experience: '34 years',
      upiId: 'ramkishore.pottery@upi',
      bio: 'Ustad Ram Kishore crafts traditional quartz-based pottery without clay, hand-painting floral arabesque motifs using natural cobalt oxide and copper pigments.'
    },
    checks: [
      'Genuine non-clay quartz powder & Fuller earth composition',
      'Hand-painted mineral oxide motifs with natural crazing',
      'Lead-free, food-safe traditional kiln glaze'
    ]
  },
  {
    id: 'saffron',
    name: 'Kashmir Saffron (1g Mongra)',
    category: 'Agriculture / Spices',
    isCertified: true,
    registryId: 'GI-IND-00635-KAS',
    priceRange: '₹280 – ₹450',
    minPrice: 280,
    maxPrice: 450,
    artisan: {
      name: 'Haji Ghulam Rasool Bhat',
      location: 'Pampore Karewas, Jammu & Kashmir',
      cooperative: 'Pampore Saffron Growers Cooperative',
      avatar: '🌸',
      experience: '45 years',
      upiId: 'pampore.saffron@upi',
      bio: 'Haji Ghulam and his family cultivate high-altitude saffron in the Karewa soils of Pampore, hand-separating red stigmas during dawn harvest.'
    },
    checks: [
      'Cold water test: Slow golden-yellow infusion (thread stays dark red)',
      'Flared trumpet stigma structure',
      'Lab tested Grade-1 high crocin active content'
    ]
  },
  {
    id: 'banarasi',
    name: 'Banarasi Silk Brocade',
    category: 'Handloom / Pure Silk',
    isCertified: true,
    registryId: 'GI-IND-00099-BSB',
    priceRange: '₹6,000 – ₹35,000',
    minPrice: 6000,
    maxPrice: 35000,
    artisan: {
      name: 'Bismillah Ansari',
      location: 'Mubarakpur, Varanasi, Uttar Pradesh',
      cooperative: 'Varanasi Master Weavers Apex Guild',
      avatar: '🧵',
      experience: '40 years',
      upiId: 'ansari.weaves@upi',
      bio: 'Bismillah Ansari specializes in antique Kadwa and Kadiyal weaving techniques, interweaving pure Mulberry silk with gold and silver electroplated Zari threads.'
    },
    checks: [
      'Hand-clipped float threads on the reverse side of motifs',
      'Silk Mark & India Handloom GI Hallmark embossed',
      'Authentic pure metallic Zari wire'
    ]
  },
  {
    id: 'fake-pashmina',
    name: 'Replica Pashmina (Counterfeit Demo)',
    category: 'Synthetic / Machine-Made',
    isCertified: false,
    registryId: 'UNREGISTERED-SYNTHETIC-99',
    priceRange: '₹300 – ₹900 (Overpriced Fake)',
    minPrice: 300,
    maxPrice: 900,
    artisan: {
      name: 'Unregistered Mass Mill / Middleman',
      location: 'Industrial Textile Zone',
      cooperative: 'Non-GI Commercial Trader',
      avatar: '⚠️',
      experience: 'Mass machine produced',
      upiId: 'commercial.retail@bank',
      bio: 'Warning: This product is machine-manufactured using viscose-polyester synthetic yarn blended with chemical softeners to mimic genuine cashmere.'
    },
    warningMessage: 'Counterfeit Alert: Laboratory scan indicates 0% natural Pashmina. Contains 85% Polyester & 15% Viscose blend. Seller has no GI Registry accreditation.'
  }
];

export const FairPrice: React.FC = () => {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'authenticator' | 'intelligence'>('authenticator');

  // Authenticator state
  const [selectedProduct, setSelectedProduct] = useState<RegistryProduct>(REGISTRY_PRODUCTS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
  const [cameraStreamActive, setCameraStreamActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Price intelligence state
  const [productSearch, setProductSearch] = useState('');
  const [sellerPrice, setSellerPrice] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fairData, setFairData] = useState<{
    status: string;
    min: number;
    max: number;
    color: string;
    message: string;
    translation: string;
  } | null>(null);

  // Support Artisan Modal state
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'tip' | 'workshop' | 'note'>('tip');
  const [tipAmount, setTipAmount] = useState<number>(250);
  const [customTip, setCustomTip] = useState<string>('');
  const [patronNote, setPatronNote] = useState<string>('Thank you for preserving this magnificent heritage craft! Truly inspired by your artistry.');
  const [supportSuccess, setSupportSuccess] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Camera stream handler
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (isCameraModalOpen) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setCameraStreamActive(true);
        })
        .catch(err => {
          console.log('Camera permission or device not available:', err);
          setCameraStreamActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraModalOpen]);

  const handleSelectProduct = (prod: RegistryProduct) => {
    setIsScanning(true);
    setSelectedProduct(prod);
    setTimeout(() => {
      setIsScanning(false);
    }, 450);
  };

  const handleCameraScanFound = (prod: RegistryProduct) => {
    setSelectedProduct(prod);
    setIsCameraModalOpen(false);
  };

  const handleAnalyzeIntelligence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productSearch || !sellerPrice) return;
    setLoading(true);

    const prodLower = productSearch.toLowerCase();
    let min = 500;
    let max = 2000;

    const matched = REGISTRY_PRODUCTS.find(p => prodLower.includes(p.id) || prodLower.includes(p.name.toLowerCase().split(' ')[0]));
    if (matched && matched.isCertified) {
      min = matched.minPrice;
      max = matched.maxPrice;
    } else {
      let hash = 0;
      for (let i = 0; i < prodLower.length; i++) {
        hash = prodLower.charCodeAt(i) + ((hash << 5) - hash);
      }
      const val = Math.abs(hash) % 3500 + 400;
      min = Math.round((val * 0.8) / 50) * 50;
      max = Math.round((val * 1.3) / 50) * 50;
    }

    const basePrice = Number(sellerPrice) || min;
    let status = '';
    let color = '';
    let message = '';
    let translation = '';

    if (basePrice < min) {
      status = 'Below typical range (Possible Quality / Replica Risk)';
      color = 'var(--color-secondary-indigo)';
      message = '"Is this authentic GI certified handcraft? The price seems unusually low."';
      translation = '"Kya ye asali GI certified dastkari hai? Ye kafi sasta lag raha hai."';
    } else if (basePrice > max) {
      status = 'Above typical range (Room to Negotiate)';
      color = 'var(--color-warning)';
      message = '"Could you offer the fair master-artisan cooperative rate for this piece?"';
      translation = '"Thoda wazib daam kijiye, master artisan rate par."';
    } else {
      status = 'Fair Market Price (Direct Artisan Reward)';
      color = 'var(--color-success)';
      message = '"This is a fair price for genuine handcraft. I am happy to take it."';
      translation = '"Theek hai, asali dastkari ke liye ye sahi daam hai."';
    }

    setFairData({
      status,
      min,
      max,
      color,
      message,
      translation
    });
    setLoading(false);
    setAnalyzed(true);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSendSupport = () => {
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setIsSupportModalOpen(false);
    }, 2400);
  };

  return (
    <div className="fairprice-container">
      {/* Header */}
      <header className="authenticator-header">
        <h1>Buyer Protection & Verification</h1>
        <p className="text-secondary text-lg">
          AI price intelligence & certified GI-tag registry authenticator.
        </p>

        {/* Tab Switcher matching reference */}
        <div className="auth-tab-switch">
          <button
            className={`auth-tab-btn ${activeTab === 'intelligence' ? 'active' : ''}`}
            onClick={() => setActiveTab('intelligence')}
          >
            <Search size={16} /> Price Intelligence
          </button>
          <button
            className={`auth-tab-btn ${activeTab === 'authenticator' ? 'active' : ''}`}
            onClick={() => setActiveTab('authenticator')}
          >
            <QrCode size={16} /> GI Registry Authenticator
          </button>
        </div>
      </header>

      {/* VIEW 1: GI REGISTRY AUTHENTICATOR */}
      {activeTab === 'authenticator' && (
        <div className="authenticator-grid">
          {/* Left Column: Product Selector & Scanner Simulation */}
          <div className="scan-sidebar">
            <div className="scan-list-card">
              <h3>Select Product to Scan</h3>
              <p className="text-secondary text-xs mb-3">
                Click an option below or open camera to scan its registry QR tag.
              </p>

              {REGISTRY_PRODUCTS.map(prod => {
                const isSelected = selectedProduct.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    className={`scan-item-btn ${isSelected ? (prod.isCertified ? 'selected' : 'selected-fake') : ''}`}
                    onClick={() => handleSelectProduct(prod)}
                  >
                    <span style={{ fontWeight: isSelected ? 600 : 500, fontSize: '0.9rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {prod.name}
                    </span>
                    {prod.isCertified ? (
                      <span className="item-badge-certified">GI Certified</span>
                    ) : (
                      <span className="item-badge-unregistered">Unregistered</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scanner Viewport Simulation Box */}
            <div className={`scanner-viewport ${!selectedProduct.isCertified ? 'is-fake' : ''}`}>
              <div className="scanner-laser-line" />
              <Scan className="scanner-target-icon" />
              <div className="scanner-label">
                {isScanning ? 'SCANNING QR TAG...' : 'SCAN COMPLETE'}
              </div>

              {/* Live Camera Scanner Button */}
              <button 
                className="camera-scan-btn"
                onClick={() => setIsCameraModalOpen(true)}
              >
                <Camera size={15} /> Scan with Live Camera
              </button>
            </div>
          </div>

          {/* Right Column: Authenticated Registry Card */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`registry-detail-card ${selectedProduct.isCertified ? 'certified' : 'fake'}`}
              >
                {/* Status Bar */}
                <div className="registry-status-header">
                  {selectedProduct.isCertified ? (
                    <span className="certified-pill">
                      <CheckCircle2 size={15} /> CERTIFIED GI TAG
                    </span>
                  ) : (
                    <span className="fake-pill">
                      <AlertTriangle size={15} /> UNREGISTERED / COUNTERFEIT
                    </span>
                  )}
                  <span className="text-secondary text-xs" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    Registry ID: <strong>{selectedProduct.registryId}</strong>
                  </span>
                </div>

                {/* Product Title & Category */}
                <h2 className="product-hero-title">{selectedProduct.name}</h2>
                <p className="product-sub-category">{selectedProduct.category}</p>

                {/* Warning message if fake */}
                {!selectedProduct.isCertified && selectedProduct.warningMessage && (
                  <div style={{ background: 'rgba(255, 107, 107, 0.12)', border: '1px solid rgba(255, 107, 107, 0.35)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#ff6b6b', fontWeight: 600 }}>
                      <AlertTriangle size={16} /> Flagged Anti-Counterfeit Alert
                    </div>
                    <p className="text-secondary text-xs mt-1" style={{ color: 'var(--text-primary)' }}>
                      {selectedProduct.warningMessage}
                    </p>
                  </div>
                )}

                {/* Regulated Price Box */}
                <div className="price-banner-box">
                  <div>
                    <span className="text-secondary text-xs block">GI Registry Regulated Price</span>
                    <div className="regulated-price-val">{selectedProduct.priceRange}</div>
                  </div>
                  {selectedProduct.isCertified ? (
                    <div className="authenticity-guarantee-badge">
                      <ShieldCheck size={18} /> 100% Authentic
                    </div>
                  ) : (
                    <div style={{ color: '#ff6b6b', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertTriangle size={16} /> 0% GI Provenance
                    </div>
                  )}
                </div>

                {/* Authenticity Points */}
                {selectedProduct.checks && selectedProduct.checks.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span className="section-label mb-2 flex items-center gap-1">
                      <Sparkles size={13} className="text-accent-gold" /> Key Authenticity Hallmarks
                    </span>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {selectedProduct.checks.map((chk, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          <Check size={15} style={{ color: '#2ec4b6', flexShrink: 0 }} />
                          <span>{chk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verified Artisan Profile */}
                <div className="verified-artisan-section">
                  <span className="section-label flex items-center gap-1">
                    <CheckCircle2 size={14} style={{ color: selectedProduct.isCertified ? 'var(--color-accent-gold)' : '#ff6b6b' }} /> 
                    {selectedProduct.isCertified ? 'Verified Artisan Profile' : 'Seller Assessment'}
                  </span>

                  <div className="artisan-box-inner">
                    <div className="artisan-avatar-img">
                      {selectedProduct.artisan.avatar}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {selectedProduct.artisan.name}
                      </h4>
                      <p className="text-secondary text-xs flex items-center gap-1 mt-0.5">
                        <MapPin size={12} /> {selectedProduct.artisan.location}
                      </p>
                      <p className="text-tertiary text-xs mt-0.5">
                        {selectedProduct.artisan.cooperative}
                      </p>
                    </div>
                  </div>

                  <p className="artisan-quote-text">
                    "{selectedProduct.artisan.bio}"
                  </p>
                </div>

                {/* Big Direct Artisan Support Button */}
                {selectedProduct.isCertified ? (
                  <button
                    className="gold-support-btn"
                    onClick={() => {
                      setSupportTab('tip');
                      setIsSupportModalOpen(true);
                    }}
                  >
                    <Heart size={18} fill="currentColor" /> Direct Artisan Support (UPI)
                  </button>
                ) : (
                  <Button
                    variant="outline"
                    fullWidth
                    size="lg"
                    style={{ borderColor: 'rgba(255, 107, 107, 0.4)', color: '#ff6b6b' }}
                    onClick={() => setActiveTab('intelligence')}
                  >
                    Compare with Certified Fair Price
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* VIEW 2: AI PRICE INTELLIGENCE */}
      {activeTab === 'intelligence' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <Card padding="lg" className="mb-8" style={{ border: '1px solid var(--border-light)' }}>
            <form onSubmit={handleAnalyzeIntelligence} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'flex-end' }}>
              <Input 
                label="What are you buying?" 
                placeholder="e.g. Pashmina Shawl, Blue Pottery..." 
                icon={Search}
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
              />
              <Input 
                label="Seller's Asking Price (₹)" 
                type="number"
                placeholder="2500" 
                value={sellerPrice}
                onChange={e => setSellerPrice(e.target.value)}
              />
              <Button type="submit" variant="specular" disabled={!productSearch || !sellerPrice || loading}>
                {loading ? 'Analyzing...' : 'Check Price'}
              </Button>
            </form>
          </Card>

          {analyzed && fairData && (
            <Card variant="glass" padding="lg" style={{ border: `1px solid ${fairData.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: fairData.color }}>
                  <Info size={20} />
                  <span style={{ fontWeight: 600 }}>{fairData.status}</span>
                </div>
                <div className="text-secondary text-sm flex items-center gap-1">
                  <ShieldCheck size={16} /> Data confidence: High (GI Regulated Index)
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0' }}>
                <div style={{ textAlign: 'center', minWidth: '110px' }}>
                  <p className="text-secondary mb-1 text-sm">Quoted Price</p>
                  <p style={{ fontSize: '1.65rem', fontWeight: 700, color: fairData.color }}>₹{sellerPrice}</p>
                </div>
                
                <div style={{ flex: 1, margin: '0 1.5rem', position: 'relative', height: '8px', background: 'var(--color-surface-hover)', borderRadius: '4px' }}>
                  <div style={{ position: 'absolute', left: '20%', right: '35%', height: '100%', background: 'var(--color-success)', borderRadius: '4px', opacity: 0.45 }}></div>
                  <div style={{ 
                    position: 'absolute', 
                    left: fairData.status.includes('Below') ? '10%' : (fairData.status.includes('Above') ? '90%' : '50%'), 
                    width: '14px', 
                    height: '14px', 
                    top: '-3px', 
                    transform: 'translateX(-50%)',
                    background: fairData.color, 
                    borderRadius: '50%', 
                    boxShadow: `0 0 0 4px ${fairData.color}33` 
                  }}></div>
                </div>

                <div style={{ textAlign: 'center', minWidth: '140px' }}>
                  <p className="text-secondary mb-1 text-sm">Fair Market Range</p>
                  <p style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{fairData.min} – ₹{fairData.max}</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                <h4 className="mb-3 text-sm font-semibold flex items-center gap-2">
                  <Volume2 size={16} className="text-accent-gold" /> Fair Negotiation Phrase
                </h4>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>{fairData.message}</p>
                    <p className="text-secondary text-sm mt-1" style={{ fontStyle: 'italic' }}>{fairData.translation}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyText(`${fairData.message}\n${fairData.translation}`)}>
                    {copySuccess ? <Check size={16} style={{ color: 'var(--color-success)' }} /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      )}

      {/* 📷 LIVE CAMERA QR SCANNER MODAL */}
      <AnimatePresence>
        {isCameraModalOpen && (
          <div className="artisan-modal-overlay" onClick={() => setIsCameraModalOpen(false)}>
            <motion.div 
              className="camera-scanner-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button 
                onClick={() => setIsCameraModalOpen(false)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Camera size={18} style={{ color: '#2ec4b6' }} />
                <h3 style={{ fontSize: '1.15rem' }}>Live GI Tag QR Scanner</h3>
              </div>
              <p className="text-secondary text-xs mb-3">
                Point your device camera at any official GI hologram or simulated QR code on the craft.
              </p>

              {/* Viewfinder with laser overlay */}
              <div className="camera-feed-box">
                {cameraStreamActive ? (
                  <video ref={videoRef} autoPlay playsInline muted className="camera-video-elem" />
                ) : (
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Scan size={44} style={{ color: '#2ec4b6', margin: '0 auto 0.5rem auto' }} />
                    <p className="text-secondary text-xs">Simulating Camera Viewfinder</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)' }}>Ready to detect GI Tags</span>
                  </div>
                )}
                <div className="camera-reticle-overlay">
                  <div className="camera-scan-laser" />
                </div>
              </div>

              {/* Quick simulation trigger buttons */}
              <div style={{ marginTop: '1rem' }}>
                <span className="text-xs text-secondary block mb-1.5 font-semibold">Simulate Camera Tag Detection:</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button 
                    className="support-amount-btn active"
                    onClick={() => handleCameraScanFound(REGISTRY_PRODUCTS[0])}
                  >
                    🪵 Detect Channapatna
                  </button>
                  <button 
                    className="support-amount-btn"
                    onClick={() => handleCameraScanFound(REGISTRY_PRODUCTS[1])}
                  >
                    🧣 Detect Pashmina
                  </button>
                  <button 
                    className="support-amount-btn"
                    onClick={() => handleCameraScanFound(REGISTRY_PRODUCTS[2])}
                  >
                    🏺 Detect Blue Pottery
                  </button>
                  <button 
                    className="support-amount-btn"
                    style={{ borderColor: 'rgba(255, 107, 107, 0.4)', color: '#ff6b6b' }}
                    onClick={() => handleCameraScanFound(REGISTRY_PRODUCTS[5])}
                  >
                    ⚠️ Detect Fake Replica
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ⭐ INTERACTIVE SUPPORT ARTISAN MODAL (UPI / WORKSHOP / PATRON NOTE) */}
      <AnimatePresence>
        {isSupportModalOpen && (
          <div className="artisan-modal-overlay" onClick={() => setIsSupportModalOpen(false)}>
            <motion.div 
              className="artisan-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsSupportModalOpen(false)}
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="artisan-avatar-img" style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}>
                  {selectedProduct.artisan.avatar}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>Direct Support: {selectedProduct.artisan.name}</h3>
                  <p className="text-secondary text-xs">
                    UPI: <strong style={{ color: 'var(--color-accent-gold)' }}>{selectedProduct.artisan.upiId}</strong> (0% Commission)
                  </p>
                </div>
              </div>

              {/* Modal Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
                <button 
                  className={`support-amount-btn ${supportTab === 'tip' ? 'active' : ''}`}
                  onClick={() => setSupportTab('tip')}
                >
                  ❤️ Direct UPI Tip
                </button>
                <button 
                  className={`support-amount-btn ${supportTab === 'workshop' ? 'active' : ''}`}
                  onClick={() => setSupportTab('workshop')}
                >
                  🎟️ Book Workshop (₹499)
                </button>
                <button 
                  className={`support-amount-btn ${supportTab === 'note' ? 'active' : ''}`}
                  onClick={() => setSupportTab('note')}
                >
                  💌 Patron Note
                </button>
              </div>

              {/* Tab 1: Direct Livelihood Tip */}
              {supportTab === 'tip' && (
                <div>
                  <p className="text-secondary text-sm mb-3">
                    Support traditional craftsmanship with a direct grant to the artisan's verified account:
                  </p>
                  
                  {/* Preset Amount Chips */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    {[100, 250, 500, 1000].map(amt => (
                      <button
                        key={amt}
                        className={`support-amount-btn ${tipAmount === amt && !customTip ? 'active' : ''}`}
                        onClick={() => {
                          setTipAmount(amt);
                          setCustomTip('');
                        }}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  <Input 
                    label="Or Enter Custom Amount (₹)"
                    type="number"
                    placeholder="Enter amount"
                    value={customTip}
                    onChange={e => {
                      setCustomTip(e.target.value);
                      setTipAmount(Number(e.target.value) || 0);
                    }}
                  />

                  <div style={{ background: 'rgba(42, 157, 143, 0.08)', border: '1px solid rgba(42, 157, 143, 0.25)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', margin: '1rem 0' }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#2ec4b6' }}>
                      <CheckCircle2 size={16} /> <strong>100% Commission-Free Direct Transfer</strong>
                    </div>
                    <p className="text-secondary text-xs mt-1">
                      Directly routed to {selectedProduct.artisan.name}'s verified bank account via UPI.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Book Workshop */}
              {supportTab === 'workshop' && (
                <div>
                  <div style={{ background: 'rgba(255, 184, 0, 0.08)', border: '1px solid rgba(255, 184, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                    <div className="flex justify-between items-center mb-1">
                      <h4 style={{ fontSize: '1rem', color: 'var(--color-accent-gold)' }}>"Meet the Maker" 1-Hour Masterclass</h4>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹499</span>
                    </div>
                    <p className="text-secondary text-xs">
                      Join {selectedProduct.artisan.name} in person for a live hands-on crafting session and learn the heritage craft firsthand.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <span className="text-tertiary text-xs block">Duration</span>
                      <span className="text-sm font-semibold">60 Mins Live</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <span className="text-tertiary text-xs block">Location</span>
                      <span className="text-sm font-semibold">{selectedProduct.artisan.location.split(',')[0]}</span>
                    </div>
                  </div>

                  <p className="text-secondary text-xs mb-3">
                    Includes raw materials, souvenir you crafted yourself, and a digital GI Artisan Certificate.
                  </p>
                </div>
              )}

              {/* Tab 3: Patron Note */}
              {supportTab === 'note' && (
                <div>
                  <p className="text-secondary text-sm mb-2">
                    Leave a word of encouragement for {selectedProduct.artisan.name}:
                  </p>
                  <textarea
                    rows={4}
                    value={patronNote}
                    onChange={e => setPatronNote(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      padding: '0.75rem',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      resize: 'none',
                      outline: 'none'
                    }}
                  />
                  <p className="text-tertiary text-xs mt-1">
                    Adds a permanent Verified Patron Badge to your Ghumo Traveler Passport.
                  </p>
                </div>
              )}

              {/* Support CTA button */}
              <div style={{ marginTop: '1.5rem' }}>
                {supportSuccess ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ 
                      background: 'rgba(42, 157, 143, 0.2)', 
                      border: '1px solid #2ec4b6', 
                      padding: '1rem', 
                      borderRadius: 'var(--radius-md)', 
                      textAlign: 'center' 
                    }}
                  >
                    <div className="flex items-center justify-center gap-2" style={{ color: '#2ec4b6', fontWeight: 600, fontSize: '1.05rem' }}>
                      <Check size={20} /> Support Successfully Sent via UPI!
                    </div>
                    <p className="text-secondary text-xs mt-1">
                      +50 Points added to your Responsible Traveler Impact Score.
                    </p>
                  </motion.div>
                ) : (
                  <button 
                    className="gold-support-btn"
                    onClick={handleSendSupport}
                  >
                    <Heart size={18} fill="currentColor" />
                    {supportTab === 'tip' 
                      ? `Confirm & Send ₹${tipAmount || 250} to ${selectedProduct.artisan.name}` 
                      : (supportTab === 'workshop' ? 'Book Artisan Masterclass (₹499)' : 'Send Patron Note & Earn Badge')}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaStar,
  FaIdCard,
  FaExchangeAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaUser,
  FaCheck,
  FaBolt,
  FaPhoneAlt
} from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import './App.css';
import contentData from './data/content.json';

// EmailJS Configuration - Chỉ cần config 3 giá trị này
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_prixmbb',
  TEMPLATE_ID: 'template_setwyj9',
  PUBLIC_KEY: 'NMP-KVqcdLVpHflIr'
};

// Email nhận form (email người dùng gửi đến)
const RECEIVER_EMAIL = 'Lamgihoi609@gmail.com';

// Email gửi (email dùng để gửi form - cần App Password của email này)
const SENDER_EMAIL = 'vthuanng.it@gmail.com';

// Icon mapping
const iconMap = {
  FaIdCard: FaIdCard,
  FaShieldAlt: FaShieldAlt,
  FaCheckCircle: FaCheckCircle,
  FaClock: FaClock
};

function App() {
  const { site, contact, images, hero, intro, tableOfContents, sections, cta } = contentData;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zalo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupFormData, setPopupFormData] = useState({
    name: '',
    phone: '',
    zalo: ''
  });
  const [popupIsSubmitted, setPopupIsSubmitted] = useState(false);
  const [popupIsSubmitting, setPopupIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePopupInputChange = (e) => {
    const { name, value } = e.target;
    setPopupFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    setPopupIsSubmitting(true);

    const isConfigured = 
      EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

    if (isConfigured) {
      try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        
        const templateParams = {
          to_email: RECEIVER_EMAIL,
          from_name: popupFormData.name,
          phone: popupFormData.phone,
          zalo: popupFormData.zalo || 'Không có',
          site_name: site.name,
          date: new Date().toLocaleString('vi-VN'),
          message: `Thông tin đăng ký tư vấn:\n\nHọ tên: ${popupFormData.name}\nSố điện thoại: ${popupFormData.phone}\nZalo: ${popupFormData.zalo || 'Không có'}\nWebsite: ${site.name}\nThời gian: ${new Date().toLocaleString('vi-VN')}`
        };

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams
        );

        setPopupIsSubmitted(true);
        setPopupIsSubmitting(false);
        setPopupFormData({ name: '', phone: '', zalo: '' });

        if (window.fbq) {
          window.fbq('track', 'Lead');
        }

        setTimeout(() => {
          setPopupIsSubmitted(false);
          setShowPopup(false);
        }, 3000);
      } catch (error) {
        console.error('EmailJS Error:', error);
        setPopupIsSubmitting(false);
        alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại!');
      }
    } else {
      const subject = encodeURIComponent(`Đăng ký tư vấn từ ${site.name}`);
      const body = encodeURIComponent(
        `Thông tin đăng ký tư vấn:\n\n` +
        `Họ tên: ${popupFormData.name}\n` +
        `Số điện thoại: ${popupFormData.phone}\n` +
        `Zalo: ${popupFormData.zalo}\n\n` +
        `Thời gian: ${new Date().toLocaleString('vi-VN')}`
      );
      
      const mailtoLink = `mailto:${RECEIVER_EMAIL}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        setPopupIsSubmitted(true);
        setPopupIsSubmitting(false);
        setPopupFormData({ name: '', phone: '', zalo: '' });
        setTimeout(() => {
          setPopupIsSubmitted(false);
          setShowPopup(false);
        }, 3000);
      }, 500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Kiểm tra xem đã config EmailJS chưa
    const isConfigured = 
      EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

    if (isConfigured) {
      // Gửi email qua EmailJS với Gmail SMTP
      try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        
        const templateParams = {
          to_email: RECEIVER_EMAIL,
          from_name: formData.name,
          phone: formData.phone,
          zalo: formData.zalo || 'Không có',
          site_name: site.name,
          date: new Date().toLocaleString('vi-VN'),
          message: `Thông tin đăng ký tư vấn:\n\nHọ tên: ${formData.name}\nSố điện thoại: ${formData.phone}\nZalo: ${formData.zalo || 'Không có'}\nWebsite: ${site.name}\nThời gian: ${new Date().toLocaleString('vi-VN')}`
        };

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams
        );

        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', phone: '', zalo: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } catch (error) {
        console.error('EmailJS Error:', error);
        setIsSubmitting(false);
        alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại!');
      }
    } else {
      // Fallback: Gửi email qua mailto nếu chưa config
      const subject = encodeURIComponent(`Đăng ký tư vấn từ ${site.name}`);
      const body = encodeURIComponent(
        `Thông tin đăng ký tư vấn:\n\n` +
        `Họ tên: ${formData.name}\n` +
        `Số điện thoại: ${formData.phone}\n` +
        `Zalo: ${formData.zalo}\n\n` +
        `Thời gian: ${new Date().toLocaleString('vi-VN')}`
      );
      
      const mailtoLink = `mailto:${RECEIVER_EMAIL}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', phone: '', zalo: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 500);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <meta name="keywords" content={site.keywords} />
        <meta name="author" content={site.name} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://khacdautron1.com" />
        
        {/* Open Graph */}  
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khacdautron1.com" />
        <meta property="og:image" content={images.hero} />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:site_name" content={site.name} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={images.hero} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": site.name,
            "description": site.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": contact.address,
              "addressLocality": "Thành Phố Hồ Chí Minh",
              "addressCountry": "VN"
            },
            "telephone": contact.hotline,
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": hero.rating.score,
              "reviewCount": hero.rating.total
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": "https://khacdautron1.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Dịch vụ khắc dấu nhanh không giấy tờ"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-main">Khắc dấu</span>
            <span className="logo-highlight">NHANH</span>
          </div>
          <div className="header-cta">
            <a href={`tel:${contact.hotline}`} className="hotline">
              <FaPhone style={{ fontSize: '0.9rem', marginRight: '0.5rem' }} />
              Hotline: {contact.hotline}
            </a>
            {/* <a href={`https://zalo.me/${contact.zalo1.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="zalo-button">
              <SiZalo style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
              Chat Zalo
            </a> */}
            {/* <button className="cta-button">ĐĂNG KÝ TƯ VẤN</button> */}
          </div>
        </div>
      </header>

      {/* Promo Banner */}
      <section className="promo-strip">
        <div className="promo-content">
          <div className="promo-price">
            <span className="price-label">Giá trọn gói</span>
            <div className="price-value">
              <span className="currency">Chỉ từ</span>
              <span className="number">500K</span>
            </div>
            <p>Khắc dấu tròn công ty - Lấy liền</p>
          </div>

          <div className="promo-features">
            <div className="promo-item">
              <div className="promo-icon hot">
                <FaBolt />
              </div>
              <div>
                <strong>Lấy liền 30-60 phút</strong>
                <p>Giao tận nơi nội thành</p>
              </div>
            </div>
            <div className="promo-item">
              <div className="promo-icon safe">
                <FaShieldAlt />
              </div>
              <div>
                <strong>Bảo hành mực 12 tháng</strong>
                <p>Miễn phí chỉnh sửa nội dung</p>
              </div>
            </div>
          </div>

          <div className="promo-cta">
            <a href={`tel:${contact.hotline}`} className="promo-call">
              <FaPhoneAlt />
              Gọi ngay {contact.hotline}
            </a>
            <small>Đội ngũ tư vấn trực 24/7 - Có mặt trong 15 phút</small>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-container">
        <main className="content">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/">Trang chủ</a> » Dịch vụ khắc dấu nhanh không giấy tờ
          </nav>

          {/* Title */}
          <h1 className="page-title">{hero.title}</h1>

          {/* Rating */}
          <div className="rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span>{hero.rating.score}/5 - ({hero.rating.total} đánh giá)</span>
          </div>

          {/* Featured Image */}
          <div className="featured-image">
            <img 
              src={images.hero} 
              alt={hero.title} 
              loading="lazy"
            />
          </div>

          {/* Intro */}
          <div className="intro-text">
            <p>{intro.text}</p>
          </div>

          {/* Table of Contents */}
          <div className="toc">
            <div className="toc-title">Nội dung bài viết</div>
            <ol className="toc-list">
              {tableOfContents.map((item, index) => (
                <li key={index}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 1 */}
          {sections.lamDau && (
            <section id="lam-dau" className="section">
              <h2 className="section-title">1. {sections.lamDau.title}</h2>
              <div className="section-content">
                {sections.lamDau.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* Section 2 */}
          {sections.loiIch && (
            <section id="loi-ich" className="section">
              <h2 className="section-title">2. {sections.loiIch.title}</h2>
              <div className="section-content">
                <p>{sections.loiIch.intro}</p>
                <div className="features-grid">
                  {sections.loiIch.features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon];
                    return (
                      <div key={index} className="feature-card">
                        <div className="feature-icon">
                          <IconComponent />
                        </div>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Section 3 */}
          {sections.taiSao && (
            <section id="tai-sao" className="section">
              <h2 className="section-title">3. {sections.taiSao.title}</h2>
              <div className="section-content">
                <p>{sections.taiSao.intro}</p>
                <ul className="services-list" style={{ listStyle: 'none' }}>
                  {sections.taiSao.items.map((item, index) => (
                    <li key={index}>
                      <strong>{item.label}</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Section 4: Dịch vụ */}
          <section id="dich-vu" className="section">
            <h2 className="section-title">4. {sections.dichVu.title}</h2>
            <div className="section-content">
              <p>{sections.dichVu.intro}</p>
              
              {/* Service Image */}
              <div className="service-image">
                <img 
                  src={images.service} 
                  alt="Dịch vụ khắc dấu tròn công ty không cần giấy tờ" 
                  loading="lazy"
                />
              </div>

              <ul className="services-list">
                {sections.dichVu.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Registration Form */}
          <section className="registration-form-section">
            <div className="form-container">
              <div className="form-header">
                <h2>Đăng ký tư vấn miễn phí</h2>
                <p>Điền thông tin để được tư vấn nhanh chóng</p>
              </div>
              
              {isSubmitted ? (
                <div className="form-success">
                  <FaCheck className="success-icon" />
                  <h3>Cảm ơn bạn đã đăng ký!</h3>
                  <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="registration-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FaUser className="input-icon" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <FaPhone className="input-icon" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zalo">
                      <SiZalo className="input-icon" />
                      Số Zalo
                    </label>
                    <input
                      type="text"
                      id="zalo"
                      name="zalo"
                      value={formData.zalo}
                      onChange={handleInputChange}
                      placeholder="Nhập số Zalo (nếu có)"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'ĐĂNG KÝ NGAY'}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <div className="cta-section">
            <h3>{cta.title}</h3>
            <p>{cta.subtitle}</p>
            <div className="cta-buttons">
              <a href={`tel:${contact.hotline}`} className="cta-btn">
                <FaPhone /> Gọi ngay Hotline
              </a>
              <a href={`https://zalo.me/${contact.zalo1.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="cta-btn secondary zalo-btn">
                <SiZalo /> Chat Zalo 1
              </a>
              <a href={`https://zalo.me/${contact.zalo2.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="cta-btn secondary zalo-btn">
                <SiZalo /> Chat Zalo 2
              </a>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-card">
            <h3>Bạn cần thêm thông tin?</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <strong>Hotline:</strong>
                  <a href={`tel:${contact.hotline}`}>{contact.hotline}</a>
                </div>
              </div>
              <div className="contact-item">
                <SiZalo className="contact-icon zalo-icon" />
                <div>
                  <strong>Zalo 1:</strong>
                  <a href={`https://zalo.me/${contact.zalo1.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">{contact.zalo1}</a>
                </div>
              </div>
              <div className="contact-item">
                <SiZalo className="contact-icon zalo-icon" />
                <div>
                  <strong>Zalo 2:</strong>
                  <a href={`https://zalo.me/${contact.zalo2.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">{contact.zalo2}</a>
                </div>
              </div>
              <div className="contact-item">
                <FaClock className="contact-icon" />
                <div>
                  <strong>Thời gian:</strong>
                  <p>{contact.workingHours}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <strong>Văn phòng:</strong>
                  <p>{contact.address}</p>
                </div>
              </div>
            </div>
            <div className="highlight-box">
              <p>⚡ Hỗ trợ nhanh chóng - Uy tín - Chuyên nghiệp</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>{site.name}</h3>
              <p>{site.description}</p>
            </div>
            
            <div className="footer-section">
              <h4>Liên hệ</h4>
              <div className="footer-contact">
                <p><FaPhone /> Hotline: <a href={`tel:${contact.hotline}`}>{contact.hotline}</a></p>
                <p><SiZalo /> Zalo 1: {contact.zalo1}</p>
                <p><SiZalo /> Zalo 2: {contact.zalo2}</p>
                <p><FaClock /> {contact.workingHours}</p>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Địa chỉ</h4>
              <p><FaMapMarkerAlt /> {contact.address}</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2024 {site.name} - All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating Zalo Button */}
      <a 
        href={`https://zalo.me/${contact.zalo1.replace(/\s/g, '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-zalo"
        title="Chat Zalo"
      >
        <SiZalo />
      </a>

      {/* Popup Form */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>

            {popupIsSubmitted ? (
              <div className="popup-success">
                <FaCheck className="success-icon" />
                <h3>Cảm ơn bạn đã đăng ký!</h3>
                <p>Chúng tôi sẽ liên hệ ngay khi nhận được thông tin.</p>
              </div>
            ) : (
              <div className="popup-content">
                <div className="popup-header">
                  <p className="popup-kicker">Ưu đãi giới hạn</p>
                  <h2>Khắc dấu tròn chỉ <span>500K</span></h2>
                  <ul>
                    <li>Lấy dấu trong 30 phút</li>
                    <li>Giao tận nơi + bảo hành mực 12 tháng</li>
                    <li>Miễn phí chỉnh sửa nội dung</li>
                  </ul>
                </div>

                <form onSubmit={handlePopupSubmit} className="popup-form">
                  <div className="form-group">
                    <label htmlFor="popup-name">
                      <FaUser className="input-icon" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="popup-name"
                      name="name"
                      value={popupFormData.name}
                      onChange={handlePopupInputChange}
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="popup-phone">
                      <FaPhone className="input-icon" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="popup-phone"
                      name="phone"
                      value={popupFormData.phone}
                      onChange={handlePopupInputChange}
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="popup-zalo">
                      <SiZalo className="input-icon" />
                      Số Zalo
                    </label>
                    <input
                      type="text"
                      id="popup-zalo"
                      name="zalo"
                      value={popupFormData.zalo}
                      onChange={handlePopupInputChange}
                      placeholder="Nhập số Zalo (nếu có)"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="popup-submit-btn"
                    disabled={popupIsSubmitting}
                  >
                    {popupIsSubmitting ? 'Đang gửi...' : 'ĐĂNG KÝ NGAY'}
                  </button>
                  <p className="popup-footnote">Chúng tôi cam kết bảo mật thông tin khách hàng.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </HelmetProvider>
  );
}

export default App;

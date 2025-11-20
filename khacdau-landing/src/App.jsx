import { HelmetProvider, Helmet } from 'react-helmet-async';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaStar,
  FaIdCard,
  FaExchangeAlt,
  FaCheckCircle,
  FaShieldAlt
} from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import './App.css';
import contentData from './data/content.json';

// Icon mapping
const iconMap = {
  FaIdCard: FaIdCard,
  FaShieldAlt: FaShieldAlt,
  FaCheckCircle: FaCheckCircle,
  FaClock: FaClock
};

function App() {
  const { site, contact, images, hero, intro, tableOfContents, sections, cta } = contentData;

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
        </div>
      </header>

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

          {/* CTA Section */}
          <div className="cta-section">
            <h3>{cta.title}</h3>
            <p>{cta.subtitle}</p>
            <div className="cta-buttons">
              <a href={`tel:${contact.hotline}`} className="cta-btn">
                <FaPhone /> Gọi ngay Hotline
              </a>
              <a href="#" className="cta-btn secondary">
                <SiZalo /> Chat Zalo 1
              </a>
              <a href="#" className="cta-btn secondary">
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
                <SiZalo className="contact-icon" />
                <div>
                  <strong>Zalo 1:</strong>
                  <a href="#">{contact.zalo1}</a>
                </div>
              </div>
              <div className="contact-item">
                <SiZalo className="contact-icon" />
                <div>
                  <strong>Zalo 2:</strong>
                  <a href="#">{contact.zalo2}</a>
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
    </HelmetProvider>
  );
}

export default App;

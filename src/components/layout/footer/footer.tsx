import React from "react";
import Container from "@components/ui/container";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4c-3.3 0-6 2.7-6 6v1z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.2 3H21l-6.2 7 7.2 11H16.4l-4.2-5.5-5.2 5.5H4.2l6.6-7.5L3.8 3H9.4l3.8 5L18.2 3zm-1 16.2h1.6L8.4 5H6.7l10.5 14.2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2c-.3-1.1-1.2-2-2.3-2.3C19.2 3.5 12 3.5 12 3.5s-7.2 0-9.2.4C1.7 4.2.8 5.1.5 6.2 0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.2 2 2.3 2.3 2 .4 9.2.4 9.2.4s7.2 0 9.2-.4c1.1-.3 2-1.2 2.3-2.3.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.18.3-.57.39-.87.21-2.43-1.48-5.5-1.82-9.1-1-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.95-.9 7.33-.52 10.05 1.14.3.18.39.57.21.87zm1.22-2.73c-.22.36-.7.48-1.06.26-2.78-1.71-7.02-2.21-10.3-1.22-.4.12-.83-.11-.95-.51-.12-.4.11-.83.51-.95 3.75-1.14 8.43-.58 11.64 1.39.36.21.48.69.26 1.05v-.02zm.1-2.82C14.65 8.89 9.18 8.71 6 9.67c-.49.15-1-.13-1.15-.62-.15-.49.13-1 .62-1.15 3.67-1.11 9.7-1 13.52 1.27.44.26.59.83.33 1.27-.26.44-.83.59-1.27.33z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.3 4.4c-1.5-1.4-3.4-2.2-5.4-2.4l-.3.6c-2.2-.3-4.4-.3-6.6 0l-.3-.6C5.7 2.2 3.8 3 2.3 4.4.2 7.6-.4 11.2.2 14.9c1.5 2.2 3.9 3.6 6.5 3.7l1.3-2.1c-.8-.2-1.6-.6-2.4-1.1l.5-.4c3.9 1.8 8.2 1.8 12.1 0l.5.4c-.8.5-1.6.9-2.4 1.1l1.3 2.1c2.6-.1 5-1.5 6.5-3.7.6-3.7 0-7.3-2.1-10.5zM8.9 12.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm6.2 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 2v10.5c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5c.3 0 .6 0 .9.1V5.1c-3.1.4-5.4 3-5.4 6.2 0 3.5 2.8 6.3 6.3 6.3s6.3-2.8 6.3-6.3v-5c1.4 1 3.2 1.6 5.1 1.6V8c-2.4 0-4.5-1.5-5.1-3.7h-4.6z"/>
  </svg>
);


const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const Footer: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="footer-minimal">
      <Container>
        <div className="footer-minimal__row">
          {/* Left Block: Newsletter + Social links */}
          <div className="footer-minimal__left">
            <div className="footer-newsletter">
              <form onSubmit={handleSubmit} className="footer-newsletter__form">
                <input
                  type="email"
                  placeholder="Insert your e-mail address *"
                  className="footer-newsletter__input"
                  required
                />
                <button type="submit" className="footer-newsletter__submit" aria-label="Subscribe">
                  <ArrowRightIcon />
                </button>
              </form>
            </div>
            <div className="footer-socials">
              <Link href="https://facebook.com" className="footer-socials__link" aria-label="Facebook">
                <FacebookIcon />
              </Link>
              <Link href="https://twitter.com" className="footer-socials__link" aria-label="X">
                <XIcon />
              </Link>
              <Link href="https://instagram.com" className="footer-socials__link" aria-label="Instagram">
                <InstagramIcon />
              </Link>
              <Link href="https://youtube.com" className="footer-socials__link" aria-label="YouTube">
                <YoutubeIcon />
              </Link>
              <Link href="https://spotify.com" className="footer-socials__link" aria-label="Spotify">
                <SpotifyIcon />
              </Link>
              <Link href="https://discord.com" className="footer-socials__link" aria-label="Discord">
                <DiscordIcon />
              </Link>
              <Link href="https://tiktok.com" className="footer-socials__link" aria-label="TikTok">
                <TiktokIcon />
              </Link>
            </div>
          </div>

          {/* Right Block: Simplified company and legal links */}
          <div className="footer-minimal__right">
            {/* Company columns */}
            <div className="footer-col">
              <span className="footer-col__title">Company</span>
              <ul className="footer-col__list">
                <li>
                  <Link href={ROUTES.TERMS} className="footer-col__link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.CONTACT} className="footer-col__link">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="footer-col__link">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="footer-col__link">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal terms columns */}
            <div className="footer-col">
              <span className="footer-col__title">Legal Terms and Conditions</span>
              <ul className="footer-col__list">
                <li>
                  <Link href={ROUTES.TERMS} className="footer-col__link">
                    Legal Notice
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.POLICY} className="footer-col__link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.POLICY} className="footer-col__link">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-col__link">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright & locations block */}
        <div className="footer-bottom">
          <div className="footer-bottom__copyright">
            © MAHARA 2026 | VAT NO. IT10115350158
          </div>
          <div className="footer-bottom__right">
            <Link href="#" className="footer-bottom__link">
              <GlobeIcon />
              <span>Location: Rest of the world/English</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

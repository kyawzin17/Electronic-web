
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter.jsx';

export default function Footer() {

  return (
    <footer className="w-full bg-card text-slate-400 pt-12  border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Red Dragon <span className="text-sm text-text-main font-normal text-slate-500 tracking-widest">Electronic!</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Innovation at your fingertips. <br />
            Connecting makers and engineers with the future of electronics.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-text-main font-semibold mb-6 border-l-2 border-purple-500 pl-3">Explore</h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><Link to="/" 
                      className="hover:text-purple-400 transition-colors">Home</Link></li>
            <li><Link to="/about" 
                      className="hover:text-purple-400 transition-colors">About Us</Link></li>
            <li><Link to="/doc/components" 
                      className="hover:text-purple-400 transition-colors">Documentation</Link></li>
            <li><Link to="/project" 
                      className="hover:text-purple-400 transition-colors">Projects</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-text-main font-semibold mb-6 border-l-2 border-purple-500 pl-3">Support</h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-purple-400 transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-purple-400 transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-4">Connect</h3>
            <div className="flex gap-5 text-xl text-text-secondary">
              <a href="https://www.facebook.com/share/1PmEarKK9b/" target="_blank" rel="noopener noreferrer" className="hover:text-text-main transition-all transform hover:-translate-y-1"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://github.com/kyawzin17" target="_blank" rel="noopener noreferrer" className="hover:text-text-main transition-all transform hover:-translate-y-1"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="mailto:kyawzinwin23k@gmail.com" className="hover:text-text-main transition-all transform hover:-translate-y-1"><FontAwesomeIcon icon={faGoogle} /></a>
            </div>
          </div>
          
          <Newsletter />
        </div>
      </div>

      <div className="mt-14 py-4 md:py-6 px-4 px-6 md:px-12 border-t border-slate-800 flex items-center justify-between">
        <div>
            <span className="text-text-main">©</span> <span className='text-xs text-slate-500 uppercase tracking-tighter'>2026 Red Dragon Electronic For you.</span>
        </div>
        <button onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
          <FontAwesomeIcon icon={faCircleArrowUp} className='font-bold text-xl md:text-3xl text-text-muted hover:translate-y-[-4px] hover:text-text-main cursor-pointer' />
        </button>
      </div>
    </footer>
  );
}
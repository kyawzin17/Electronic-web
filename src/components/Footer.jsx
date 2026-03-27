
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext.js';

export default function Footer() {

  const { active, setActive }= useAppContext();
  return (
    <footer className="w-full bg-card text-slate-400 py-12 border-t border-slate-800/50">
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
                      onClick={() => setActive("home")} className="hover:text-purple-400 transition-colors">Home</Link></li>
            <li><Link to="/about"
                      onClick={() => setActive("about")} className="hover:text-purple-400 transition-colors">About Us</Link></li>
            <li><Link to="/doc/components"
                      onClick={() => setActive("doc")} className="hover:text-purple-400 transition-colors">Documentation</Link></li>
            <li><Link to="/project"
                      onClick={() => setActive("project")} className="hover:text-purple-400 transition-colors">Projects</Link></li>
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
              <a href="#" className="hover:text-text-main transition-all transform hover:-translate-y-1"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#" className="hover:text-text-main transition-all transform hover:-translate-y-1"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#" className="hover:text-text-main transition-all transform hover:-translate-y-1"><FontAwesomeIcon icon={faGoogle} /></a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-text-main font-semibold">Stay Updated</h3>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="w-full bg-soft border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 uppercase tracking-tighter">
        @2026 Red Dragon Electronic For you.
      </div>
    </footer>
  );
}
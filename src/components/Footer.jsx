// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
// import "../App.css";

// export default function Footer() {

//     const [email, setEmail]= useState();

//     consty
//     return (
//          <footer className="w-full py-10 mb-4 md:py-20 px-2 md:px-10">
//                 <div className="mb-20">
//                     <h1><span className="text-shadow-lg/30 text-7xl font-bold header-logo">Red Dargon</span><span  className="text-sm font-semibold"> Electronic!</span></h1>
//                 </div>
//                 <div className="w-full flex justify-center md:justify-between items-center gap-6 md:gap-1 gap-y-20 flex-wrap">
//                     <div className="w-55 text-main">
//                         <p className="py-8 sm:text-sm">
//                             Innovation at your fingertips.
//                         </p>
//                         <p className="sm:text-sm">
//                             Connecting makers and engineers with the fature of electronics.
//                         </p>
//                     </div>
//                     <div className="w-px h-30 bg-primary opacity-50"></div>
//                     <div className="me-5">
//                         <h2 className="sm:text-sm md:text-md font-semibold text-(--primary) mb-2">EXPLORE</h2>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             Home
//                         </h3>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             About Us
//                         </h3>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             Documentation
//                         </h3>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             Projects
//                         </h3>
//                     </div>
//                     <div className="w-px h-30 bg-(--primary) opacity-50"></div>
//                     <div className="me-5">
//                         <h2 className="sm:text-sm md:text-md font-semibold text-(--primary) mb-2">SUPPORT</h2>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             Contact Us
//                         </h3>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             FAQ
//                         </h3>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             Shipping & Returns
//                         </h3>
//                         <h3 className="sm:text-sm md:text-md text-main">
//                             Privacy Policy
//                         </h3>
//                     </div>
//                     <div className="w-px h-30 bg-(--primary) opacity-50"></div>
//                     <div className="w-50">
//                         <div className="flex mb-2">
//                             <h2 className="sm:text-sm md:text-md font-semibold text-primary mb-2">CONNECT</h2>
//                             <FontAwesomeIcon icon={faFacebook} size="lg" className="ms-3 me-1 text-main select-none cursor-pointer hover:text-blue-700 hover:scale-105"/>
//                             <FontAwesomeIcon icon={faGoogle} size="lg" className="text-main select-none cursor-pointer hover:text-red-700 hover:scale-105"/>
//                         </div>
//                         <p className="text-main sm:text-sm md:text-md mb-2">
//                             Stay Updated
//                         </p>
//                         <input className="outline-2 outline-secondary rounded-sm text-main sm:text-sm md:text-md px-1 py-1 mt-2 mb-4"
//                                 placeholder="Your Email Addresss"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}/> <br></br>
//                         <button className='bg-secondary text-bg px-8 py-1 rounded-sm select-none cursor-pointer shadow transition duration-300 hover:shadow-[0_0_10_var(--primary)] font-semibold'>
//                             Subscribe
//                         </button>
//                     </div>
//                 </div>
//             </footer>
//     )};

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
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
            <li><a href="/" className="hover:text-purple-400 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-purple-400 transition-colors">About Us</a></li>
            <li><a href="/docs" className="hover:text-purple-400 transition-colors">Documentation</a></li>
            <li><a href="/projects" className="hover:text-purple-400 transition-colors">Projects</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-text-main font-semibold mb-6 border-l-2 border-purple-500 pl-3">Support</h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><a href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-purple-400 transition-colors">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-purple-400 transition-colors">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
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
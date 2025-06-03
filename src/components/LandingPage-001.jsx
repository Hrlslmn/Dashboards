import React from 'react';

export default function LandingPageLight() {
  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-emerald-500 selection:text-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
            🌿 Evergreen Solutions
          </a>
          <div className="space-x-5 hidden md:flex items-center">
            <a href="#services" className="text-gray-600 hover:text-emerald-600 transition-colors">Services</a>
            <a href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors">About Us</a>
            <a href="#showcase" className="text-gray-600 hover:text-emerald-600 transition-colors">Showcase</a>
            <a href="#contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</a>
            <a
              href="#"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              Request Demo
            </a>
          </div>
          <div className="md:hidden">
            {/* Mobile Menu Button - Add functionality if needed */}
            <button className="text-gray-600 hover:text-emerald-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 md:py-32 bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            Grow Your Business with <span className="text-emerald-600">Sustainable Strategies</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Evergreen Solutions offers innovative tools and expert consultancy to help your business thrive in a changing world.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-block w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Get Started Free
            </a>
            <a
              href="#services"
              className="inline-block w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Explore Services
            </a>
          </div>
        </div>
        {/* Optional: Subtle background shapes or illustration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 md:w-48 md:h-48 opacity-10">
          {/* Example SVG - replace with your own */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#A7F3D0" d="M58.3,-51.7C71.8,-32.8,76.5,-7.1,70.7,15.1C64.9,37.3,48.6,56,28.9,64.8C9.2,73.6,-13.9,72.5,-33.4,62.2C-52.9,52,-68.8,32.6,-73.7,9.5C-78.7,-13.6,-72.7,-40.3,-57.5,-59.2C-42.3,-78.1,-17.9,-89.2,5.1,-90.2C28.1,-91.2,56.2,-82.1,58.3,-51.7Z" transform="translate(100 100)" />
          </svg>
        </div>
      </header>

      {/* Services Section / Features */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer 🚀</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Our tailored solutions are designed to meet your unique business needs and drive impactful results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-emerald-500 text-3xl mb-5 p-3 bg-emerald-100 rounded-full inline-block">
                {/* Replace with an actual icon SVG or font icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Digital Transformation</h3>
              <p className="text-gray-600 leading-relaxed">
                Leverage the latest technologies to optimize processes and enhance customer experiences.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-emerald-500 text-3xl mb-5 p-3 bg-emerald-100 rounded-full inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Growth Marketing</h3>
              <p className="text-gray-600 leading-relaxed">
                Data-driven marketing strategies to expand your reach and boost conversions.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-emerald-500 text-3xl mb-5 p-3 bg-emerald-100 rounded-full inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0112 2a8.003 8.003 0 015.014 1.014C19.5 5 20 8 20 10c2 0 2.643-1.343 2.657-1.343a8 8 0 01-5 10z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainable Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrate eco-friendly practices that benefit both your business and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-emerald-50">
        <div className="container mx-auto px-6">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" // Replace with your image
                alt="Team collaborating"
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="text-emerald-600 font-semibold uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Empowering Businesses, Nurturing Growth.
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At Evergreen Solutions, we believe that sustainable growth is the key to long-term success. Our team of experts is dedicated to providing innovative solutions that are not only effective but also responsible.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We combine cutting-edge technology with deep industry knowledge to help you navigate challenges and seize opportunities.
              </p>
              <a
                href="#"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all"
              >
                Meet The Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase/Portfolio Snippet (Optional) */}
      <section id="showcase" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories 🌟</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              See how we've helped businesses like yours achieve remarkable results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden flex flex-col">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=60" alt="Project Alpha" className="w-full h-56 object-cover"/>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Alpha</h3>
                <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                  Transformed their customer engagement by implementing a new CRM and analytics platform, resulting in a 30% increase in retention.
                </p>
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold self-start">Read Case Study →</a>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden flex flex-col">
              <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=60" alt="Project Beta" className="w-full h-56 object-cover"/>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Startup Beta</h3>
                <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                  Launched a successful go-to-market strategy for a new sustainable product line, exceeding initial sales targets by 50%.
                </p>
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold self-start">Read Case Study →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to Grow with Us?</h2>
          <p className="text-lg text-emerald-100 mb-10 max-w-xl mx-auto">
            Let's discuss how Evergreen Solutions can help your business reach new heights.
            Get in touch for a free consultation.
          </p>
          <a
            href="#"
            className="bg-white text-emerald-600 font-bold py-3 px-10 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-gray-100"
          >
            Contact Us Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center">
        <div className="container mx-auto px-6">
          <div className="mb-4">
            <a href="#" className="text-xl font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
              🌿 Evergreen Solutions
            </a>
          </div>
          <div className="space-x-6 mb-4">
            <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Twitter</a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Evergreen Solutions. Nurturing growth, sustainably.
          </p>
        </div>
      </footer>
    </div>
  );
}
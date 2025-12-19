import React from 'react';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  // URL for The Product Folks logo (black/white style with rocket)
  const TPF_LOGO_URL = "https://res.cloudinary.com/du1uwq1tu/image/upload/v1766136719/60b7927692b2ab6fabc77b6b_new_white_logo-p-500_molxiw.png";

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
              ✨ Your Ultimate Course Guide
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              Your Gateway to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Perfect Electives</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Discover, filter, and explore elective courses at NIT Trichy with detailed reviews, grading patterns, and professor insights all in one premium platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all text-lg"
              >
                Explore Now
              </button>
              <button 
                onClick={scrollToFeatures}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-lg"
              >
                Learn More
              </button>
            </div>

            {/* Supported By Section */}
            <div className="pt-10 border-t border-slate-100 max-w-sm mx-auto">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-5">In Collaboration with</p>
              <div className="flex items-center justify-center transition-all duration-300">
                <img 
                  src={TPF_LOGO_URL} 
                  alt="The Product Folks" 
                  className="h-12 w-auto object-contain opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-layer-group text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Comprehensive Database</h3>
              <p className="text-slate-500 leading-relaxed">
                Browse through all available electives, minors, and program-specific courses with detailed information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-filter text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Filtering</h3>
              <p className="text-slate-500 leading-relaxed">
                Filter by department and search terms to find exactly what you need quickly without the clutter.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-star text-2xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Student Reviews</h3>
              <p className="text-slate-500 leading-relaxed">
                Read authentic reviews and grading patterns from your fellow students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-slate-900 mb-6">About Our Initiative</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                A comprehensive platform to simplify elective discovery for students. Get reviews, grading patterns, and professor insights in one place. We believe every student deserves to make informed decisions about their academic journey.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-indigo-600 bg-indigo-50 p-2 rounded-lg">
                    <i className="fa-solid fa-user-group"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">By Students, For Students</h4>
                    <p className="text-sm text-slate-500">Built by NIT Trichy students who understand the challenges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-2 rounded-lg">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Informed Decisions</h4>
                    <p className="text-sm text-slate-500">Better choices with detailed course reviews and insights.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                    <i className="fa-solid fa-earth-asia"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Community Driven</h4>
                    <p className="text-sm text-slate-500">Powered by contributions from the entire community.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-[40px] p-8 aspect-square flex flex-col justify-center items-center text-white text-center shadow-2xl">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <i className="fa-solid fa-graduation-cap text-6xl mb-6"></i>
                  <h3 className="text-2xl font-bold mb-2">NIT Trichy Elective Hub</h3>
                  <p className="opacity-80">Empowering 5000+ students to navigate their academic path with confidence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-indigo-600 h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <i className="fa-solid fa-graduation-cap text-white text-lg"></i>
            </div>
            <span className="text-2xl font-black text-slate-800">Course<span className="text-indigo-600">Pilot</span></span>
          </div>
          <p className="text-slate-400 text-sm italic mb-10 max-w-md mx-auto">
            A student-led initiative to bring transparency to academics at NIT Trichy.
          </p>
          
          <div className="pt-8 border-t border-slate-50 flex flex-col items-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Supported By</p>
            <img 
              src={TPF_LOGO_URL} 
              alt="The Product Folks" 
              className="h-10 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
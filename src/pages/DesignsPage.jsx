return (
  <div className="min-h-screen h-full flex flex-col bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0a0c10] text-[#E0E0E0] font-sans overflow-hidden relative">
    {/* Background glow */}
    <div className="hidden sm:block absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-amber-600/15 via-amber-600/5 to-transparent blur-xl rounded-full animate-pulse-slow pointer-events-none" />
    <div className="hidden sm:block absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-sky-600/15 via-sky-600/5 to-transparent blur-xl rounded-full animate-pulse-slow animation-delay-2000 pointer-events-none" />

    <div className="flex-1 w-full relative z-10">
      <HeaderGreen />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-10 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-14 sm:mb-20" data-aos="fade-down">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-transparent bg-clip-text mb-5 tracking-tight">
            Graphic Design Library
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Explore professional visual design work, enhanced by AI insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <Suspense fallback={<div className="text-center text-neutral-400">Loading designs...</div>}>
            {categories.map((item, idx) => (
              <DesignCategoryCard key={idx} item={item} idx={idx} />
            ))}
          </Suspense>
        </div>
      </main>
    </div>

    <style jsx global>{`
      html, body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }

      @keyframes pulse-slow {
        0%, 100% { opacity: 0.05; transform: scale(0.9); }
        50% { opacity: 0.15; transform: scale(1); }
      }
      .animate-pulse-slow {
        animation: pulse-slow 10s infinite ease-in-out;
      }
      .animation-delay-2000 {
        animation-delay: 2.5s;
      }
      .bg-gradient-radial {
        background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 70%);
      }
    `}</style>
  </div>
);







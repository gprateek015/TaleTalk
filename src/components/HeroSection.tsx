import { Button } from "./ui/button";

interface HeroSectionProps {
  onTryItClick: () => void;
}

export function HeroSection({ onTryItClick }: HeroSectionProps) {
  return (
    <section className="h-[100dvh] text-white relative">
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-6xl mx-auto">
          <div className="inline-block p-1.5 sm:p-2 px-3 sm:px-4 mb-4 sm:mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-xs sm:text-sm font-medium text-purple-200">
              AI-Powered Story Generation
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
            TaleTalk
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into captivating stories and podcasts with the
            power of artificial intelligence
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">✨</div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                AI-Powered
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Advanced AI technology to create engaging narratives
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎙️</div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                Multiple Formats
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Generate stories, podcasts, and more
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🌍</div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                Global Reach
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Support for multiple languages and styles
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onTryItClick}
              className="px-8 sm:px-12 py-4 sm:py-5 h-12 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base sm:text-lg font-semibold shadow-md hover:shadow-purple-500/25 cursor-pointer"
            >
              Try It Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

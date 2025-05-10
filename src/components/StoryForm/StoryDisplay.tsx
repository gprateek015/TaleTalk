import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface StoryDisplayProps {
  story: string;
  audioUrl?: string;
}

function StoryDisplay({ story, audioUrl }: StoryDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(audioUrl));

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 sm:mt-8"
    >
      <div className="relative">
        <div className="absolute -top-4 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full" />
        <div className="space-y-4 sm:space-y-6">
          <div className="prose prose-invert max-w-none max-h-64 overflow-y-auto">
            <p className="text-white/80 leading-relaxed text-base sm:text-lg">
              {story}
            </p>
          </div>

          {audioUrl && (
            <div className="relative pt-4 sm:pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                  <span className="text-white/90 text-sm sm:text-base">
                    Audio Narration
                  </span>
                </div>
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  className="hover:bg-white/10 p-2"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default StoryDisplay;

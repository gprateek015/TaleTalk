import { Background } from "./components/Background";
import { HeroSection } from "./components/HeroSection";
import { StoryForm } from "./components/StoryForm";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import AudioCall from "./components/AudioCall";

const queryClient = new QueryClient();

const App = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("form-section");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <Background />
        <Navbar />
        <HeroSection onTryItClick={scrollToForm} />
        {/* Form Section */}
        <section
          id="form-section"
          className="min-h-[100dvh] text-white relative flex items-center justify-center"
        >
          <StoryForm />
        </section>

        <section className="min-h-[100dvh] text-white relative flex items-center justify-center">
          <AudioCall />
        </section>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;

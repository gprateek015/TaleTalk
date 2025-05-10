import config from "@/config";
import { useMutation } from "@tanstack/react-query";

const useGenerateStory = () => {
  const generateStory = async (
    storyData: StoryFormData
  ): Promise<StoryResponse> => {
    console.log("config", config);
    const response = await fetch(`${config.apiUrl}/www/story/`, {
      method: "POST",
      body: JSON.stringify(storyData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to generate story");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: generateStory,
  });
};

export default useGenerateStory;

interface StoryFormData {
  genre: string;
  theme: string;
  tone?: string;
  targetLength?: "1000_words" | "2500_words" | "4000_words";
  language?: "english" | "hindi";
  storyIdea?: string;
}

interface StoryResponse {
  story: string;
  audio_url: string;
}

import config from "@/config";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useGenerateStorySteaming = () => {
  const [data, setData] = useState<{
    story: string;
    audio_url: string;
  } | null>(null);
  const [streamingStatus, setStreamingStatus] = useState<
    "not_started" | "streaming" | "completed" | "error"
  >("not_started");

  const reset = () => {
    setData(null);
    setStreamingStatus("not_started");
  };

  const generateStory = async (data: StoryFormData) => {
    setStreamingStatus("not_started");
    setData(null);
    const response = await fetch(`${config.apiUrl}/www/story/sse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok || !response.body) {
      throw new Error("Failed to generate story");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setStreamingStatus("streaming");

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split("\n")) {
        if (!line) continue;
        try {
          const data = JSON.parse(line.slice(6));
          if (data.event === "story_text_append") {
            setData((prev) => ({
              ...(prev || { story: "", audio_url: "" }),
              story: (prev?.story || "") + data.text,
            }));
          } else if (data.event === "audio_url") {
            setData((prev) => ({
              ...(prev || { story: "", audio_url: "" }),
              audio_url: data.text,
            }));
          }
        } catch (e) {
          console.error("Error parsing chunk:", e);
          console.error("chunk:", chunk);
          setStreamingStatus("error");
          throw e;
        }
      }
    }
    setStreamingStatus("completed");
    return true;
  };

  const mutation = useMutation({
    mutationFn: generateStory,
  });

  return { ...mutation, data, streamingStatus, reset };
};

export default useGenerateStorySteaming;

interface StoryFormData {
  genre: string;
  theme: string;
  tone?: string;
  targetLength?: "1000_words" | "2500_words" | "4000_words";
  language?: "english" | "hindi";
  storyIdea?: string;
}

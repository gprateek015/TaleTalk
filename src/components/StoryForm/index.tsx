import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Shuffle, Hourglass, RotateCcw } from "lucide-react";
import { storyFormSchema, type StoryFormData } from "./schema";
import {
  GENRES,
  LANGUAGES,
  STORY_IDEAS,
  TARGET_LENGTHS,
  THEMES,
  TONES,
} from "./options";
import StoryDisplay from "./StoryDisplay";
import { getRandom } from "@/lib/utils";
import { toast } from "sonner";
import useGenerateStorySteaming from "@/actions/hooks/useGenerateStorySteaming";

export function StoryForm() {
  const {
    mutateAsync: generateStoryAsync,
    isPending: isGeneratingStory,
    data: storyData,
    streamingStatus,
    reset: resetStreamingData,
  } = useGenerateStorySteaming();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isSubmitted },
    reset,
  } = useForm<StoryFormData>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      genre: "",
      targetLength: undefined,
      theme: "",
      tone: "",
      language: undefined,
      storyIdea: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: StoryFormData) => {
    try {
      await generateStoryAsync(data);
    } catch (_) {
      toast.error("Error generating story");
    }
  };

  const handleRandomGenerate = () => {
    reset({
      targetLength: TARGET_LENGTHS[0].value,
      genre: getRandom(GENRES).value,
      theme: getRandom(THEMES).value,
      tone: getRandom(TONES).value,
      language: getRandom(LANGUAGES).value,
      storyIdea: getRandom(STORY_IDEAS),
    });
  };

  const handleReset = () => {
    resetStreamingData();
    reset({});
  };

  const step = ["not_started", "error"].includes(streamingStatus) ? 0 : 1;

  return (
    <div className="max-h-90vh w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 shadow-2xl border border-white/20 mx-4">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white/90">
          {step === 0 ? "Story Generator" : "Your Story"}
        </h2>
        {step === 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleRandomGenerate}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Random Generate
          </Button>
        )}
        {step === 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Reset
          </Button>
        )}
      </div>
      {step === 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          <div className="flex flex-wrap gap-4 sm:gap-5">
            <div className="basis-full sm:basis-1/3 flex-1 space-y-2 w-full">
              <Label
                htmlFor="genre"
                className="text-white/90 text-sm sm:text-base"
              >
                Genre
              </Label>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="genre"
                      className="w-full bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENRES.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.genre && (isSubmitted || dirtyFields.genre) && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.genre.message}
                </p>
              )}
            </div>

            <div className="basis-full sm:basis-1/3 flex-1 space-y-2 w-full">
              <Label
                htmlFor="targetLength"
                className="text-white/90 text-sm sm:text-base"
              >
                Story Length
              </Label>
              <Controller
                name="targetLength"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="targetLength"
                      className="w-full bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Select story length" />
                    </SelectTrigger>
                    <SelectContent>
                      {TARGET_LENGTHS.map((t) => (
                        <SelectItem
                          key={t.value}
                          value={t.value}
                          disabled={t.disabled}
                        >
                          {t.label}
                          {t.disabled && (
                            <Hourglass className="w-4 h-4 absolute right-2" />
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.targetLength &&
                (isSubmitted || dirtyFields.targetLength) && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {errors.targetLength.message}
                  </p>
                )}
            </div>

            <div className="basis-full sm:basis-1/3 flex-1 space-y-2 w-full">
              <Label
                htmlFor="theme"
                className="text-white/90 text-sm sm:text-base"
              >
                Theme
              </Label>
              <Input
                id="theme"
                {...register("theme")}
                placeholder="e.g., Redemption, Freedom, Betrayal"
                className="w-full bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                list="theme-suggestions"
              />
              <datalist id="theme-suggestions">
                {THEMES.map((theme) => (
                  <option key={theme.value} value={theme.label} />
                ))}
              </datalist>
              {errors.theme && (isSubmitted || dirtyFields.theme) && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.theme.message}
                </p>
              )}
            </div>

            <div className="basis-full sm:basis-1/3 flex-1 space-y-2 w-full">
              <Label
                htmlFor="tone"
                className="text-white/90 text-sm sm:text-base"
              >
                Tone
              </Label>
              <Controller
                name="tone"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="tone"
                      className="w-full bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Select Tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TONES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.tone && (isSubmitted || dirtyFields.tone) && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.tone.message}
                </p>
              )}
            </div>

            <div className="basis-full sm:basis-1/3 flex-1 space-y-2 w-full">
              <Label
                htmlFor="language"
                className="text-white/90 text-sm sm:text-base"
              >
                Language
              </Label>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="language"
                      className="w-full bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                          {l.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.language && (isSubmitted || dirtyFields.language) && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.language.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="storyIdea"
              className="text-white/90 text-sm sm:text-base"
            >
              Story Idea
            </Label>
            <Textarea
              id="storyIdea"
              {...register("storyIdea")}
              placeholder="Describe your story idea in natural language..."
              rows={4}
              className="w-full bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base resize-none sm:resize-y max-h-32"
            />
            {errors.storyIdea && (isSubmitted || dirtyFields.storyIdea) && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.storyIdea.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 items-center justify-center mt-6 sm:mt-8">
            <Button
              type="submit"
              loading={isGeneratingStory}
              className="w-full px-8 sm:px-12 py-3 sm:py-5 h-10 sm:h-12 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm sm:text-base shadow-md hover:shadow-purple-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Generate Story
            </Button>
          </div>
        </form>
      )}

      {/* {generatedStory && (
        <StoryDisplay story={generatedStory} audioUrl={audioUrl} />
      )} */}
      {step === 1 && (
        <StoryDisplay
          story={storyData?.story || ""}
          audioUrl={storyData?.audio_url || ""}
        />
      )}
    </div>
  );
}

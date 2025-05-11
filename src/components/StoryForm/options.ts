import type { StoryFormData } from "./schema";

export const GENRES = [
  { label: "Fantasy", value: "fantasy" },
  { label: "Sci-Fi", value: "scifi" },
  { label: "Mystery", value: "mystery" },
  { label: "Romance", value: "romance" },
  { label: "Horror", value: "horror" },
  { label: "Adventure", value: "adventure" },
  { label: "Historical", value: "historical" },
  { label: "Thriller", value: "thriller" },
  { label: "Comedy", value: "comedy" },
  { label: "Drama", value: "drama" },
  { label: "Fairytale", value: "fairytale" },
  { label: "Mythology", value: "mythology" },
  { label: "Dystopian", value: "dystopian" },
  { label: "Superhero", value: "superhero" },
  { label: "Slice of Life", value: "slice_of_life" },
];
export const TARGET_LENGTHS: {
  label: string;
  value: NonNullable<StoryFormData["targetLength"]>;
  disabled: boolean;
}[] = [
  { label: "2-5 minutes", value: "1000_words", disabled: false },
  { label: "15-30 minutes", value: "2500_words", disabled: true },
  { label: "30+ minutes", value: "4000_words", disabled: true },
];
export const TONES = [
  { label: "Humorous", value: "humorous" },
  { label: "Serious", value: "serious" },
  { label: "Mysterious", value: "mysterious" },
  { label: "Inspirational", value: "inspirational" },
  { label: "Dark", value: "dark" },
  { label: "Lighthearted", value: "lighthearted" },
  { label: "Dramatic", value: "dramatic" },
  { label: "Whimsical", value: "whimsical" },
  { label: "Suspenseful", value: "suspenseful" },
  { label: "Uplifting", value: "uplifting" },
];
export const LANGUAGES: {
  label: string;
  value: NonNullable<StoryFormData["language"]>;
}[] = [
  { label: "English", value: "english" },
  // { label: "Hindi", value: "hindi" },
];
export const THEMES = [
  { label: "Redemption", value: "redemption" },
  { label: "Freedom", value: "freedom" },
  { label: "Betrayal", value: "betrayal" },
  { label: "Courage", value: "courage" },
  { label: "Friendship", value: "friendship" },
  { label: "Survival", value: "survival" },
  { label: "Justice", value: "justice" },
  { label: "Sacrifice", value: "sacrifice" },
  { label: "Coming of Age", value: "coming_of_age" },
  { label: "Revenge", value: "revenge" },
  { label: "Hope", value: "hope" },
  { label: "Transformation", value: "transformation" },
  { label: "Forgiveness", value: "forgiveness" },
  { label: "Greed", value: "greed" },
  { label: "Destiny", value: "destiny" },
];
export const STORY_IDEAS = [
  "A young hero discovers a hidden world beneath their city.",
  "Two rivals must work together to save their town from disaster.",
  "A mysterious letter changes the course of a quiet librarian's life.",
  "A group of friends embarks on a quest to find a legendary artifact.",
  "A scientist invents a device that can alter memories.",
  "A forbidden romance blooms between members of warring families.",
  "A detective races against time to solve a cryptic puzzle.",
  "A child befriends a mythical creature in the forest.",
  "A kingdom faces ruin unless an ancient prophecy is fulfilled.",
  "A time traveler tries to fix a mistake in the past.",
  "A haunted house reveals its secrets to a new resident.",
  "A rebellion rises against a tyrannical ruler.",
  "A lost civilization is discovered deep in the jungle.",
  "A magical book grants wishes—with a twist.",
  "A family must survive a night of supernatural events.",
];

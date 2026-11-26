export type Story = {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  genre?: string;
  status: "draft" | "ongoing" | "completed";
  chapterCount: number;
  authorId: { _id: string; username: string; avatarUrl?: string };
};

export type ChapterWithContent = Chapter & { content: string };

export type StoryDetail = Omit<Story, "chapterCount">;

export type Chapter = {
  _id: string;
  storyId: string;
  title: string;
  order: number;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
};

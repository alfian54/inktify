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

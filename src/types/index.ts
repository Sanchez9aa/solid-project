type TComment = {
  id: string;
  likes: number;
  author: string;
  date: Date;
  content: string;
  child: TComment[];
  isBeingReplied?: boolean;
  user?: string;
};

export type { TComment };

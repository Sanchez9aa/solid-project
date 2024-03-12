import { TComment } from "~/types";

export function CommentBody({ comment }: { comment: TComment }) {
  return <span>{comment.content}</span>;
}

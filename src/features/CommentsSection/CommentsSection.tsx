import { CommentList, NewComment } from "./components";

export function CommentsSection() {
  return (
    <div class="flex flex-col gap-5">
      <CommentList />
      <NewComment />
    </div>
  );
}

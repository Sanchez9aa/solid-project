import { useCommentsContext } from "~/context";
import { CommentList, NewComment } from "./components";

export function CommentsSection() {
  const { drawer, setDrawer } = useCommentsContext();

  return (
    <>
      <div class="flex flex-col gap-4 mb-4 max-h-[calc(100vh-250px)] overflow-y-auto">
        <CommentList />
      </div>
      <NewComment />
    </>
  );
}

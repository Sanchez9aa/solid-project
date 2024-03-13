import { Modal } from "~/components";
import { useCommentsContext } from "~/context";
import { CommentList, NewComment } from "./components";

export function CommentsSection() {
  const { drawer, setDrawer } = useCommentsContext();

  return (
    <div class="flex flex-col gap-5">
      <CommentList />
      <NewComment />

      <Modal
        isOpen={drawer()}
        onClose={() => {}}
        onAction={() => {}}
      />
    </div>
  );
}

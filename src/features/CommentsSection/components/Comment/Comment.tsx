import { Modal } from "~/components";
import { useCommentsContext } from "~/context";
import { TComment } from "~/types";
import { NewComment } from "../NewComment";
import { CommentBody, CommentHeader, LikeCount } from "./components";

export function Comment({ comment }: { comment: TComment }) {
  const { drawer, comments, selectedComment, setDrawer, setComments } =
    useCommentsContext();

  const handleDeleteComment = () => {
    if (!selectedComment()) return;

    const newComments = comments()
      .map((c) => {
        if (c.id === selectedComment()?.id) {
          return null;
        }

        if (c.child.length > 0) {
          c.child = c.child.filter((cc) => cc.id !== selectedComment()?.id);
        }

        return c;
      })
      .filter(Boolean);

    setComments(newComments as TComment[]);

    setDrawer(false);
  };

  return (
    <div class="flex flex-col gap-4">
      <div class="bg-white p-6 flex gap-8 rounded-md ">
        <LikeCount id={comment.id} />
        <div class="flex flex-col gap-2 w-full">
          <CommentHeader comment={comment} />
          <CommentBody comment={comment} />
        </div>
      </div>

      {comment.child.length !== 0 && (
        <div class="flex flex-col ml-12">
          {comment.child?.map((childComment) => {
            return (
              <div class="bg-white p-6 flex gap-8 rounded-md mb-2">
                <LikeCount id={childComment.id} />
                <div class="flex flex-col gap-2 w-full">
                  <CommentHeader comment={childComment} />
                  <CommentBody comment={childComment} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {comment.isBeingReplied && (
        <NewComment isReply id={comment.id} className="-mt-2" />
      )}

      {drawer() && (
        <Modal
          onClose={() => setDrawer(false)}
          onAction={handleDeleteComment}
        />
      )}
    </div>
  );
}

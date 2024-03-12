import { TComment } from "~/types";
import { CommentBody, CommentHeader, LikeCount } from "./components";
import { NewComment } from "../NewComment";

export function Comment({ comment }: { comment: TComment }) {
  return (
    <div class="flex flex-col gap-1">
      <div class="bg-white p-8 flex gap-8 rounded-md ">
        <LikeCount id={comment.id} />
        <div class="flex flex-col gap-2 w-full">
          <CommentHeader comment={comment} />
          <CommentBody comment={comment} />
        </div>
      </div>

      {comment.child && (
        <div class="flex flex-col gap-4 pt-3 ml-12">
          {comment.child?.map((childComment) => {
            return (
              <div class="bg-white p-8 flex gap-8 rounded-md">
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
        <NewComment isReply id={comment.id} className="mt-2" />
      )}
    </div>
  );
}

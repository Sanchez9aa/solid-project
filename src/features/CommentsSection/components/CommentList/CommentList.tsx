import { useCommentsContext } from "~/context";
import { Comment } from "../Comment/Comment";

export function CommentList() {
  const { comments } = useCommentsContext();

  return (
    <>
      {comments()?.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </>
  );
}

import { Avatar } from "~/components";
import { DeleteIcon, EditIcon, ReplyIcon } from "~/components/icons";
import { useCommentsContext } from "~/context";
import { TComment } from "~/types";

export function CommentHeader({ comment }: { comment: TComment }) {
  const { comments, me, setComments, setDrawer, setSeletedComment } =
    useCommentsContext();

  const handleReply = () => {
    const newComments = comments().map((c) => {
      if (c.id === comment.id) {
        c.isBeingReplied = !c.isBeingReplied;
      }
      return c;
    });

    setComments(newComments);
  };

  const handleOpenDrawer = () => {
    setDrawer(true);
    setSeletedComment(comment);
  };

  const convertDateToHumanText = () => {
    if (!comment.date) return "";

    const date = new Date(comment.date);

    // Get the user's timezone
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert the date to the user's timezone
    date.toLocaleString(userLocale, {
      timeZone: userTimezone,
    });

    // Calculate the number of days
    const days = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);

    let text;

    if (days > 365.25) {
      const years = Math.floor(days / 365.25);
      text = `Hace ${years} año${years === 1 ? "" : "s"}`;
    } else if (days > 30.44) {
      const months = Math.floor(days / 30.44);
      text = `Hace ${months} mes${months === 1 ? "" : "es"}`;
    } else {
      text = `Hace ${Math.floor(days)} día${days === 1 ? "" : "s"}`;
    }

    return text;
  };

  return (
    <>
      <div class="flex gap-3 items-center justify-between">
        <div class="flex gap-3 items-center">
          <Avatar user={comment.author} />
          {comment.author === me() && (
            <span class="bg-blue-800 text-white px-2">
              tu
            </span>
          )}

          <span>{convertDateToHumanText()}</span>
        </div>
        {me() !== comment?.author ? (
          <span
            onClick={handleReply}
            class={`text-blue-900 cursor-pointer justify-end flex items-center gap-2 hover:opacity-50 ${
              comment.isBeingReplied ? "opacity-50" : ""
            }`}
          >
            <ReplyIcon /> Reply
          </span>
        ) : (
          <div class="flex gap-4">
            <span
              onClick={handleOpenDrawer}
              class={`text-red-600 cursor-pointer justify-end flex items-center gap-2 hover:opacity-50 ${
                comment.isBeingReplied ? "opacity-50" : ""
              }`}
            >
              <DeleteIcon /> Delete
            </span>
            <span
              onClick={() => {}}
              class={`text-blue-900 cursor-pointer justify-end flex items-center gap-2 hover:opacity-50 ${
                comment.isBeingReplied ? "opacity-50" : ""
              }`}
            >
              <EditIcon /> Edit
            </span>
          </div>
        )}
      </div>
    </>
  );
}

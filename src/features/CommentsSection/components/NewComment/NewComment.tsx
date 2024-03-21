import { createSignal } from "solid-js";
import { Avatar } from "~/components";
import { useCommentsContext } from "~/context";
import DATA from "~/data/data.json";
import { generateRandomId } from "~/helpers";
import { TComment } from "~/types";

type TNewCommentProps = {
  isReply?: boolean;
  id?: string;
  className?: string;
};

export function NewComment({ isReply, id, className }: TNewCommentProps) {
  const { comments, setComments, me } = useCommentsContext();

  console.log(DATA.users[Math.floor(Math.random() * DATA.users.length)]);

  const [textArea, setTextArea] = createSignal("");

  const handleSaveNewComment = () => {
    const comment: TComment = {
      id: generateRandomId(),
      likes: 0,
      /* author: DATA.users[Math.floor(Math.random() * DATA.users.length)], */
      author: me(),
      date: new Date(),
      content: textArea(),
      child: [],
      isBeingReplied: false,
    };

    setTextArea("");

    setComments([...comments(), comment]);
  };

  const handleSaveReplyComment = () => {
    const comment: TComment = {
      id: generateRandomId(),
      likes: 0,
      author: me(),
      date: new Date(),
      content: textArea(),
      child: [],
      isBeingReplied: false,
    };

    setTextArea("");

    const newComments = comments().map((c) => {
      if (c.id === id) {
        c.child.push(comment);
        c.isBeingReplied = false;
      }
      return c;
    });

    setComments(newComments);
  };

  const handleSaveComment = () => {
    if (textArea().trim() === "") return;

    if (isReply) {
      handleSaveReplyComment();
    } else {
      handleSaveNewComment();
    }
  };

  return (
    <div class={`rounded-md bg-white p-8 flex gap-8 w-full ${className}`}>
      <Avatar user={me()} />

      <textarea
        onChange={(e) => {
          setTextArea(e.target.value);
        }}
        cols="10"
        rows="2"
        placeholder="Write a comment..."
        class="w-full p-2 rounded-md border-2 min-h-[100px] max-h-[175px] border-gray-300"
        value={textArea()}
      />

      <button
        onClick={handleSaveComment}
        class="font-semibold text-sm bg-blue-800 text-white px-6 py-2 rounded-md h-[48px] hover:bg-opacity-80 transition-all duration-200 ease-in-out active:scale-95"
      >
        REPLY
      </button>
    </div>
  );
}

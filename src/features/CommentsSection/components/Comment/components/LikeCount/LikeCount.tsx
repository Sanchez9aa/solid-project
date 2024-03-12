import { useCommentsContext } from "~/context";

export function LikeCount({ id }: { id: string }) {
  const { comments, setComments } = useCommentsContext();

  const handleLike = () => {
    const comment = comments().find((c) => c.id === id);
    let newComments;
    let parent: string;

    if (comment) {
      newComments = comments().map((c) => {
        if (c.id === id) {
          c.likes++;
        }
        return c;
      });
    } else {
      const child = comments()
        .flatMap((c) => c.child)
        .map((c) => {
          if (c.id === id) {
            c.likes++;
            parent = c.id;
          }
          return c;
        });

      newComments = comments().map((c) => {
        if (c.id === parent) {
          c.child = child;
        }
        return c;
      });
    }

    setComments(newComments);
  };

  const handleDislike = () => {
    const comment = comments().find((c) => c.id === id);
    let newComments;
    let parent: string;

    if (comment) {
      newComments = comments().map((c) => {
        if (c.id === id) {
          c.likes--;
        }
        return c;
      });
    } else {
      const child = comments()
        .flatMap((c) => c.child)
        .map((c) => {
          if (c.id === id) {
            c.likes--;
            parent = c.id;
          }
          return c;
        });

      newComments = comments().map((c) => {
        if (c.id === parent) {
          c.child = child;
        }
        return c;
      });
    }

    setComments(newComments);
  };

  return (
    <div class="flex flex-col w-[50px] bg-black/5 rounded-md px-2 py-4 gap-3 h-fit">
      <button
        onClick={handleLike}
        class="text-blue-400 flex justify-center hover:scale-105 transition-transform duration-500"
      >
        <img src="./icon-plus.svg" alt="" />
      </button>
      <span class="text-center text-blue-700">
        {comments().find((c) => c.id === id)?.likes ||
          comments()
            .flatMap((c) => c.child)
            .find((c) => c.id === id)?.likes}
      </span>
      <button onClick={handleDislike} class="text-red-400 flex justify-center">
        <img src="./icon-minus.svg" alt="" />
      </button>
    </div>
  );
}

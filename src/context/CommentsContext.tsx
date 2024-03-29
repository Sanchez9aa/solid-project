import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

import DATA from "~/data/data.json";
import { TComment } from "~/types";

type CommentsContextType = {
  comments: () => TComment[];
  me: () => string;
  drawer: () => boolean;
  selectedComment: () => TComment | null;
  setSeletedComment: (comment: TComment | null) => void;
  setComments: (comments: TComment[]) => void;
  findComment: (id: string, comments: TComment[]) => TComment | undefined;
  setDrawer: (drawer: boolean) => void;
};

const CommentsContext = createContext<CommentsContextType>();

export function useCommentsContext() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error(
      "useCommentsContext must be used within a CommentsProvider"
    );
  }
  return context;
}

export function CommentsProvider(props: any) {
  const [comments, setComments] = createSignal<TComment[]>(
    props.initialComments || []
  );
  const [selectedComment, setSeletedComment] = createSignal<TComment | null>(
    null
  );
  const [drawer, setDrawer] = createSignal<boolean>(false);
  const [me] = createSignal<string>(DATA.users[0]);

  const findComment = (
    id: string,
    comments: TComment[]
  ): TComment | undefined => {
    return (
      comments.find((c) => c.id === id) ||
      comments.flatMap((c) => c.child).find((c) => c.id === id)
    );
  };

  createEffect(() => {
    if (typeof window !== "undefined") {
      const initialComments = localStorage.getItem("comments");
      if (initialComments) {
        setComments(JSON.parse(initialComments));
      }
    }
  }, []);

  createEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("comments", JSON.stringify(comments()));
    }
  });

  return (
    <CommentsContext.Provider
      value={{
        comments,
        me,
        drawer,
        selectedComment,
        setSeletedComment,
        setComments,
        setDrawer,
        findComment,
      }}
    >
      {props.children}
    </CommentsContext.Provider>
  );
}

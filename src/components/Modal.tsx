type TModel = {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
};

export function Modal({ isOpen, onClose, onAction }: TModel) {
  return (
    <div
      class={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 bg-black/30 w-full h-full overflow-auto z-10`}
    >
      <div class="w-96 h-fit rounded-md flex flex-col gap-4 p-6 bg-white m-auto inset-0 absolute">
        <h1 class="text-2xl font-bold">Delete comment</h1>
        <p class="text-md text-gray-600 font-medium">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div class="flex gap-4 justify-center">
        <button onClick={onClose} class="bg-gray-600 hover:bg-opacity-70 font-semibold active:scale-95 text-white rounded-md px-4 py-2">
          NO, CANCEL
        </button>
        <button onClick={onAction} class="bg-red-400 hover:bg-opacity-70 font-semibold active:scale-95 text-white rounded-md px-4 py-2">
          YES, DELETE
        </button>
        </div>
      </div>
    </div>
  );
}

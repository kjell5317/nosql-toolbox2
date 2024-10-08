import { ModalButton } from "./Buttons";

export default function Modal({
  headline = "More Info",
  info,
  buttonClass = "btn btn-outline btn-sm",
}: {
  headline?: string;
  info: string;
  buttonClass?: string;
}) {
  return (
    <>
      <ModalButton className={buttonClass} />
      <dialog id="more" className="modal modal-bottom md:modal-middle ">
        <div className="modal-box min-h-1/2 md:h-fit">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">{headline}</h3>
            <ModalButton open className="btn btn-outline btn-sm" />
          </div>
          <p className="py-4" dangerouslySetInnerHTML={{ __html: info }}></p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

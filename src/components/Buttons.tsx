import Modal from "./Modal";

export function BackButton({ back }: { back: () => void }) {
  return (
    <button onClick={back} className="btn btn-sm btn-outline">
      Back
    </button>
  );
}

export function RestartButton({ root }: { root: () => void }) {
  return (
    <button onClick={root} className="btn btn-outline btn-sm">
      Restart
    </button>
  );
}

export function ModalButton({
  open = false,
  className,
}: {
  open?: boolean;
  className: string;
}) {
  function toggle() {
    const modal = document.getElementById("more") as HTMLDialogElement;
    if (!open) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }

  return (
    <>
      {open ? (
        <button className={className} onClick={toggle}>
          Close
        </button>
      ) : (
        <button className={className} onClick={toggle}>
          More Info
        </button>
      )}
    </>
  );
}

export function AnswerButton({
  next,
  i,
  slot,
}: {
  next: (n: number) => () => void;
  i: number;
  slot: React.ReactNode;
}) {
  return (
    <button className="btn btn-primary w-full" onClick={next(i)}>
      {slot}
    </button>
  );
}

export function LinkButton({ href }: { href: string }) {
  return (
    <>
      <button className="btn btn-primary w-full">
        <a
          href={href}
          className="w-full h-full flex items-center justify-center"
          target="_blank"
        >
          Documentation
        </a>
      </button>
    </>
  );
}

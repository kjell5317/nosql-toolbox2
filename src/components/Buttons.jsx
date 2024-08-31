export function BackButton({ back }) {
  return (
    <button
      onClick={back}
      className="btn btn-circle btn-outline btn-sm tooltip"
      data-tip="Zurück"
    >
      <img
        src="/icons/Arrow_alt_left.svg"
        alt="Back button"
        className="pl-0.5"
      />
    </button>
  );
}

export function RestartButton({ root }) {
  return (
    <button
      onClick={root}
      className="btn btn-circle btn-outline btn-sm tooltip"
      data-tip="Neustarten"
    >
      <img src="/icons/Refresh.svg" alt="Reset button" className="pb-1" />
    </button>
  );
}

export function ModalButton({ open = false }) {
  function toggle() {
    const modal = document.getElementById("more");
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }

  return (
    <>
      {open ? (
        <button
          className="btn btn-circle btn-outline btn-sm tooltip"
          data-tip="Mehr Info"
          onClick={toggle}
        >
          <img src="/icons/Info.svg" alt="Info button" className="pb-0.5" />
        </button>
      ) : (
        <button
          className="btn btn-circle btn-outline btn-sm"
          onClick={toggle}
        ></button>
      )}
    </>
  );
}

export function AnswerButton({ next, i }) {
  return (
    <button className="btn btn-primary w-2/3" onClick={next(i)}>
      <slot />
    </button>
  );
}

export function LinkButton({ href }) {
  return (
    <a href={href}>
      <button className="btn btn-primary w-2/3">Documentation</button>
    </a>
  );
}

import { useState } from "react";
import { Tree } from "../Tree";

export default function Question({ init }: { init: any }) {

    const [node, setNode] = useState(() => new Tree(init, true));

    const next = (n: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        const child = node.next(n);
        if (child) {
            setNode(child);
        }
    }

    const back = () => {
        const parent = node.back();
        if (parent) {
            setNode(parent);
        }
    }

    const root = () => {
        setNode(Tree.root);
    }

    return (
        <>
            <div className="flex">
                <div className="flex flex-1 gap-4">
                    {Tree.root != node && <>
                        <button onClick={back} className="btn btn-circle btn-outline btn-sm tooltip" data-tip="Zurück">
                            <img src="/icons/Arrow_alt_left.svg" alt="Back button" className="pl-0.5" />
                        </button>
                        <button onClick={root} className="btn btn-circle btn-outline btn-sm tooltip" data-tip="Neustarten">
                            <img src="/icons/Refresh.svg" alt="Reset button" className="pb-1" />
                        </button>
                    </>}
                </div>
                {node.info && <>
                    <button onClick={() => (document.getElementById("more") as HTMLDialogElement)!.showModal()} className="btn btn-circle btn-outline btn-sm tooltip" data-tip="Mehr Info">
                        <img src="/icons/Info.svg" alt="Info button" className="pb-0.5" />
                    </button>
                    <dialog id="more" className="modal modal-bottom md:modal-middle">
                        <div className="modal-box">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-xl">Mehr Informationen</h3>
                                <button onClick={() => (document.getElementById("more") as HTMLDialogElement)!.close()} className="btn btn-circle btn-outline btn-sm">x</button>
                            </div>
                            <p className="py-4">{node.info}</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>x</button>
                        </form>
                    </dialog>
                </>}
            </div>
            <h1 className="text-2xl mb-4 text-center">{node.name}</h1>
            <div className="flex flex-col gap-4 items-center">
                {node.children.map((child, i) => (
                    <button key={i} className="btn btn-primary w-2/3" onClick={next(i)}>{child.answer}</button>
                ))}
            </div>
        </>
    );
}
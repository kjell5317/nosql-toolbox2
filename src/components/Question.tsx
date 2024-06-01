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
                        <button onClick={back} className="btn btn-circle btn-outline btn-sm"><img src="Arrow_alt_left.svg" alt="Back button" className="pl-0.5"/></button>
                        <button onClick={root} className="btn btn-circle btn-outline btn-sm"><img src="Refresh.svg" alt="Reset button" className="pb-1" /></button>
                    </>}
                </div>
                <button className="btn btn-circle btn-outline btn-sm"><img src="Info.svg" alt="Info button" className="pb-0.5" /></button>
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
import { Tree } from "../Tree";
import { AnswerButton, BackButton, LinkButton, RestartButton } from "./Buttons";
import Modal from "./Modal";
import { useState } from "react";

export default function Question({ init }: { init: any }) {
  const [node, set] = useState(() => new Tree(init, true));

  const next = (n: number) => () => {
    const child = node.next(n);
    if (child) {
      set(child);
    }
  };

  const back = () => {
    const parent = node.back();
    if (parent) {
      set(parent);
    }
  };

  const root = () => {
    set(Tree.root);
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-1 gap-4">
          {Tree.root != node && (
            <>
              <BackButton back={back} />
              <RestartButton root={root} />
            </>
          )}
        </div>
        {node.info && node.children.length > 1 && <Modal info={node.info} />}
      </div>
      <h1 className="text-2xl font-medium mt-4 mb-5 text-center">
        {node.name}
      </h1>
      {node.info && node.children.length === 1 && (
        <p className="text-center mt-1">{node.info}</p>
      )}
      <div className="flex flex-col gap-4 items-center justify-center">
        {node.children.map((child, i) => {
          return (
            <div className="w-2/3" key={i}>
              {node.children.length > 1 ? (
                <AnswerButton next={next} i={i} slot={child.answer} />
              ) : (
                <LinkButton href={child.answer} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

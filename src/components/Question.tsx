import { Tree } from "../Tree";
import { AnswerButton, BackButton, LinkButton, RestartButton } from "./Buttons";
import Modal from "./Modal";
import { useState } from "react";
import TreeD3 from "./TreeD3";

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
      <div className="flex justify-between">
        <div className="flex flex-1 md:gap-3 gap-2 justify-start">
          {Tree.root != node && (
            <>
              <BackButton back={back} />
              <RestartButton root={root} />
            </>
          )}
        </div>
        <div className="flex flex-1 justify-center font-medium text-lg items-center invisible sm:visible">
          {node.depth() + " / " + node.maxDepth()}
        </div>
        <div className="flex-1 flex justify-end">
          {node.info && !node.end && <Modal info={node.info} />}
        </div>
      </div>
      <h1
        className={`font-medium mt-4 text-center mx-4 ${
          node.end ? "text-primary text-3xl" : "text-2xl"
        }`}
      >
        {node.name}
      </h1>
      {node.info && node.end && (
        <>
          <p className="text-center mt-1 mx-4">{node.info}</p>
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {node.end.map((db: any, i: number) => {
              return (
                <div key={i}>
                  <h2 className="text-xl text-primary text-center">
                    {db.name}
                  </h2>
                  <p className="text-center">{db.info}</p>
                  {db.link && (
                    <div className="w-5/6 mx-auto my-2">
                      <LinkButton href={db.link} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="flex flex-col gap-4 mt-5 items-center justify-center">
        {node.children.map((child, i) => {
          return (
            <div className="w-2/3" key={i}>
              <AnswerButton next={next} i={i} slot={child.answer} />
            </div>
          );
        })}
      </div>
      {node.end && (
        <div className="p-5">
          <TreeD3 target={node} />
        </div>
      )}
    </>
  );
}

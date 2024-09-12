import { Tree, type End } from "../Tree";
import { AnswerButton, BackButton, RestartButton } from "./Buttons";
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
        className={`font-medium mt-4 text-center ${
          node.end ? "text-primary text-3xl" : "text-2xl"
        }`}
      >
        {node.name}
      </h1>
      {node.end && (
        <>
          <p className="text-center mx-4">{node.info}</p>
          <div className="divider divider-primary"></div>
          <div className="flex flex-col gap-2 justify-evenly">
            {node.end.map((db: End, i: number) => {
              return (
                <div key={i}>
                  <a href={db.link}></a>
                  <h2
                    className={`text-xl text-primary text-center ${
                      db.link && "link link-hover"
                    }`}
                  >
                    {db.name}
                  </h2>
                  <p className="text-center">{db.info}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="flex flex-col gap-4 items-center justify-center mt-4">
        {node.children?.map((child, i) => {
          return (
            <div className="w-2/3" key={i}>
              <AnswerButton next={next} i={i} slot={child.answer} />
            </div>
          );
        })}
      </div>
      {node.end && (
        <div className="ml-4 mt-5 justify-center hidden xl:flex">
          <TreeD3 target={node} />
        </div>
      )}
    </>
  );
}

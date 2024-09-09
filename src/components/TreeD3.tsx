import { useEffect, useRef } from "react";
import { Tree } from "../Tree";
import * as d3 from "d3";

export default function TreeD3({ target }: { target: Tree }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const height = 500;
    const nodeRad = 16;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Convert Tree instance to d3 hierarchy
    const root = d3.hierarchy<Tree>(Tree.root);
    const treeLayout = d3.tree<Tree>().size([height, 350]);
    const treeData = treeLayout(root);

    let targetNode: d3.HierarchyPointNode<Tree> | null = null;
    treeData.each((d) => {
      if (d.data == target) {
        targetNode = d;
      }
    });

    // If target node is found, get the path
    const pathNodes = targetNode
      ? (targetNode as d3.HierarchyPointNode<Tree>).path(treeData)
      : [];

    // Function to determine if a link is part of the path
    const isLinkInPath = (link: any) => {
      return pathNodes.includes(link.source) && pathNodes.includes(link.target);
    };

    const g = svg
      .attr("width", height + nodeRad)
      .attr("height", height - nodeRad * 2)
      .append("g")
      .attr("viewBox", `0 0 450 280`)
      .attr("transform", `translate(${nodeRad}, ${-nodeRad})`);

    // Links (edges)
    const link = g
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) =>
        isLinkInPath(d) ? "oklch(var(--s))" : "oklch(var(--nc))"
      )
      .attr("stroke-width", "2")
      .attr(
        "d",
        d3
          .linkHorizontal<any, any>()
          .x((d: any) => d.y)
          .y((d: any) => d.x)
      );

    // Nodes
    const node = g
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);
    node
      .append("circle")
      .attr("r", nodeRad)
      .attr("fill", (d) =>
        pathNodes.includes(d) ? "oklch(var(--p))" : "oklch(var(--nc))"
      );
    node
      .filter((d) => !d.children)
      .append("text")
      .attr("fill", "#FFF")
      .attr("dy", ".35em")
      .attr("x", nodeRad + 6)
      .text((d) =>
        d.data.name == "Online Transaction Processing"
          ? "OLTP"
          : d.data.name || ""
      );
  }, [target]);

  return <svg ref={svgRef}></svg>;
}

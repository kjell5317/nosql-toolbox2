export class Tree {
    static root: Tree;
    name?: string;
    info?: string;
    answer: string;
    children: Tree[];
    end?: { name: string, info: string }[];

    constructor(json: any, root: boolean = false) {
        this.name = json.name;
        this.answer = json.answer;
        this.info = json.info;
        if (json.end) {
            this.end = json.end;
            json.children = [];
        }
        this.children = json.children?.map((child: any) => new Tree(child));
        if (root) {
            Tree.root = this;
        }
    }

    next(n: number): Tree | null {
        if (this.children.length <= n) {
            return null;
        }
        return this.children[n];
    }

    static findParent(node: Tree, target: Tree): Tree | null {
        if (node.children != null) {
            for (let child of node.children) {
                if (child == target) {
                    return node;
                } else {
                    const parent = Tree.findParent(child, target);
                    if (parent) {
                        return parent;
                    }
                }
            }
        }
        return null;
    }

    back(): Tree | null {
        if (this == Tree.root) {
            return null;
        }
        return Tree.findParent(Tree.root, this);
    }

    maxDepth(): number {
        let maxDepth = 0;
        for (let child of this.children) {
            maxDepth = Math.max(maxDepth, child.maxDepth());
        }
        return Math.max(this.depth(), maxDepth);
    }

    depth(): number {
        if (this == Tree.root) {
            return 1;
        }
        return 1 + (Tree.findParent(Tree.root, this)?.depth() || 0);
    }
}
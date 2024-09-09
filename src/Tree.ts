export interface End {
    name: string, info: string, link?: string
}

export class Tree {
    static root: Tree;
    name?: string;
    info?: string;
    answer: string;
    children: Tree[];
    end?: End[];

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

    findParent(node: Tree): Tree | null {
        if (node.children != null) {
            for (let child of node.children) {
                if (child == this) {
                    return node;
                } else {
                    const parent = this.findParent(child);
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
        return this.findParent(Tree.root);
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
        return 1 + (this.findParent(Tree.root)?.depth() || 0);
    }
}
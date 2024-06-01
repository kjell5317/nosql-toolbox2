export class Tree {
    static root: Tree;
    name: string;
    answer: string | null;
    info: string | null;
    children: Tree[];

    constructor(json: any, root: boolean = false) {
        if (root) {
            Tree.root = this;
        }
        this.name = json.name;
        this.answer = json.answer;
        this.info = json.info;
        this.children = json.children.map((child: any) => new Tree(child));
    }

    next(n: number): Tree | null {
        if (this.children.length <= n) {
            return null;
        }
        return this.children[n];
    }

    static findParent(node: Tree, target: Tree): Tree | null {
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
        return null;
    }

    back(): Tree | null {
        if (this == Tree.root) {
            return null; // Root node has no parent
        }
        return Tree.findParent(Tree.root, this);
    }
}
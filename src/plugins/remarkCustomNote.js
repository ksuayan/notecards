// src/plugins/remarkCustomNote.js

import { visit } from "unist-util-visit";

export default function remarkCustomNote() {
    return (tree) => {  
      visit(tree, "paragraph", (node) => {
        if (node.children[0]?.value?.startsWith(":::note")) {
          node.type = "html";
          node.value = `<div class="custom-note">${node.children[0].value.replace(":::note", "").trim()}</div>`;
          node.children = [];
        }
      });
    };
  }
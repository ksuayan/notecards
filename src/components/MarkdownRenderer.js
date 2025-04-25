// src/components/MarkdownRenderer.js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkHtml from "remark-html";
import remarkCustomNote from "@/plugins/remarkCustomNote";  // Custom plugin for custom notes
import matter from "gray-matter"; // Import gray-matter

export default async function MarkdownRenderer({ markdown }) {
  const { data: frontmatter, content } = matter(markdown);

  // Process the markdown string to HTML
  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkCustomNote) // Use custom plugin for custom notes
    .use(remarkHtml) // Convert markdown to HTML
    .use(remarkRehype) // Convert to rehype AST
    .use(rehypeStringify) // Stringify HTML
    .process(content);

  const htmlContent = processedContent.toString();

  return (
    <div>
      {/* Render frontmatter */}
      <div>
        <p><strong>Description:</strong> {frontmatter.description}</p>
        <p><strong>Date:</strong> {frontmatter.date.join(", ")}</p>
        <p><strong>Tags:</strong> {frontmatter.tags.join(", ")}</p>
      </div>

      {/* Render HTML content */}
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>  );
}
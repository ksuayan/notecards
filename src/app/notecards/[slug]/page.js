// src/app/md/[slug]/page.js
import clientPromise from "@/lib/mongodb";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function MarkdownPage({ params }) {
  const { slug } = await params;

  const client = await clientPromise;
  const db = client.db("site");
  const collection = db.collection("markdown");

  // Fetch the document by slug
  const document = await collection.findOne({ slug });

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div>
      <h1>{document.title}</h1>
      <p>{document.description}</p>
      <MarkdownRenderer markdown={document.content} />
    </div>
  );
}
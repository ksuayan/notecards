// src/app/example/page.js
import clientPromise from "@/lib/mongodb";

export default async function ExamplePage() {
  const client = await clientPromise;
  const db = client.db("site");
  const collection = db.collection("markdown");

  // Fetch a single document by its slug
  const document = await collection.findOne({ slug: "markdown-test-unit" });

  return (
    <div>
      <h1>{document.title}</h1>
      <p>{document.description}</p>
      <pre>{document.content}</pre>
    </div>
  );
}
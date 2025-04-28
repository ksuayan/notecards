// src/app/example/page.js
import clientPromise from "@/lib/mongodb";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function ExamplePage() {
  try {
    const { client, db } = await clientPromise;
    const collection = db.collection("markdown");

    // Fetch a single document by its slug
    const document = await collection.findOne({ slug: "markdown-test-unit" });

    if (!document) {
      return (
        <div className="min-h-screen bg-red-100 p-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl text-red-600 mb-4">Document not found</h1>
            <p className="text-gray-600">The requested document could not be found.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl text-gray-900 mb-4">{document.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{document.description}</p>
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer markdown={document.content} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching document:', error);
    return (
      <div className="min-h-screen bg-yellow-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl text-yellow-600 mb-4">Error loading document</h1>
          <p className="text-gray-600">There was an error loading the document. Please try again later.</p>
        </div>
      </div>
    );
  }
}
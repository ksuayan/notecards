// src/app/md/[slug]/page.js
import clientPromise from "@/lib/mongodb";
import ReactMarkdown from "react-markdown";

// Disable dynamicParams to prevent fallback pages
export const dynamicParams = false;

// Generate static paths at build time
export async function generateStaticParams() {
  try {
    const { db } = await clientPromise;
    const notecards = await db.collection('articles').find({}).toArray();
    
    return notecards.map((notecard) => ({
      slug: notecard.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// This tells Next.js to revalidate the page every hour
export const revalidate = 3600;

export default async function NotecardPage({ params }) {
  const { slug } = await params;
  let notecard = null;
  let error = null;

  try {
    const { db } = await clientPromise;
    notecard = await db.collection('articles').findOne({ slug });
    
    if (!notecard) {
      error = 'Notecard not found';
    }
  } catch (err) {
    console.error('Error fetching notecard:', err);
    error = 'Failed to load notecard';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl text-gray-900 mb-4">Error</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl text-gray-900 mb-4">{notecard.title}</h1>
          <div className="prose max-w-none">
            <ReactMarkdown>{notecard.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
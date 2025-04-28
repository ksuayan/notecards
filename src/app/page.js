import clientPromise from "@/lib/mongodb";
import Link from "next/link";

async function getNotecards() {
  try {
    const { db } = await clientPromise;
    const notecards = await db.collection('articles')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return notecards;
  } catch (error) {
    console.error('Error fetching notecards:', error);
    return [];
  }
}

export default async function Home() {
  const notecards = await getNotecards();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <h1 className="text-3xl mb-8">My Notecards</h1>
          
          {notecards.length === 0 ? (
            <p className="text-muted-foreground">No notecards found.</p>
          ) : (
            <ul className="space-y-4">
              {notecards.map((notecard) => (
                <li key={notecard._id}>
                  <Link 
                    href={`/notecards/${notecard.slug}`}
                    className="block p-4 hover:bg-accent rounded-lg transition-colors group"
                  >
                    <h2 className="text-xl text-foreground group-hover:underline">
                      {notecard.title}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

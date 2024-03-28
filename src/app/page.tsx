import LatestCollections from "@/components/LatestCollections";
import BiggestCollections from "@/components/BiggestCollections";

export default async function Home() {
  return (
    <main>
      <div className="mb-20">
        <LatestCollections />
      </div>
      <div>
        <BiggestCollections />
      </div>
    </main>
  );
}

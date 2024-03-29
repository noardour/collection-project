import LatestCollections from "@/components/LatestCollections";
import BiggestCollections from "@/components/BiggestCollections";

export const revalidate = 60;

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

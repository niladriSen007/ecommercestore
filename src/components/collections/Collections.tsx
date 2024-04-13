import { getCollections } from "@/lib/actions/action";
import Image from "next/image";
import { Button } from "../ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <>
      <section className="my-24 mx-60 relative overflow-x-hidden">
        <MoveLeft size={40} className="absolute top-2 right-16 text-blue-400" />
        <MoveRight size={40} className="absolute top-2 right-0 text-blue-400" />
        <p className="text-6xl text-center text-black mb-12">Our Collections</p>
        <section className="grid grid-cols-4  gap-16">
          {collections.length == 0 ? (
            <p>No collections available</p>
          ) : (
            collections.map((collection: any) => (
              <div
                key={collection.id}
                className="flex flex-col items-center justify-center relative"
              >
                <Image
                  className="w-96 h-96 object-cover rounded-lg"
                  src={collection?.image}
                  alt={collection.title}
                  width={2400}
                  height={2400}
                />
                <Button className="text-3xl px-6 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-500 absolute bottom-4 bg-white">
                  {collection.title}
                </Button>
              </div>
            ))
          )}
        </section>
      </section>
    </>
  );
};
export default Collections;

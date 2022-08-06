import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";
import { Suspense } from "react";

import ProductCard from "./ProductCard.server";

function CollectionsPreview() {
  const {
    data: { collections },
  } = useShopQuery({
    query: COLLECTIONS_PREVIEW_QUERY,
    cache: CacheLong(),
  });

  console.log(collections);

  return (
    <>
      <Suspense>
        <div className="w-fit space-y-10">
          {collections.nodes.map((collection, key) => {
            return (
              <div key={key} className="w-[25%]">
                <h1 className="text-3xl font-semibold">{collection.title}</h1>
                <div className="flex flex-row w-auto space-x-32">
                  {collection.products.nodes.map((product, key) => {
                    return <ProductCard handle={product.handle} key={key} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Suspense>
    </>
  );
}

export default CollectionsPreview;

const COLLECTIONS_PREVIEW_QUERY = gql`
  query {
    collections(first: 4) {
      nodes {
        title
        products(first: 3) {
          nodes {
            handle
          }
        }
      }
    }
  }
`;

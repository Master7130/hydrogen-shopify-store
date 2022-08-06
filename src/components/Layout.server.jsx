import { useShopQuery, CacheLong, gql, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";
import Nav from "./Nav.server";

function Layout({ children }) {
  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
  });

  return (
    <>
      <Suspense>
        <Seo
          type="defaultSeo"
          data={{
            title: shop.name,
            description: shop.description,
          }}
        />
      </Suspense>
      <Nav name={shop.name} />
      <main>
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
}

export default Layout;

const SHOP_QUERY = gql`
  query {
    shop {
      name
      description
    }
  }
`;

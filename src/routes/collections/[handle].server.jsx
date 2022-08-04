import {
  useShopQuery,
  CacheLong,
  gql,
  Link,
  Seo,
  useRouteParams,
} from "@shopify/hydrogen";
import { Suspense } from "react";

import Layout from "../../components/Layout.server";

function Collection() {
  const { handle } = useRouteParams();

  return(
    <Layout>
      {handle}
    </Layout>
  )
}

export default Collection;

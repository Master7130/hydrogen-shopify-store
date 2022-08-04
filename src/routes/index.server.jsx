import {
  useShopQuery,
  CacheLong,
  gql,
  Seo,
} from "@shopify/hydrogen";
import { Suspense } from "react";

import Layout from "../components/Layout.server";
import CollectionsPreview from "../components/CollectionsPreview";

export default function Home() {
  return (
    <Layout>
      <CollectionsPreview />
    </Layout>
  )
}


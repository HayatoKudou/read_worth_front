import Dashboard from "../components/dashboard";
import Layout from "../components/layout";
import type { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;

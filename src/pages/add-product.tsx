import React from "react";
import AddProductForm from "../components/product/add-product-form";
import Layout from "@components/layout/layout";
import Container from "@components/ui/container";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "../../next-i18next.config";

const AddProductPage = () => {
  return (
    <Container className="py-10">
      <h1 className="text-xl font-bold mb-6">Add Product</h1>
      <AddProductForm />
    </Container>
  );
};

AddProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ], i18nConfig as any)),
    },
  };
};

export default AddProductPage;

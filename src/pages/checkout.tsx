import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useForm, FormProvider } from "react-hook-form";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import Router from "next/router";
import { ROUTES } from "@utils/routes";

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}

export default function CheckoutPage() {
  const methods = useForm<CheckoutInputType>();
  const { mutate: updateUser, isPending } = useCheckoutMutation();

  function onSubmit(input: CheckoutInputType) {
    updateUser(input);
    Router.push(ROUTES.ORDER);
  }

  return (
    <>
      <PageHeader pageHeader="text-page-checkout" />
      <Container>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full"
            noValidate
          >
            <div className="checkout-page">
              <div className="checkout-page__form-section">
                <div className="checkout-page__form-card">
                  <CheckoutForm />
                </div>
              </div>
              <div className="checkout-page__summary-section">
                <div className="checkout-page__summary-card">
                  <CheckoutCard isPending={isPending} />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </Container>
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface CheckoutInputType {
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


async function checkout(input: CheckoutInputType) {
  // return http.post(API_ENDPOINTS.ChangeEmail, input);
  return input;
}
import { toast } from "@utils/toast";

export const useCheckoutMutation = () => {
  return useMutation({
    mutationFn: (input: CheckoutInputType) => {
      const promise = checkout(input);
      toast.promise(promise, {
        loading: "Processing payment and placing order...",
        success: "Order placed successfully! Thank you for your purchase.",
        error: "Checkout failed. Please verify payment details.",
      });
      return promise;
    },
    onSuccess: (data) => {
      console.log(data, "Checkout success response");
    },
    onError: (data) => {
      console.log(data, "Checkout error response");
    },
  });
};

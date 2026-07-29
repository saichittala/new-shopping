import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export interface SignUpInputType {
  sponsorId: string;
  entryLevel: string;
  name: string;
  password: string;
  confirmPassword: string;
  dob: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  phoneNumber: string;
  altPhoneNumber: string;
  email: string;
  permanentAddress: string;
  permanentAddressLine2?: string; // Optional second line for permanent address
  permanentCity: string;
  permanentState: string;
  permanentCountry: string;
  permanentPostalCode: string;
  currentAddress: string;
  currentAddressLine2: string;
  currentCity: string;
  currentState: string;
  currentCountry: string;
  currentPostalCode: string;
  sameAsPermanentAddress: boolean;
  identityProof: string;
  addressProof: string;
  panCard: string;
  bankPassbook: string;
  accHolderName: string;
  bankName: string;
  accNumber: string;
  ifscCode: string;
  bankBranch: string;
  business: string;
  gstNumber: string;
}
async function signUp(input: SignUpInputType) {
  // return http.post(API_ENDPOINTS.LOGIN, input);
  return {
    token: `${input.email}.${input.name}`.split("").reverse().join(""),
  };
}
import { toast } from "@utils/toast";

export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: SignUpInputType) => {
      const promise = signUp(input);
      toast.promise(promise, {
        loading: "Creating your account...",
        success: "Account created successfully! Welcome to ChawkBazar.",
        error: "Signup failed. Please verify your details.",
      });
      return promise;
    },
    onSuccess: (data) => {
      Cookies.set("auth_token", data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};

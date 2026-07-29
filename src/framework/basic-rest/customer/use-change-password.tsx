// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
}
async function changePassword(input: ChangePasswordInputType) {
  // return http.post(API_ENDPOINTS.ChangePassword, input);
  return input;
}
import { toast } from "@utils/toast";

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (input: ChangePasswordInputType) => {
      const promise = changePassword(input);
      toast.promise(promise, {
        loading: "Changing password...",
        success: "Password changed successfully!",
        error: "Failed to change password. Please verify details.",
      });
      return promise;
    },
    onSuccess: (data) => {
      console.log(data, "ChangePassword success response");
    },
    onError: (data) => {
      console.log(data, "ChangePassword error response");
    },
  });
};

// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}
async function updateUser(input: UpdateUserType) {
  // return http.post(API_ENDPOINTS.ChangeEmail, input);
  return input;
}
import { toast } from "@utils/toast";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (input: UpdateUserType) => {
      const promise = updateUser(input);
      toast.promise(promise, {
        loading: "Updating profile...",
        success: "Profile updated successfully!",
        error: "Failed to update profile. Please try again.",
      });
      return promise;
    },
    onSuccess: (data) => {
      console.log(data, "UpdateUser success response");
    },
    onError: (data) => {
      console.log(data, "UpdateUser error response");
    },
  });
};

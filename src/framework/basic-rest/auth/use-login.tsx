import { useUI } from '@contexts/ui.context';
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  // return http.post(API_ENDPOINTS.LOGIN, input);
  return {
    token: `${input.email}.${input.remember_me}`.split('').reverse().join(''),
  };
}

import { toast } from '@utils/toast';

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: LoginInputType) => {
      const promise = login(input);
      toast.promise(promise, {
        loading: 'Signing in to your account...',
        success: 'Welcome back! Login successful.',
        error: 'Login failed. Please check your credentials.',
      });
      return promise;
    },
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};

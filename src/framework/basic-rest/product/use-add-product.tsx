import { useUI } from "@contexts/ui.context";
import { useMutation } from "@tanstack/react-query";

export interface AddProductInputType {
  category: string[];
  productName: string;
  productImage: File;
  shortDescription: string;
  productOverview: string;
  featuresBenefits: string;
  whatsInIt: string;
  howToUse: string;
  price: number;
  gstRate: number;
  totalAmount: number;
  pv: number;
  pvr: number;
  productVolumePrice: number;
}

async function addProduct(input: AddProductInputType) {
  // Replace with actual API call
  return {
    success: true,
    message: "Product added successfully",
  };
}

export const useAddProductMutation = () => {
  useUI();
  return useMutation({
    mutationFn: (input: AddProductInputType) => addProduct(input),
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
};

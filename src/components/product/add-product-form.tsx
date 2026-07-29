import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import {
  useAddProductMutation,
  AddProductInputType,
} from "@framework/product/use-add-product";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const AddProductForm: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: addProduct, isPending } = useAddProductMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddProductInputType>();

  const price = watch("price") || 0;
  const pv = watch("pv") || 0;

  const calculateTotal = () => {
    const gstRate = 18;
    const gstAmount = (price * gstRate) / 100;
    const total = price + gstAmount;
    setValue("totalAmount", parseFloat(total.toFixed(2)));
  };

  const calculatePVR = () => {
    if (pv > 0) {
      const pvr = price / pv;
      setValue("pvr", parseFloat(pvr.toFixed(2)));
      const productVolumePrice = pv * pvr;
      setValue("productVolumePrice", parseFloat(productVolumePrice.toFixed(2)));
    }
  };

  const onSubmit = (data: AddProductInputType) => {
    addProduct(data);
  };

  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <h2 className="text-center text-lg font-semibold mb-6">
        {t("Add Product")}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("Select Category")}
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            multiple
          >
            <option value="Bone Health">Bone Health</option>
            <option value="Meal Replacements & Functional Nutrition">
              Meal Replacements & Functional Nutrition
            </option>
            <option value="Women's Health & Wellness">
              {"Women's Health & Wellness"}
            </option>
            <option value="Men's Health & Performance">
              {"Men's Health & Performance"}
            </option>
            <option value="Sports Nutrition & Performance">
              Sports Nutrition & Performance
            </option>
            <option value="Weight Management & Metabolism Boosters">
              Weight Management & Metabolism Boosters
            </option>
            <option value="Heart & Diabetes Care">Heart & Diabetes Care</option>
            <option value="Anti-Aging & Longevity">
              Anti-Aging & Longevity
            </option>
            <option value="Kids’ Nutrition & Growth Support">
              {"Kids’ Nutrition & Growth Support"}
            </option>
            <option value="Personal Care & Wellness">
              Personal Care & Wellness
            </option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {t("Category is required")}
            </p>
          )}
        </div>

        <Input
          labelKey="Name"
          placeholderKey="Enter Product Name"
          type="text"
          {...register("productName", { required: true })}
          errorKey={errors.productName?.message}
        />
        <Input
          labelKey="Product Image"
          placeholderKey="Upload product image"
          type="file"
          {...register("productImage", { required: true })}
          errorKey={errors.productImage?.message}
        />
        <Input
          labelKey="Short Description"
          placeholderKey="Enter short description"
          type="text"
          {...register("shortDescription", { required: true })}
          errorKey={errors.shortDescription?.message}
        />
        <Input
          labelKey="Product Overview"
          placeholderKey="Enter product overview"
          type="text"
          {...register("productOverview", { required: true })}
          errorKey={errors.productOverview?.message}
        />
        <Input
          labelKey="Features & Benefits"
          placeholderKey="Enter features and benefits"
          type="text"
          {...register("featuresBenefits", { required: true })}
          errorKey={errors.featuresBenefits?.message}
        />
        <Input
          labelKey="What's in it?"
          placeholderKey="Enter what's in it"
          type="text"
          {...register("whatsInIt", { required: true })}
          errorKey={errors.whatsInIt?.message}
        />
        <Input
          labelKey="How to Use"
          placeholderKey="Enter how to use"
          type="text"
          {...register("howToUse", { required: true })}
          errorKey={errors.howToUse?.message}
        />
        <Input
          labelKey="Price (Excl GST)"
          placeholderKey="Enter price excluding GST"
          type="number"
          {...register("price", {
            required: true,
            onChange: () => {
              calculateTotal();
              calculatePVR();
            },
          })}
          errorKey={errors.price?.message}
        />
        <Input
          labelKey="GST Rate (%)"
          placeholderKey="Enter GST rate"
          type="number"
          name="gstRate"
          value={18}
          disabled
        />
        <Input
          labelKey="Total Amount (Incl GST)"
          placeholderKey="Enter total amount including GST"
          type="number"
          {...register("totalAmount")}
          disabled
        />
        <Input
          labelKey="PV (Purchase Volume)"
          placeholderKey="Enter purchase volume"
          type="number"
          {...register("pv", {
            required: true,
            onChange: () => calculatePVR(),
          })}
          errorKey={errors.pv?.message}
        />
        <Input
          labelKey="PVR (Purchase Volume Price)"
          placeholderKey="Enter purchase volume price"
          type="number"
          {...register("pvr")}
          disabled
        />
        <Input
          labelKey="Product Volume Price"
          placeholderKey="Enter product volume price"
          type="number"
          {...register("productVolumePrice")}
          disabled
        />
        <Button
          type="submit"
          loading={isPending}
          disabled={isPending}
          className="h-11 md:h-12 w-full mt-2"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;

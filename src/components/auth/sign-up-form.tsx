import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { RadioBox } from "@components/ui/radiobox";
import { CheckBox } from "@components/ui/checkbox";

const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: signUp, isPending } = useSignUpMutation();
  const { setModalView, openModal, closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  function onSubmit(signUpInputType: SignUpInputType) {
    signUp(signUpInputType);
  }

  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {t("common:registration-helper")}{" "}
          <Link
            href={ROUTES.TERMS}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {t("common:text-terms")}
          </Link>{" "}
          &amp;{" "}
          <Link
            href={ROUTES.POLICY}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {t("common:text-policy")}
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-4">
          <span className="mt-2 text-md text-heading font-semibold block pb-1">
            {t("Sponsor ID Verification")}
          </span>
          <Input
            labelKey="Sponsor ID"
            placeholderKey="Enter Sponsor ID"
            type="text"
            {...register("sponsorId", { required: true })}
            errorKey={errors.sponsorId?.message}
          />
          <p className="text-sm text-body mt-2">
            {t("Validate Sponsor ID before proceeding to registration.")}
          </p>

          <span className="mt-2 text-md text-heading font-semibold block pb-1">
            {t("Select Entry Levels")}
          </span>
          <RadioBox
            labelKey="Associate - Free Registration"
            {...register("entryLevel", { required: true })}
            value="associate"
          />
          <RadioBox
            labelKey="Wellness Associate - 250V"
            {...register("entryLevel", { required: true })}
            value="wellness-associate"
          />
          <RadioBox
            labelKey="Entrepreneur - 750V"
            {...register("entryLevel", { required: true })}
            value="entrepreneur"
          />

          <span className="mt-2 text-md text-heading font-semibold block pb-1">
            {t("Personal Information")}
          </span>
          <Input
            labelKey="Name"
            placeholderKey="Enter Full Name"
            type="text"
            {...register("name", { required: true })}
            errorKey={errors.name?.message}
          />
          <Input
            labelKey="Date of Birth"
            placeholderKey="Enter Date of Birth"
            type="date"
            {...register("dob", { required: true })}
            errorKey={errors.dob?.message}
          />
          <div className="relative flex flex-col">
            <span className="mt-2 text-sm text-heading font-semibold block pb-1">
              {t("common:text-gender")}
            </span>
            <div className="mt-2 flex items-center gap-x-6">
              <RadioBox labelKey="Male" {...register("gender")} value="male" />
              <RadioBox
                labelKey="Female"
                {...register("gender")}
                value="female"
              />
              <RadioBox
                labelKey="Other"
                {...register("gender")}
                value="other"
              />
            </div>
          </div>
          <Input
            labelKey="Nationality"
            placeholderKey="Enter Nationality"
            type="text"
            {...register("nationality", { required: true })}
            errorKey={errors.nationality?.message}
          />
          <div className="relative flex flex-col">
            <span className="mt-2 text-sm text-heading font-semibold block pb-1">
              {t("Marital Status")}
            </span>
            <div className="mt-2 flex items-center gap-x-6">
              <RadioBox
                labelKey="Single"
                {...register("maritalStatus", { required: true })}
                value="single"
              />
              <RadioBox
                labelKey="Married"
                {...register("maritalStatus", { required: true })}
                value="married"
              />
              <RadioBox
                labelKey="Other"
                {...register("maritalStatus", { required: true })}
                value="other"
              />
            </div>
          </div>

          <span className="mt-2 text-md text-heading font-semibold block pb-1">
            {t("Contact Details")}
          </span>
          <Input
            labelKey="Phone Number"
            placeholderKey="Enter Phone Number"
            type="text"
            {...register("phoneNumber", { required: true })}
            errorKey={errors.phoneNumber?.message}
          />
          <Input
            labelKey="Alternate Phone Number"
            placeholderKey="Enter Alternate Phone Number"
            type="text"
            {...register("altPhoneNumber")}
          />
          <Input
            labelKey="Email Address"
            placeholderKey="Enter Email Address"
            type="email"
            {...register("email", { required: true })}
            errorKey={errors.email?.message}
          />
          <PasswordInput
            labelKey="Password"
            {...register("password", { required: true })}
            errorKey={errors.password?.message}
          />
          <PasswordInput
            labelKey="Confirm Password"
            {...register("confirmPassword", { required: true })}
            errorKey={errors.confirmPassword?.message}
          />

          <span className="mt-2 text-md text-heading font-semibold block pb-1">
            {t("Permanent Address")}
          </span>
          <Input
            labelKey="Address Line 1"
            placeholderKey="Enter Address Line 1"
            type="text"
            {...register("permanentAddress", { required: true })}
            errorKey={errors.permanentAddress?.message}
          />
          <Input
            labelKey="Address Line 2"
            placeholderKey="Enter Address Line 2"
            type="text"
            {...register("permanentAddressLine2")}
          />
          <Input
            labelKey="City"
            placeholderKey="Enter City"
            type="text"
            {...register("permanentCity", { required: true })}
            errorKey={errors.permanentCity?.message}
          />
          <Input
            labelKey="State"
            placeholderKey="Enter State"
            type="text"
            {...register("permanentState", { required: true })}
            errorKey={errors.permanentState?.message}
          />
          <Input
            labelKey="Country"
            placeholderKey="Enter Country"
            type="text"
            {...register("permanentCountry", { required: true })}
            errorKey={errors.permanentCountry?.message}
          />
          <Input
            labelKey="Zip Code"
            placeholderKey="Enter Zip Code"
            type="text"
            {...register("permanentPostalCode", { required: true })}
            errorKey={errors.permanentPostalCode?.message}
          />

          <CheckBox
            {...register("sameAsPermanentAddress")}
            labelKey="Same as Permanent Address"
          />

          <span className="mt-2 text-md text-heading font-semibold block pb-1">
            {t("Current Address")}
          </span>
          <Input
            labelKey="Address Line 1"
            placeholderKey="Enter Address Line 1"
            type="text"
            {...register("currentAddress")}
          />
          <Input
            labelKey="Address Line 2"
            placeholderKey="Enter Address Line 2"
            type="text"
            {...register("currentAddressLine2")}
          />
          <Input
            labelKey="City"
            placeholderKey="Enter City"
            type="text"
            {...register("currentCity")}
          />
          <Input
            labelKey="State"
            placeholderKey="Enter State"
            type="text"
            {...register("currentState")}
          />
          <Input
            labelKey="Country"
            placeholderKey="Enter Country"
            type="text"
            {...register("currentCountry")}
          />
          <Input
            labelKey="Zip Code"
            placeholderKey="Enter Zip Code"
            type="text"
            {...register("currentPostalCode")}
          />

          <span className="mt-2 text-md text-heading font-semibold block pb-1">
            {t("Bank Details")}
          </span>
          <Input
            labelKey="Identity Proof"
            placeholderKey="Upload Identity Proof"
            type="file"
            {...register("identityProof", { required: true })}
          />
          <Input
            labelKey="PAN Card"
            placeholderKey="Upload PAN Card"
            type="file"
            {...register("panCard", { required: true })}
          />
          <Input
            labelKey="Bank Passbook / Cancelled Cheque"
            placeholderKey="Upload Bank Passbook or Cancelled Cheque"
            type="file"
            {...register("bankPassbook", { required: true })}
          />
          <Input
            labelKey="Address Proof"
            placeholderKey="Upload Address Proof"
            type="file"
            {...register("addressProof", { required: true })}
          />
          <Input
            labelKey="Account Holder Name"
            placeholderKey="Enter Account Holder Name"
            type="text"
            {...register("accHolderName", { required: true })}
            errorKey={errors.accHolderName?.message}
          />
          <Input
            labelKey="Bank Name"
            placeholderKey="Enter Bank Name"
            type="text"
            {...register("bankName", { required: true })}
            errorKey={errors.bankName?.message}
          />
          <Input
            labelKey="Account Number"
            placeholderKey="Enter Account Number"
            type="text"
            {...register("accNumber", { required: true })}
            errorKey={errors.accNumber?.message}
          />
          <Input
            labelKey="IFSC Code"
            placeholderKey="Enter IFSC Code"
            type="text"
            {...register("ifscCode", { required: true })}
            errorKey={errors.ifscCode?.message}
          />
          <Input
            labelKey="Branch Name & Address"
            placeholderKey="Enter Branch Name & Address"
            type="text"
            {...register("bankBranch", { required: true })}
            errorKey={errors.bankBranch?.message}
          />

          <div className="relative flex flex-col">
            <span className="mt-2 text-sm text-heading font-semibold block pb-1">
              {t("Business Type")}
            </span>
            <div className="mt-2 flex items-center gap-x-6">
              <RadioBox
                labelKey="Online"
                {...register("business", { required: true })}
                value="single"
              />
              <RadioBox
                labelKey="Offline"
                {...register("business", { required: true })}
                value="married"
              />
              <RadioBox
                labelKey="Both"
                {...register("business", { required: true })}
                value="other"
              />
            </div>
          </div>
          <Input
            labelKey="GST Number (If applicable)"
            placeholderKey="Enter GST Number"
            type="text"
            {...register("gstNumber")}
          />

          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
            className="h-11 md:h-12 w-full mt-2"
          >
            {t("common:text-register")}
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-white">
          {t("common:text-or")}
        </span>
      </div>

      <Button
        type="submit"
        loading={isPending}
        disabled={isPending}
        color="outline"
        size="md"
        className="w-full mt-2.5"
      >
        <ImFacebook2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5 text-gray-700" />
        {t("common:text-login-with-facebook")}
      </Button>
      <Button
        type="submit"
        loading={isPending}
        disabled={isPending}
        color="outline"
        size="md"
        className="w-full mt-2.5"
      >
        <ImGoogle2 className="text-sm sm:text-base ltr:mr-1.5 rtl:ml-1.5 text-gray-700" />
        {t("common:text-login-with-google")}
      </Button>
      <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        {t("common:text-have-account")}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t("common:text-login")}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;

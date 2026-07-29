import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
	useChangePasswordMutation,
	ChangePasswordInputType,
} from "@framework/customer/use-change-password";
import { useTranslation } from "next-i18next";

const defaultValues = {
	oldPassword: "",
	newPassword: "",
};

const ChangePassword: React.FC = () => {
	const { mutate: changePassword, isPending } = useChangePasswordMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ChangePasswordInputType>({
		defaultValues,
	});
	function onSubmit(input: ChangePasswordInputType) {
		changePassword(input);
	}
	const { t } = useTranslation();
	return (
		<>
			<h2 className="account-password__title">
				{t("common:text-change-password")}
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className="account-password"
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="account-password__form"
				>
					<PasswordInput
						labelKey="forms:label-old-password"
						errorKey={errors.oldPassword?.message}
						{...register("oldPassword", {
							required: "forms:password-old-required",
						})}
					/>
					<PasswordInput
						labelKey="forms:label-new-password"
						errorKey={errors.newPassword?.message}
						{...register("newPassword", {
							required: "forms:label-new-password",
						})}
					/>

					<div className="account-password__submit-wrap">
						<Button
							type="submit"
							loading={isPending}
							disabled={isPending}
						>
							{t("common:text-change-password")}
						</Button>
					</div>
				</form>
			</motion.div>
		</>
	);
};

export default ChangePassword;

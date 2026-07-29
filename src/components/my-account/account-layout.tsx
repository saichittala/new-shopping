import PageHeader from "@components/ui/page-header";
import Container from "@components/ui/container";
import AccountNav from "@components/my-account/account-nav";

const AccountLayout: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<PageHeader pageHeader="text-page-my-account" />
			<Container>
				<div className="account-layout">
					<div className="account-layout__container">
						<AccountNav />
						<div className="account-layout__content">{children}</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default AccountLayout;

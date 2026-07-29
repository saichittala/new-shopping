import React from 'react';
import Logo from '@components/ui/logo';
import { FiShield } from 'react-icons/fi';
import cn from 'classnames';

interface CheckoutHeaderProps {
  activeStep: 'bag' | 'address' | 'payment';
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ activeStep }) => {
  return (
    <header className="checkout-header">
      <div className="checkout-header__inner">
        {/* Logo on the left */}
        <div className="checkout-header__logo">
          <Logo />
        </div>

        {/* Stepper in the center */}
        <div className="checkout-header__stepper">
          <span className={cn("checkout-header__step", { "checkout-header__step--active": activeStep === 'bag' })}>
            BAG
          </span>
          <span className="checkout-header__divider"></span>
          <span className={cn("checkout-header__step", { "checkout-header__step--active": activeStep === 'address' })}>
            ADDRESS
          </span>
          <span className="checkout-header__divider"></span>
          <span className={cn("checkout-header__step", { "checkout-header__step--active": activeStep === 'payment' })}>
            PAYMENT
          </span>
        </div>

        {/* 100% Secure badge on the right */}
        <div className="checkout-header__security">
          <FiShield className="checkout-header__security-icon" />
          <span className="checkout-header__security-text">100% SECURE</span>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;

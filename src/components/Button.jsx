import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  rounded = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  // Base button styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500",
    info: "bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500",
    light: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300",
    dark: "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
    ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
  };

  // Size styles
  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  // Additional utility styles
  const utilityStyles = [
    fullWidth ? "w-full" : "",
    rounded ? "rounded-full" : "rounded-lg",
    className
  ].filter(Boolean).join(" ");

  // Combine all styles
  const buttonStyles = [
    baseStyles,
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.medium,
    utilityStyles
  ].join(" ");

  // Handle loading state
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  // Render icon with proper spacing
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconElement = (
      <FontAwesomeIcon 
        icon={icon} 
        className={size === "small" ? "w-4 h-4" : "w-5 h-5"}
      />
    );

    if (iconPosition === "left") {
      return <span className="mr-2">{iconElement}</span>;
    } else {
      return <span className="ml-2">{iconElement}</span>;
    }
  };

  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {!loading && iconPosition === "left" && renderIcon()}
      
      <span>{children}</span>
      
      {!loading && iconPosition === "right" && renderIcon()}
    </button>
  );
};

// Usage examples component
export const ButtonExamples = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap items-end gap-4">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button variant="primary" icon="heart" iconPosition="left">
            With Icon
          </Button>
          <Button variant="outline" icon="star" iconPosition="right">
            Icon Right
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Special Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button fullWidth>Full Width</Button>
          <Button rounded>Rounded</Button>
          <Button variant="success" className="shadow-lg">With Shadow</Button>
        </div>
      </div>
    </div>
  );
};

export default Button;
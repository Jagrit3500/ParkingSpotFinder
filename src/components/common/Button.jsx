// components/common/Button.jsx
const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'medium',
    fullWidth = false,
    disabled = false,
    type = 'button'
  }) => {
    const baseClasses = "rounded-md font-medium transition-colors";
    
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      success: "bg-green-600 text-white hover:bg-green-700",
      danger: "bg-red-600 text-white hover:bg-red-700"
    };
    
    const sizeClasses = {
      small: "px-3 py-1 text-sm",
      medium: "px-4 py-2",
      large: "px-6 py-3 text-lg"
    };
    
    const widthClass = fullWidth ? "w-full" : "";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass}`}
      >
        {children}
      </button>
    );
  };

export default Button;

  
const Button = (props) => {

  const {
    buttonName,
    bgColor,
    hoverBgColor,
    textColor,
    classname
  } = props;

  const defaultBg = "bg-green-600";
  const defaultHover = "hover:bg-green-700";
  const defaultText = "text-white";

  const className = `
    mt-6 px-8 py-3 sm:py-4 text-lg sm:text-[16px]
    rounded-md drop-shadow-md cursor-pointer
    ${bgColor || defaultBg}
    ${hoverBgColor || defaultHover}
    ${textColor || defaultText}
    ${classname || ""}
  `;

  return (
    <button className={className}>
      {buttonName}
    </button>
  );
};

export default Button;

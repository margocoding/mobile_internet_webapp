interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={`shadow-[#D6E8F7] rounded-2xl shadow-2xl ${className || ""} p-5 bg-white`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

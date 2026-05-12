interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={`bg-white shadow-[#D6E8F7] rounded-2xl shadow-2xl p-4 ${className || ""}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

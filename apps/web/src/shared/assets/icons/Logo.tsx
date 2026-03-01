interface Props {
  size?: number;
  className?: string;
}

const Logo = ({ size = 16, className = "" }: Props) => {
  return (
    <h1
      className={`${className} font-dongle leading-15`}
      style={{ fontSize: size }}>
      딴짓
    </h1>
  );
};

export default Logo;

import React from "react";
import cn from "classnames";

import "./styles.scss";

type Color = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
};
const Button: React.FC<ButtonProps> = ({
  className,
  color = "primary",
  ...props
}) => {
  return (
    <button className={cn("btn", `btn__${color}`, className)} {...props} />
  );
};

export default Button;

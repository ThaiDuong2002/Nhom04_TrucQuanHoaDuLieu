import { ReactNode } from "react";

const DomainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default DomainLayout;

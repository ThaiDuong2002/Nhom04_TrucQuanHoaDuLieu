import { ReactNode } from "react";

const DomainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div>
      <h1>Main Layout</h1>
      {children}
    </div>
  );
};

export default DomainLayout;

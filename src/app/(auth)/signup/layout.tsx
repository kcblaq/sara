import { Metadata } from "next";

export const metadata: Metadata = {
    title: ` Webmaxi | Signup`,
    description: "Webmaxi Signup page",
  };
  
  export default function SignupLayout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
       
        <body className={``}>
          <div>
          {children}
          </div>
          </body>
      </html>
    );
  }
  
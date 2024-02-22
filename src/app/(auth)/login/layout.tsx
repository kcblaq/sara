import { Metadata } from "next";

export const metadata: Metadata = {
    title: ` Webmaxi | Login`,
    description: "Webmaxi Login",
  };
  
  export default function LoginLayout({
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
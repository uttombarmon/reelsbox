import Sidebar from "../components/home/FirstSidebar/Sidebar";
import FileHandleProvider from "../components/Providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between overflow-hidden h-screen items-center">
      <div className=" hidden md:flex w-1/12 xl:w-2/12 h-full overflow-x-hidden justify-between">
        {/* <Navbar /> */}
        <Sidebar />
      </div>
      <div className=" w-full">
        <FileHandleProvider>{children}</FileHandleProvider>
      </div>
    </div>
  );
}

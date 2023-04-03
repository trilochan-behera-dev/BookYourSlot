import "../styles/globals.css";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
// import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  // const [loginData, setLoginData] = useState(null);

  // useEffect(() => {
  //   token = localStorage.getItem("token");
  //   const data = !!token ? JSON.parse(token) : undefined;
  //   setLoginData(data);
  // }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="fixed h-screen w-48 shadow-md">
          <SideBar />
        </div>
        <div className="flex flex-col ml-48 w-11/12">
          <div className="sticky h-[7vh] shadow-md">
            <Header />
          </div>
          <div className="h-[92vh] overflow-auto shadow-md">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyApp;

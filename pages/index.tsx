import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader_multiformatreader";

const Home = () => {
  const [data, setData] = useState("No result");
  const [facingMode, setFacing] = useState<string>("");

  const handleSwitchCamera = () => {
    localStorage.setItem(
      "facingMode",
      localStorage.getItem("facingMode") == `user` ? `environment` : `user`
    );
    location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("facingMode") == null) {
      localStorage.setItem("facingMode", "environment");
    } else {
      setFacing(localStorage.getItem("facingMode") ?? "environment");
    }
  }, []);

  return (
    <>
      <div className="flex justify-center min-h-screen items-center place-items-center ">
        <div className="w-full md:w-1/2 m-auto p-2">
          <QrReader
            constraints={{
              facingMode: facingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            }}
            onResult={(result: any, error) => {
              if (result) {
                setData(result.text);
              }

              if (error) {
                console.info(error);
              }
            }}
            containerStyle={{ width: "100%" }}
            videoContainerStyle={{ width: "100%" }}
            className="rounded-lg overflow-hidden"
          />
          
        </div>
        <p className="absolute bg-black rounded-lg p-3 md:top-5 top-[20%]">
            {data}
          </p>
          <p className="absolute bg-black rounded-lg p-3 md:bottom-5 bottom-[20%]">
            <button onClick={() => handleSwitchCamera()}>
              Switch {facingMode}
            </button>
          </p>
      </div>
    </>
  );
};

export default Home;

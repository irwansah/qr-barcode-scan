import React, { useState } from "react";
import { QrReader } from "react-qr-reader_multiformatreader";

const Home = () => {
  const [data, setData] = useState("No result");
  const [facingMode, setFacingMode] = useState("environment");

  const handleSwitchCamera = () => {
    setFacingMode(facingMode == `user` ? `environment` : `user`);
  };

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
          <p className="absolute bg-black rounded-lg p-3 md:top-5 top-[20%] left-5">
            {data}
          </p>
          <p className="absolute bg-black rounded-lg p-3 md:top-5 top-[20%] right-5">
            <button onClick={() => handleSwitchCamera()}>
              Switch {facingMode}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

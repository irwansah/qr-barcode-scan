import React, { useState } from "react";
import { QrReader } from "react-qr-reader_multiformatreader";

const Home = () => {
  const [data, setData] = useState("No result");
  const [facingMode, setFacingMode] = useState("user");

  const handleSwitchCamera = () => {
    setFacingMode(facingMode == `user` ? `environment` : `user`);
  };

  return (
    <>
      <div className="flex justify-center w-full md:w-1/2 m-auto">
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
        />
        <p className="absolute z-10 bg-black rounded-lg p-3 top-5">{data}</p>
        <p className="absolute z-10 bg-black rounded-lg p-3 top-5 right-5">
          <button onClick={() => handleSwitchCamera}>Switch</button>
        </p>
      </div>
    </>
  );
};

export default Home;

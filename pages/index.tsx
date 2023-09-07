import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader_multiformatreader";

const Home = () => {
  const [data, setData] = useState("No result");
  const [mirror, setMirror] = useState<string>("");

  function handleFace(): void {
    localStorage.setItem(
      "facing",
      localStorage.getItem("facing") == "environtment" ? "user" : "environtment"
    );
    location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem("facing") == null) {
      localStorage.setItem("facing", "environtment");
    }
  }, []);

  function handleMirror(): void {
    setMirror(mirror == "environtment" ? "user" : "environtment");
  }

  return (
    <>
      <div className="flex justify-center min-h-screen items-center place-items-center ">
        <div className="w-full md:w-1/2 m-auto p-2">
          <p className="relative bg-black rounded-lg p-3 text-center border w-full mb-3">
            {data}
          </p>
          {typeof localStorage !== "undefined" &&
          localStorage.getItem("facing") == "environtment" ? (
            <QrReader
              constraints={{
                facingMode: mirror??"environtment",
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
          ) : (
            <QrReader
              constraints={{
                facingMode: mirror??"user",
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
          )}
          <p className="relative flex gap-2 justify-center bg-black rounded-lg p-3 text-center w-full mb-3">
            <button
              onClick={() => handleFace()}
              className="border p-2 rounded-lg"
            >
              Switch
            </button>
            <button
              onClick={() => handleMirror()}
              className="border p-2 rounded-lg"
            >
              Mirror
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import {
  CONTRACT_ADDRESS,
  Cattestation,
  CattestationABI,
} from "./components/Cattestation";
import { Providers } from "./components/Providers";
import { Address, useContractRead } from "wagmi";
import { ConnectKitButton } from "connectkit";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/:cat" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

function Page() {
  const { cat } = useParams();
  const { data } = useContractRead({
    abi: CattestationABI,
    address: CONTRACT_ADDRESS,
    functionName: "catadatas",
    args: [cat as Address],
    enabled: !!cat,
  });
  return (
    <div className="max-w-sm w-full mx-auto space-y-4 py-4">
      <div className="bg-primary p-1 rounded-md flex items-center justify-center">
        <ConnectButton />
      </div>

      <img
        src={data?.[2].replace("ipfs://", "https://ipfs.io/ipfs/")}
        className="aspect-square w-full overflow-hidden rounded-xl shadow-md"
      />
      <div className="font-[ComicSansMS,ComicSans,sans] text-center space-y-2">
        <p className="text-xs">You've met:</p>
        <h2 className="text-4xl font-bold">{data?.[0]}</h2>
        <p>{data?.[1]}</p>
      </div>
      <Cattestation />
    </div>
  );
}

export default App;

function ConnectButton() {
  return <ConnectKitButton />;
}

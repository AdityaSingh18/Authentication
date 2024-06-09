import { Inter } from "next/font/google";
import Login from "./Login/index";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
     <Login/>
    </>
  );
}

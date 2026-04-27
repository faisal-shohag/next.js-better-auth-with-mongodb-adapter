import User from "@/components/user-client";
import UserServer from "@/components/user-server";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center  flex-col  min-h-screen">
      <div className="flex  gap-5">
        <div className="border shadow-xl underline p-5">
          <Link href={"/protected"}>Protected Route</Link>
        </div>
        <div className="border shadow-xl underline p-5">
          <Link href={"/unprotected"}>UnProtected Route</Link>
        </div>
      </div>

      <div className="text-center">
        <User />
      </div>
      <UserServer />
    </div>
  );
}

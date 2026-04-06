import User from "@/components/user-client";
import UserServer from "@/components/user-server";

export default function Home() {
  return (
    <div className="flex justify-center items-center  flex-col  min-h-screen">
      <div className="text-center">
        <User />
      </div>
      <UserServer />
    </div>
  );
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const UserServer = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    return (
        <div className="flex flex-col items-center mt-10 ">
            <h1>User from Server Component</h1>
               {user ? (
        <>
          <h1 className="text-xl font-bold">User Info</h1>
          <img referrerPolicy="no-referrer" src={user.image} alt={user.name} width={100} />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <div className="flex items-center gap-5">
          <Link href={"/auth/signin"}>
            <button className="bg-linear-to-r from-pink-500 to-red-500 rounded-lg shadow-2xl px-4 py-2 mt-5 hover:from-red-500 hover:to-pink-500">
              SignIn
            </button>
          </Link>
          <Link href={"/auth/signup"}>
            <button className="bg-linear-to-r from-pink-500 to-red-500 rounded-lg shadow-2xl px-4 py-2 mt-5 hover:from-red-500 hover:to-pink-500">
              SignUp
            </button>
          </Link>
        </div>
      )}
        </div>
    );
};

export default UserServer;
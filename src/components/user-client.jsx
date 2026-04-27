"use client";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

const User = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();

  if (isPending) {
    return <div>User loading...</div>;
  }

  if (error) {
    return <div>Error loading user: {error.message}</div>;
  }

  const user = session?.user;
  return (
    <div className="flex flex-col items-center">
      {user ? (
        <>
          <h1 className="text-xl font-bold">User Info</h1>
          <div className="h-20 w-20 rounded-full overflow-hidden">
            <img referrerPolicy="no-referrer" src={user.image} alt={user.name} width={100} />
          </div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

          <button
            onClick={() => signOut()}
            className="bg-linear-to-r from-pink-500 to-red-500 rounded-lg shadow-2xl px-4 py-2 mt-5 hover:from-red-500 hover:to-pink-500"
          >
            SignOut
          </button>
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

export default User;

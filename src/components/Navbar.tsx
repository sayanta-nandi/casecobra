import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  return (
    <nav className="sticky z-10 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/60 backdrop-blur-md transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 font-semibold text-2xl">
            case<span className="text-green-600">cobra</span>
          </Link>
          <div className="flex gap-3">
            {isAdmin ? (
              <>
                <Link
                  href="api/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "text-base",
                    variant: "ghost",
                  })}
                >
                  Dashboard✨
                </Link>
              </>
            ) : null}
            {user ? (
              <>
                <Link
                  href="api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    className: "text-base",
                    variant: "ghost",
                  })}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    className: "text-base",
                    variant: "ghost",
                  })}
                >
                  Sign Up
                </Link>
                <Link
                  href="api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    className: "text-base",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>
              </>
            )}
            <div className="h-8 w-px bg-slate-300 hidden sm:block" />
            <Link
              href="/"
              className={buttonVariants({
                size: "sm",
                className: "text-base hidden sm:flex",
              })}
            >
              Create Case
              <ArrowRight />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

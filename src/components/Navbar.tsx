import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/60 backdrop-blur-md transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 font-semibold text-2xl">
            case<span className="text-green-600">cobra</span>
          </Link>
          <div className="flex gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex gap-2 items-center cursor-pointer">
                    {user.picture && (
                      <div className="relative size-8 rounded-full overflow-hidden">
                        <Image alt="user image" src={user.picture} fill />
                      </div>
                    )}
                    <p>{user.given_name}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isAdmin && (
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <Link href="/order">
                    <DropdownMenuItem className="cursor-pointer">
                      Your orders
                    </DropdownMenuItem>
                  </Link>
                  <LogoutLink>
                    <DropdownMenuItem className="cursor-pointer">
                      Logout
                    </DropdownMenuItem>
                  </LogoutLink>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <RegisterLink>
                  <Button variant="secondary">Sign In</Button>
                </RegisterLink>
                <LoginLink>
                  <Button variant="secondary">Log In</Button>
                </LoginLink>
              </>
            )}

            <div className="w-px bg-gray-300 mx-2 hidden sm:block" />
            <Link
              href="/configure/upload"
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

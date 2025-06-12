"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/60 backdrop-blur-md transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 font-semibold text-2xl">
            case<span className="text-green-600">cobra</span>
          </Link>
          <div className="flex gap-3">
            <SignedOut>
              <SignInButton>
                <Button variant="secondary">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonOuterIdentifier: "",
                  },
                }}
                showName
              />
            </SignedIn>
            <div className="w-px bg-gray-300 mx-2" />
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

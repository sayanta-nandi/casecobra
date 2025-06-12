import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <div className="h-20 bg-slate-100 border-t border-slate-300">
      <MaxWidthWrapper>
        <div className="flex flex-col h-full items-center justify-center lg:flex-row lg:justify-between text-muted-foreground text-sm gap-2">
          <p className="">
            &copy; {new Date().getFullYear()} CaseCobra, Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-gray-600">
              Terms
            </Link>
            <Link href="#" className="hover:text-gray-600">
              Privacy policy
            </Link>
            <Link href="#" className="hover:text-gray-600">
              Cookie policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;

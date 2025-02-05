import Link from "next/link";
import ShimmerButton from "../magicui/shimmer-button";

const GetAQuote = () => {
  return (
    <Link href="/login" className="w-full sm:w-auto">
      <ShimmerButton className="rounded-md">Get Started</ShimmerButton>
    </Link>
  );
};

export default GetAQuote;

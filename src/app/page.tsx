import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="grid grid-cols-2 gap-4 w-[80vw] lg:w-[60vw] md:w-[70vw]">
        <Link href="/domain-01">
          <Card className="hover:cursor-pointer hover:bg-zinc-100">
            <CardHeader>
              <CardTitle>Domain 01</CardTitle>
              <CardDescription>Domain 01 description</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/domain-02">
          <Card className="hover:cursor-pointer hover:bg-zinc-100">
            <CardHeader>
              <CardTitle>Domain 02</CardTitle>
              <CardDescription>Domain 02 description</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/domain-03">
          <Card className="hover:cursor-pointer hover:bg-zinc-100">
            <CardHeader>
              <CardTitle>Domain 03</CardTitle>
              <CardDescription>Domain 03 description</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/domain-04">
          <Card className="hover:cursor-pointer hover:bg-zinc-100">
            <CardHeader>
              <CardTitle>Domain 04</CardTitle>
              <CardDescription>Domain 04 description</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;

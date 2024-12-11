import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { domainData } from "@/constants";
import Link from "next/link";

const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-[80vw] lg:w-[60vw] md:w-[70vw]">
      {domainData.map((domain) => (
        <Link href="/domain-01" key={domain.title}>
          <Card className="hover:cursor-pointer hover:bg-zinc-100 h-40">
            <CardHeader>
              <CardTitle>{domain.title}</CardTitle>
              <CardDescription>{domain.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Home;

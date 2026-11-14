// Update this page (the content is just a fallback if you fail to update the page)

import { Sparkles } from "lucide-react";
import { MadeWithKodra } from "@/components/made-with-kodra";

const Index = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-5">
      <div className="max-w-md text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Sparkles size={26} aria-hidden />
        </span>
        <h1 className="mt-7 text-3xl font-semibold tracking-tight text-foreground">
          Your app starts here
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Describe what you want to build and this page becomes your product.
        </p>
      </div>
      <MadeWithKodra />
    </div>
  );
};

export default Index;

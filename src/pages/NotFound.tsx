import { Link } from "react-router-dom";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 py-16">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <House size={26} aria-hidden />
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Button className="mt-7" nativeButton={false} render={<Link to="/" />}>
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

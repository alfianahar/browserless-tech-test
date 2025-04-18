import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function SubmitButton({ loading, children, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {loading ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </Button>
      ) : (
        <Button
          {...props}
          disabled={props.disabled || loading}
          className="w-full"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {children || "Generate PDF"}
        </Button>
      )}
    </div>
  );
}

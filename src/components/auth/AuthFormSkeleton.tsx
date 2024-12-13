import { Skeleton } from "@/components/ui/skeleton";

export const AuthFormSkeleton = () => {
  return (
    <div className="space-y-4 w-full">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-3/4 mx-auto" />
    </div>
  );
};
"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center text-xl mb-3">
      <ArrowLeft
        onClick={() => router.back()}
        className="mr-2 h-6 w-6 cursor-pointer"
      />
      Back to List
    </div>
  );
}

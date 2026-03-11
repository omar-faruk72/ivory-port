"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation"; // usePathname যোগ করুন
import { useEffect } from "react";
import Swal from "sweetalert2";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // বর্তমান পেজের পাথ (যেমন: /dashboard)

  useEffect(() => {
    if (!loading && !user) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please login first to access this page.",
      });
      // লগইন পেজে পাঠানোর সময় বর্তমান পাথটি redirect প্যারামিটারে পাঠিয়ে দিন
      router.push(`/login?redirect=${pathname}`);
    }

    if (!loading && user && user.role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "This page is only accessible for Admins.",
      });
      router.push("/"); 
    }
  }, [user, loading, router, pathname]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user && user.role === "admin") {
    return <>{children}</>;
  }

  return null;
};

export default AdminRoute;
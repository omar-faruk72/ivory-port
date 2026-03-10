"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please login first to access this page.",
      });
      router.push("/login");
    }

    // যদি ইউজার থাকে কিন্তু সে অ্যাডমিন না হয়
    if (!loading && user && user.role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "This page is only accessible for Admins.",
      });
      router.push("/"); 
    }
  }, [user, loading, router]);
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
import { useMemo } from "react";

export function useAuth() {
  const user = useMemo(() => {
    const stored = localStorage.getItem("user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  return { user };
}

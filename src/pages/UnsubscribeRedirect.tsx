import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SUPABASE_URL = "https://upxsbhsamorhvnfebvor.supabase.co";

export default function UnsubscribeRedirect() {
  const [params] = useSearchParams();

  useEffect(() => {
    const e = params.get("e");
    if (e) {
      window.location.href = `${SUPABASE_URL}/functions/v1/em-unsubscribe?e=${encodeURIComponent(e)}`;
    }
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
      Processing unsubscribe…
    </div>
  );
}

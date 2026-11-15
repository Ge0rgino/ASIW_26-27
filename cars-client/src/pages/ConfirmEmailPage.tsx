import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { confirmEmail } from "../services/authService";

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Potwierdzanie konta...");

  useEffect(() => {
    if (!userId || !token) {
      return;
    }

    async function confirm() {
      try {
        const result = await confirmEmail(userId!, token!);
        setMessage(result);
      } catch {
        setMessage("Nie udało się potwierdzić konta.");
      }
    }

    confirm();
  }, [userId, token]);

  if (!userId || !token) {
    return (
      <div className="flex justify-center items-center w-full p-6">
        <section className="w-full max-w-md bg-amber-50 p-8 rounded-2xl shadow-md border border-amber-200 flex flex-col gap-4 text-center">
          <h1 className="font-extrabold text-red-700 text-2xl">
            Nieprawidłowy link
          </h1>
          <Link
            to="/login"
            className="text-amber-700 font-semibold hover:underline"
          >
            Przejdź do logowania
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full p-6">
      <section className="w-full max-w-md bg-amber-50 p-8 rounded-2xl shadow-md border border-amber-200 flex flex-col gap-4 text-center">
        <h1 className="font-extrabold text-amber-800 text-2xl">
          Potwierdzenie konta
        </h1>
        <p className="text-gray-700">{message}</p>
        <Link
          to="/login"
          className="text-amber-700 font-semibold hover:underline"
        >
          Przejdź do logowania
        </Link>
      </section>
    </div>
  );
}

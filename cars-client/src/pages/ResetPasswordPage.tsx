import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { resetPassword } from "../services/authService";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.target.value);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !token) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await resetPassword(email, token, newPassword);
      setMessage(result);
      setNewPassword("");
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("Nie udało się zmienić hasła.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!email || !token) {
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
            Wróć do logowania
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full p-6">
      <section className="w-full max-w-md bg-amber-50 p-8 rounded-2xl shadow-md border border-amber-200 flex flex-col gap-5">
        <h1 className="font-extrabold text-amber-800 text-center text-2xl">
          Ustaw nowe hasło
        </h1>

        {message && (
          <p className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-xl text-center">
            {message}
          </p>
        )}

        {error && (
          <p className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-xl text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-bold text-gray-800">
            Nowe hasło
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Wpisz nowe hasło"
              required
              className="p-2 bg-white border border-gray-300 rounded-xl font-normal focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-2 px-4 mt-2 rounded-2xl shadow-xs transition cursor-pointer"
          >
            {isSubmitting ? "Zapisywanie..." : "Zmień hasło"}
          </button>
        </form>
      </section>
    </div>
  );
}

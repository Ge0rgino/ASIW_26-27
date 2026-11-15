import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const user = await login({
        email,
        password,
      });

      setUser(user);
      navigate("/cars");
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("Nie udało się zalogować.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center w-full p-6">
      <section className="w-full max-w-md bg-amber-50 p-8 rounded-2xl shadow-md border border-amber-200 flex flex-col gap-5">
        <h1 className="font-extrabold text-amber-800 text-center text-2xl">
          Logowanie
        </h1>

        {error && (
          <p className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-xl text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-bold text-gray-800">
            E-mail
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Wpisz adres e-mail"
              required
              className="p-2 bg-white border border-gray-300 rounded-xl font-normal focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </label>

          <label className="flex flex-col gap-1 font-bold text-gray-800">
            Hasło
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Wpisz hasło"
              required
              className="p-2 bg-white border border-gray-300 rounded-xl font-normal focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-2 px-4 mt-2 rounded-2xl shadow-xs transition cursor-pointer"
          >
            {isSubmitting ? "Logowanie..." : "Zaloguj"}
          </button>
        </form>

        <div className="flex flex-col gap-2 text-center text-sm text-gray-700 pt-2 border-t border-amber-200">
          <p>
            <Link
              to="/forgot-password"
              className="text-amber-700 font-semibold hover:underline"
            >
              Nie pamiętasz hasła?
            </Link>
          </p>

          <p>
            Nie masz konta?{" "}
            <Link
              to="/register"
              className="text-amber-700 font-semibold hover:underline"
            >
              Zarejestruj się
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

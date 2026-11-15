export default function AboutPage() {
  return (
    <div className="flex items-center justify-center w-full p-6">
      <div className="max-w-3xl p-10 text-center rounded-2xl bg-amber-50 shadow-md border border-amber-200 flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-amber-800">
          O aplikacji Cars Client
        </h1>
        <p className="text-lg text-gray-700">
          Aplikacja kliencka stworzona w React z wykorzystaniem TypeScript,
          React Router, Axios, Zustand.
        </p>
        <p className="text-base text-gray-600">
          Umożliwia przeglądanie bazy samochodów, zarządzanie listą ulubionych
          pojazdów przypisaną do konta użytkownika oraz edycję i dodawanie
          nowych wpisów po uwierzytelnieniu tokenem JWT.
        </p>
      </div>
    </div>
  );
}

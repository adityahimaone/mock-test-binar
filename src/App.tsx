import logo from './logo.svg';

function App() {
  return (
    <div className="min-h-screen bg-slate-800">
      <header className="container mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center justify-center">
          <img src={logo} className="h-52 w-auto" alt="logo" />
          <p className="text-xl text-white">Vite + React + TypeScript + Airbnb + Husky = 🔥</p>
        </div>
      </header>
    </div>
  );
}

export default App;

# Mock Test Binar

Vite + React + TypeScript + TailwindCSS + ESLint + Prettier + Husky + Lint-Staged

## Features

- 🦾 Up to date libraries version and their features
- 🔎 Pre-configured and extensible ESLint configuration without wrong and unused rules designed for old React versions
- 💅 Pre-configured and extensible Prettier configuration
- 🔬 Git hooks for code formatting and linting pre-commit


## Available commands

Run in development mode

```bash
  yarn dev
```

Create production build

```bash
  yarn build
```

Run ESLint linting

```bash
  yarn lint
```

Run Prettier formatting

```bash
  yarn format
```

Run TypeScript compiling

```bash
  yarn compile
```

Serve production build locally

```bash
  yarn preview
```

### Jawaban No 4
- Kekurangan api adalah error code antara gagal dari user salah, harusnya diawali dari 400 bukan 200.
- Konsistensi data object antara response yang berhasil dan gagal tidak konsisten, di response gagal ada status di response gagal tidak ada.
- Kena CORS

## Resources

- [Vite](https://github.com/vitejs/vite)
- [Airbnb JS Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Husky](https://github.com/typicode/husky)

## License

[MIT](https://choosealicense.com/licenses/mit/)

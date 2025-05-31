# Meza 🌳

### Requirements

Ensure you have the following installed:

- **PHP/Laravel**
- **Node/Pnpm**

### Getting Started

#### Installation

Create a `.env` file and update with your values:

```sh
cp .env.example .env
```

Make sure to install dependencies:

```bash
composer install && pnpm install
```

#### Development

Start the development server with HMR:

```bash
composer dev
```

Your application will be available at `http://0.0.0.0:3000`.

#### Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
php artisan serve
```

### Deployment

#### DIY Deployment

Make sure to deploy the output of `pnpm build`

```
├── build/
│   ├── assets/         # Static assets
│   └── manifest.json
├── index.php           # Server entrypoint
```

### License

See [LICENSE](./LICENSE) for more information.

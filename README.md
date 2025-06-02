<p align="center">
    <a href="https://github.com/ingniius/meza" target="_blank">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://cdn.devdojo.com/assets/svg/genesis-logo-light.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://cdn.devdojo.com/assets/svg/genesis-logo.svg">
            <img alt="Meza Logo" width="240" src="https://cdn.devdojo.com/assets/svg/genesis-logo.svg">
        </picture>
    </a>
</p>

<p align="center" class="flex mx-auto space-x-2">
    <a href="https://github.com/ingniius/meza">
        <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
    </a>
    <a href="https://herd.laravel.com/new?starter-kit=ingniius/meza">
        <img src="https://img.shields.io/badge/Install%20with%20Herd-f55247?logo=laravel&logoColor=white">
    </a>
</p>

### About Meza

A Laravel starter kit built on the **TALL Stack**, along with **Volt** and **Folio**.

<a href="https://devdojo.com/wave/demo" target="_blank">
    <img src="https://cdn.devdojo.com/images/august2024/wave-anchor-theme.jpeg">
</a>

### Installation

You can use the [Laravel Installer](https://laravel.com/docs#installing-php) to install Meza.

```bash
laravel new my-app --using=ingniius/meza
```

Then, run `composer dev` to run the asset watcher, and you're good to go!

### Built With

Below is a list of all the technologies that Meza has been **built with**:

- [TailwindCSS](https://tailwindcss.com)
- [AlpineJS](https://alpinejs.dev)
- [Laravel](https://laravel.com)
- [Livewire](https://livewire.laravel.com)
- [Folio](https://github.com/laravel/folio)
- [Volt](https://github.com/livewire/volt)

### Testing

You can test out the app features by running the following command:

```bash
./vendor/bin/pest
```

Every test inside the `tests/Feature` folder has a test file that corresponds to each page in the `resources/views/pages` folder.

### Deployment

#### Docker Deployment

To build and run using Docker:

```bash
# Build container
docker compose -f compose.yml build

# Run compose.yml
docker compose -f compose.yml up -d
```

#### DIY Deployment

Make sure to deploy the output of `pnpm build`

```
├── build/
│   ├── assets/         # Static assets
│   └── manifest.json
├── index.php           # Server entrypoint
```

### License

The MIT License (MIT). Please see [License File](./LICENSE) for more information.

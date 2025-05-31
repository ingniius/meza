# ARTISAN
artisan.serve:
	@php artisan serve $(filter-out $@,$(MAKECMDGOALS))
artisan.key:
	@php artisan key:generate --ansi

# COMPOSER
composer.dev:
	@pnpm concurrently -c "#93c5fd,#c4b5fd,#fb7185,#fdba74" \
		"php artisan serve" \
		"php artisan queue:listen --tries=1" \
		"php artisan pail --timeout=0" \
		"dotenv-run -- pnpm dev" \
		--names=server,queue,logs,vite $(filter-out $@,$(_MAKECMDGOALS))
composer.pint:
	@./vendor/bin/pint $(filter-out $@,$(MAKECMDGOALS))
composer.test:
	@composer run test $(filter-out $@,$(MAKECMDGOALS))
composer.dry:
	@pnpm rimraf .phpunit.result.cache vendor

%:
	@:

COMPOSE ?= compose.yml

# ARTISAN
artisan.serve:
	@php artisan serve $(filter-out $@,$(MAKECMDGOALS))
artisan.key:
	@php artisan key:generate --ansi
artisan.optimize:
	@php artisan optimize
artisan.migrate:
	@php artisan migrate
artisan.seed:
	@php artisan db:seed

# CHANGESET
changeset.add:
	@pnpm changeset add
changeset.version:
	@pnpm changeset version
changeset.publish:
	@pnpm changeset publish

# COMPOSER
composer.dev:
	@pnpm concurrently -c "#93c5fd,#c4b5fd,#fb7185,#fdba74" \
		"php artisan serve" \
		"php artisan queue:listen --tries=1" \
		"php artisan pail --timeout=0" \
		"dotenv-run -- pnpm dev" \
		--names=server,queue,logs,vite
composer.pint:
	@./vendor/bin/pint $(filter-out $@,$(MAKECMDGOALS))
composer.test:
	@composer run test $(filter-out $@,$(MAKECMDGOALS))
composer.dry:
	@pnpm rimraf .phpunit.result.cache vendor

# DOCKER
docker.up:
	@docker compose -f $(COMPOSE) up -d $(filter-out $@,$(MAKECMDGOALS))
docker.build:
	@docker compose -f $(COMPOSE) build
docker.stop:
	@docker compose -f $(COMPOSE) stop
docker.down:
	@docker compose -f $(COMPOSE) down
docker.dry:
	@make docker.stop docker.down

%:
	@:

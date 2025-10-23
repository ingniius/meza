ENV ?= .env.local
COMPOSE ?= compose.yml

bump-deps:
	@pnpx npm-check-updates --deep -u
bump-ui:
	@pnpx shadcn@latest add --all --overwrite -c packages/ui

docker.up:
	@docker compose --env-file ${ENV} -f $(COMPOSE) up -d $(filter-out $@,$(MAKECMDGOALS))
docker.build:
	@docker compose --env-file ${ENV} -f $(COMPOSE) build
docker.stop:
	@docker compose --env-file ${ENV} -f $(COMPOSE) stop
docker.down:
	@docker compose --env-file ${ENV} -f $(COMPOSE) down
docker.dry:
	@make docker.stop docker.down

languine.sync:
	@cd packages/locale && pnpm languine sync
languine.dry:
	@cd packages/locale && pnpm languine translations delete

turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS))
turbo.format:
	@pnpm prettier \
    ./turbo/generators/**/*.{hbs,ts} \
    ./turbo/tools/{eslint,prettier,tsc}/**/*.{json,mjs} \
    ./{compose,pnpm-workspace,turbo}.{json,yml,yaml} \
		--write \
		--cache \
		--cache-location=.turbo/.prettiercache
turbo.gen:
	@pnpm turbo gen $(filter-out $@,$(MAKECMDGOALS))
turbo.dry:
	@pnpm run-s clean dry

%:
	@:

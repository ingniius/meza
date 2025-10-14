COMPOSE ?= compose.yml
SCHEMA ?= prisma/schema

bump-deps:
	@pnpx npm-check-updates --deep -u
bump-ui:
	@pnpx shadcn@latest add --all --overwrite -c packages/ui

docker.up:
	@docker compose --env-file apps/next/.env -f $(COMPOSE) up -d $(filter-out $@,$(MAKECMDGOALS))
docker.build:
	@docker compose --env-file apps/next/.env -f $(COMPOSE) build
docker.stop:
	@docker compose --env-file apps/next/.env -f $(COMPOSE) stop
docker.down:
	@docker compose --env-file apps/next/.env -f $(COMPOSE) down
docker.dry:
	@make docker.stop docker.down

languine.sync:
	@cd packages/locale && pnpm dotenv-run -- languine sync
languine.dry:
	@cd packages/locale && pnpm dotenv-run -- languine translations delete

prisma.generate:
	@cd packages/db && pnpm dotenv-run -- prisma generate --schema=./$(SCHEMA)
prisma.format:
	@cd packages/db && pnpm dotenv-run -- prisma format --schema=./$(SCHEMA)
prisma.push:
	@cd packages/db && pnpm dotenv-run -- prisma db push --schema=./$(SCHEMA)
prisma.seed:
	@cd packages/db && pnpm dotenv-run -- prisma db seed --schema=./$(SCHEMA)
prisma.studio:
	@cd packages/db && pnpm dotenv-run -- prisma studio --schema=./$(SCHEMA) -p 4000 -b none

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

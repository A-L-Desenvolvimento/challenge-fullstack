.PHONY:setup
setup:
	@sudo chmod +x setup && ./setup

.PHONY:test
test:
	@docker exec -it challenge-fullstack php artisan test --filter ProductStoreTest

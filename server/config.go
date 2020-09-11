package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type config struct {
	analyticsURL string
	publicDir    string
}

func init() {
	godotenv.Load()
}

func getEnv(key string) string {
	val := os.Getenv(key)
	if len(val) < 1 {
		panic(fmt.Errorf("missing env value for '%s'", key))
	}
	return val
}

func getConfig() (cfg config) {
	cfg = config{
		analyticsURL: getEnv("ANALYTICS_URL"),
		publicDir:    getEnv("PUBLIC_DIR"),
	}

	return
}

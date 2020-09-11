package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/go-chi/chi"
)

const notFound string = "/404/index.html"
const port int = 8000

type fileSystem struct {
	dir string
	fs  http.FileSystem
}

func (m *fileSystem) Open(path string) (http.File, error) {
	f, err := m.fs.Open(path)
	if err != nil {
		return http.Dir(m.dir).Open(notFound)
	}
	s, err := f.Stat()
	if s.IsDir() {
		index := strings.TrimSuffix(path, "/") + "/index.html"
		fidx, err := m.fs.Open(index)
		if err != nil {
			defer f.Close()
			return http.Dir(m.dir).Open(notFound)
		}
		defer fidx.Close()
	}

	return f, nil
}

func handleProxy(p *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		p.ServeHTTP(w, r)
	}
}

func main() {
	cfg := getConfig()
	analyticsRemote, err := url.Parse(cfg.analyticsURL)
	if err != nil {
		panic(err)
	}

	router := chi.NewRouter()

	fileServer := http.FileServer(&fileSystem{
		dir: cfg.publicDir,
		fs:  http.Dir(cfg.publicDir),
	})

	analyticsProxy := httputil.NewSingleHostReverseProxy(analyticsRemote)
	analyticsProxy.Director = func(req *http.Request) {
		req.URL.Scheme = analyticsRemote.Scheme
		req.URL.Path = strings.Replace(req.URL.Path, "ma/m", "matomo", 1)
		req.URL.Host = analyticsRemote.Host
		req.Host = analyticsRemote.Host
	}

	router.HandleFunc("/ma/*", handleProxy(analyticsProxy))
	router.Handle("/*", http.StripPrefix("/", fileServer))

	server := &http.Server{Addr: fmt.Sprintf(":%d", port), Handler: router}

	log.Printf("serving %s on HTTP port: %d", cfg.publicDir, port)
	log.Fatal(server.ListenAndServe())
}

# BUILD SITE
FROM node:lts as sitebuilder

WORKDIR /build
RUN chown node:node /build

USER node
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

ENV GATSBY_TELEMETRY_DISABLED=1
RUN npm run build

# BUILD SERVER
FROM golang:1.14-alpine as serverbuilder

ENV GO111MODULE=auto \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build
COPY server/main.go .
RUN go build -o main .

# RUN
FROM alpine

RUN adduser -S -D -H -h /app app
USER app
COPY --from=sitebuilder /build/public /app/public/
COPY --from=serverbuilder /build/main /build/.env /app/

WORKDIR /app
EXPOSE 8000
CMD ["./main"]

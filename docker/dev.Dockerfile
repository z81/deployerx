FROM docker:latest
RUN apk add --no-cache build-base python2-dev libffi-dev openssl-dev py-pip git openssh-client
RUN pip install docker-compose
RUN apk add --no-cache nodejs npm
WORKDIR /app
ENTRYPOINT ["npm", "run", "dev:watch"]
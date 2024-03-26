FROM public.ecr.aws/docker/library/node:16-alpine

RUN mkdir -p /opt/src

WORKDIR /opt
COPY package.json package-lock.json ./

RUN npm install --production  --legacy-peer-deps && npm cache clean --force

WORKDIR /opt/src
COPY ./src/ /opt/src

CMD [ "node", "--max-http-header-size", "40000", "index.js" ]
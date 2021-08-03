FROM mhart/alpine-node:14
WORKDIR /app

ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for ./

RUN chmod +x ./wait-for

COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN npx prisma generate
CMD yarn prisma:migrate:prod && yarn start:prod
###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18 As development
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1002 nestjs
USER nestjs

WORKDIR /home/nestjs
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
RUN ls -a
###################
# BUILD FOR PRODUCTION
###################
FROM node:18 As build
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1002 nestjs
USER nestjs
WORKDIR /home/nestjs
# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=nestjs:nestjs . .
COPY --chown=nestjs:nestjs --from=development /home/nestjs .
RUN echo '查看build-copy'
RUN ls -la
# Run the build command which creates the production bundle
RUN npm run build
# Set NODE_ENV environment variable
ENV NODE_ENV production
# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
#RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:18 As production
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget \
  xdg-utils
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1002 nestjs
USER nestjs
#WORKDIR /home/nestjs

ENV NODE_ENV production

EXPOSE 3002

ENV PORT 3002
# Copy the bundled code from the build stage to the production image
COPY --chown=nestjs:nestjs --from=build /home/nestjs/node_modules ./node_modules
COPY --chown=nestjs:nestjs --from=build /home/nestjs/dist ./dist
COPY --chown=nestjs:nestjs --from=build /home/nestjs/.cache /home/nestjs/.cache

RUN echo '查看pro'
RUN ls -la
# Start the server using the production build
CMD [ "node", "dist/main.js" ]



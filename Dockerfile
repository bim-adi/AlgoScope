# --- Stage 1: The Build Stage ---
# node version as the "builder"
FROM node:20-alpine AS build

# set the working directory in the container
WORKDIR /app

# copy package.json and package-lock.json FIRST
# This uses Docker's cache. 'npm install' only runs
# if these files change.
COPY package.json package-lock.json ./

# install dependencies
RUN npm install

# copy the rest of your app's source code
COPY . .

# build the app for production
# this creates a '/app/dist' folder
RUN npm run build

# --- Stage 2: The Serve Stage ---
# use a tiny, production-ready Nginx server
FROM nginx:1.27-alpine

# expose port 80 (Nginx's default port)
EXPOSE 80

# copy the built static files from the 'build' stage
# into the Nginx public HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# copy our custom Nginx config
# This is crucial for React Router to work!
COPY nginx.conf /etc/nginx/conf.d/default.conf

# command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]

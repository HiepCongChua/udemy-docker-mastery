# this shows how we can extend/change an existing official image from Docker Hub

FROM node:6-alpine
# highly recommend you always pin versions for anything beyond dev/learn
RUN apk add --update nodejs nodejs-npm
# change working directory to root of nginx webhost
# using WORKDIR is preferred to using 'RUN cd /some/path'
EXPOSE  3000
COPY index.html index.html

# I don't have to specify EXPOSE or CMD because they're in my FROM

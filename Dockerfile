FROM node:12.6.0-alpine
WORKDIR /usr/src/app

COPY ./build /usr/src/app
COPY ./node_modules /usr/src/app/node_modules

EXPOSE 4000
CMD [ "node", "./index.js" ]
# sudo docker build -t XXXX:v0.0.4 .

# sudo docker rm -f XXXX &&
# sudo docker run -id -p 9100:4000 -e "NODE_ENV=development" --name XXXX XXXX:v0.0.4


# docker build -t gcr.io/ml-group-204107/github.com/melegance/XXXX:version2 .
# docker push gcr.io/ml-group-204107/github.com/melegance/XXXX:version1
FROM node  


WORKDIR /usr/app/Backend

COPY ./package.json ./ 
RUN npm install

COPY ./ ./
EXPOSE 5000

CMD [ "npm","start","nodmon" ]
FROM alpine

RUN apk add --update nodejs git openssh

RUN mkdir /root/.ssh/

# Copy over private key
# Note: generate docker-key: ssh-keygen -q -t rsa -N '' -f docker-key. Add docker-key.pub to SSH Keys settings
COPY docker-key /root/.ssh/id_rsa

RUN chmod 600 /root/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts
# Add bitbuckets key
RUN ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts 

ENV BRANCH dev-cs

RUN cd / \
    && rm -rf app \
# Uncomment line below and update bitbucket git url    
    && git clone git@bitbucket.org:<team>/<repo>.git app

RUN cd app && git checkout $BRANCH \
    && git pull
    
COPY deploy.sh /

RUN chmod 700 /deploy.sh 

WORKDIR /

ADD . /
RUN npm install


VOLUME ["/app/"]

EXPOSE 3000

CMD npm start
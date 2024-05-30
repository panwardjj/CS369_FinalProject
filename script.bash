# Install Git
sudo apt-get install -y git

# Install NVM
sudo apt install curl 

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

source .bashrc

nvm install 16


#Install pm2

npm install pm2 -g

#Git clone

cd /home/ubuntu

git clone https://github.com/panwardjj/CS369_FinalProject.git

cd CS369_FinalProject

#Install npm
npm install

#Copy .env.production to .env
cp .env.production .env

npm run build

pm2 start server.js

pm2 save

pm2 startup

#Install nginx
sudo apt update

sudo apt install nginx

sudo systemctl start nginx

sudo vi /etc/nginx/sites-available/ec2-34-232-99-253.compute-1.amazonaws.com

#Write in vi
# server {
#         server_name ec2-34-232-99-253.compute-1.amazonaws.com;
#         location / {
#           	proxy_pass http://localhost:3000;
#        }
# 	location /api {
# 		proxy_pass http://localhost:8081;
# 	}
# }


sudo ln -s /etc/nginx/sites-available/ec2-34-232-99-253.compute-1.amazonaws.com /etc/nginx/sites-enabled/

#Check

sudo nginx -t

sudo systemctl restart nginx

Start react with pm2

pm2 serve build/ 3000 --name "web" --spa
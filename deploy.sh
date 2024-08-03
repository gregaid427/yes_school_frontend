echo "switching to branch master"
git checkout master

echo "building app..."
npm run build

echo "deploying app to server"
scp -r build/* 136.244.77.140:/var/www/html/sms

echo "done....."
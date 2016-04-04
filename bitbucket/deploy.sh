#!/bin/bash

if [ -d "app" ]; then
    cd app
else
    cd api # Your local git folder
  # Control will enter here if $DIRECTORY exists.
fi


if [[ -n "$1" ]] ; then
	BRANCH=$1
else
	BRANCH="master"
fi

echo $BRANCH

git reset --hard origin/$BRANCH
git clean -f
git pull
git checkout $BRANCH


npm install

# forever stop index.js
# NODE_ENV=production forever start index.js
echo "#-----------------------------------------------#"
echo "#              Execution Completed              #"
echo "#-----------------------------------------------#"
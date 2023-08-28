#!/bin/bash
#hugo needs to be installed: https://gohugo.io
source local_deploy.sh
git add docs/
git commit -m "Automatic deployment"
git push origin master

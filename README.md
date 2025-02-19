# archive.compression.cc website

Needs the static website builder Hugo.

If you have it installed, such that the 'hugo' command works, then you should be able to 

a)
Edit locally and serve it locally via:

    hugo server -w

which should serve it on localhost:1313

b)
After you have commited your code changes, you can deploy it by running the script

    ./hugo_deploy.sh

# compression.cc website
The website is contained in this  github repo with all of the website code (also the generated html files).

The only dependency is the static site generator hugo: https://github.com/relational/compressioncc/

If you have it installed, such that the 'hugo' command works, then you should be able to 

a)
Edit locally and serve it locally via:

    hugo server -w

which should serve it on localhost:1313

b)
After you have commited your code changes, you can deploy it by running the script

    ./deploy.sh

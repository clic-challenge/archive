#!/bin/bash
#hugo needs to be installed: https://gohugo.io
#Generate 2018 site
hugo --config=config_2018.toml
#Generate 2019 site
hugo --config=config_2019.toml
#Generate 2020 site
hugo

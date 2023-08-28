+++
title = "Challenge"
description = "Challenge on Learned Image Compression (CLIC)"
type = "page"
+++


## Motivation
The domain of image compression has traditionally used approaches discussed in forums such as ICASSP, ICIP and other very specialized venues like PCS, DCC, and ITU/MPEG expert groups. This workshop and challenge will be the first computer-vision event to explicitly focus on these fields. Many techniques discussed at computer-vision meetings have relevance for lossy compression. For example, super-resolution and artifact removal can be viewed as special cases of the lossy compression problem where the encoder is fixed and only the decoder is trained. But also inpainting, colorization, optical flow, generative adversarial networks and other probabilistic models have been used as part of lossy compression pipelines. Lossy compression is therefore a potential topic that can benefit a lot from a large portion of the CVPR community.

Recent advances in machine learning have led to an increased interest in applying neural networks to the problem of compression. At CVPR 2017, for example, one of the oral presentations was discussing compression using recurrent convolutional networks. In order to foster more growth in this area, this workshop will not only try to encourage more development but also establish baselines, educate, and propose a common benchmark and protocol for evaluation. This is crucial, because without a benchmark, a common way to compare methods, it will be very difficult to measure progress.

We propose hosting an image-compression challenge which specifically targets methods which have been traditionally overlooked, with a focus on neural networks (but also welcomes traditional approaches). Such methods typically consist of an encoder subsystem, taking images and producing representations which are more easily compressed than the pixel representation (e.g., it could be a stack of convolutions, producing an integer feature map), which is then followed by an arithmetic coder. The arithmetic coder uses a probabilistic model of integer codes in order to generate a compressed bit stream. The compressed bit stream makes up the file to be stored or transmitted. In order to decompress this bit stream, two additional steps are needed: first, an arithmetic decoder, which has a shared probability model with the encoder. This reconstructs (losslessly) the integers produced by the encoder. The last step consists of another decoder producing a reconstruction of the original image.

In the computer vision community many authors will be familiar with a multitude of configurations which can act as either the encoder and the decoder, but probably few are familiar with the implementation of an arithmetic coder/decoder. As part of our challenge, we therefore will release a reference arithmetic coder/decoder in order to allow the researchers to focus on the parts of the system for which they are experts.

While having a compression algorithm is an interesting feat by itself, it does not mean much unless the results it produces compare well against other similar algorithms and established baselines on realistic benchmarks. In order to ensure realism, we have collected a set of images which represent a much more realistic view of the types of images which are widely available (unlike the well established benchmarks which rely on the images from the Kodak PhotoCD, having a resolution of 768x512, or Tecnick, which has images of around 1.44 megapixels). We will also provide the performance results from current state-of-the-art compression systems as baselines, like WebP and BPG.

## Challenge Tasks
We provide two datasets: __Dataset P__ (“professional”) and __Dataset M__ (“mobile”). The datasets are collected to be representative for images commonly used in the wild, containing around two thousand images.
The challenge will allow participants to train neural networks or other methods on any amount of data (it should be possible to train on the data we provide, but we expect participants to have access to additional data, such as ImageNet). 

Participants will need to submit a file for each test image. On average, these files should __use less than 0.15 bpp__. The maximum size of the sum of all files will be released with the test set. In addition, a decoder executable has to be submitted that can run in the provided Docker environment and is capable of decompressing the submitted files.
We will impose reasonable limitations for compute and memory of the decoder executable.

We will provide two rankings of participants (and baseline image compression methods – WebP, JPEG 2000, and BPG) based on the following criteria:

* __PSNR__
* __Scores provided by human raters__

In addition, an overall winner will be decided by a panel which will also take into account other criteria such as the approach's runtime performance.

**Prizes will given to the winners of the challenge, amounting to more than 6000$ in total.** This is possible thanks to the sponsors.

**To ensure that the decoder is not optimized for the test set, we will require the teams to use one of the decoders submitted in the validation phase of the challenge.**

## Participate
<strong>Please check out the <a href="https://groups.google.com/forum/#!forum/clic-2018">discussion forum of the challenge</a> for announcements and discussions related to the challenge.</strong>

The challenge data is released by the Computer Vision Lab of ETH Zurich, and can be downloaded here:

* __[Training Dataset P ("professional") (1.9GB)](https://data.vision.ee.ethz.ch/cvl/clic/professional_train.zip)__
* __[Training Dataset M ("mobile") (3.8GB)](https://data.vision.ee.ethz.ch/cvl/clic/mobile_train.zip)__
* __[Validation Dataset P ("professional") (129MB)](https://data.vision.ee.ethz.ch/cvl/clic/professional_valid.zip)__
* __[Validation Dataset M ("mobile") (226MB)](https://data.vision.ee.ethz.ch/cvl/clic/mobile_valid.zip)__
* __[Test Dataset P ("professional") (365MB)](https://data.vision.ee.ethz.ch/cvl/clic/test/professional_test.zip)__
* __[Test Dataset M ("mobile") (645MB)](https://data.vision.ee.ethz.ch/cvl/clic/test/mobile_test.zip)__

The total size of all compressed images should not exceed 4,722,341 bytes for the validation set and 13,328,248 bytes for the test set.

To make life easier for us, please try to run your decoder in our Docker environment. For example,
for a Python based decoder:

`docker run -v $(pwd):$(pwd) -w $(pwd) clic2018/compression ./decode.py`

The Docker environment can be viewed here:

* __[Dockerfile](/docker/Dockerfile)__
* __[requirements.txt](/docker/requirements.txt)__

To submit a decoder to our evaluation server, use the following command:

`docker run -v "$(pwd)":"$(pwd)" -w "$(pwd)" clic2018/submit -n <team> -p <password> -e <email> <decoder> <images>`

It requires a team name, a password, an email, an executable decoder, and files representing the compressed
images. Alternatively, the decoder can be a zip file containing an executable named `decode` and supporting files such as model parameters.
The password will be set the first time you submit. You can then use this password to submit updated decoders.
The decoder will be called with no arguments and is expected to reconstruct all validation files (PNG) from the compressed
image files. An example JPEG decoder can be viewed here:

* __[decoder.py](/decoder.py)__

To be eligible for winning the competition, participants will need to submit a PDF detailing their
approach by April 26th.
We note that the organizers will not participate in the challenge and other teams from Google, Twitter and ETH Zurich are not eligible for any prizes.

## Important Dates
All deadlines are 23:59:59 PST.

| Date                 | Description
| -------------------- | -----------
| December 24th, 2017&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Challenge announcement and the training part of the dataset released
| January 15th, 2018   | The validation part of the dataset released, online validation server is made available
| April 14th, 2018  | The deadline for submitting decoders
| **April 15th, 2018**  | **The test set is released**
| April 22th, 2018  | The competition closes and participants are expected to have submitted compressed versions of the test set
| April 26th, 2018  | Deadline for [paper describing challenge submission](https://docs.google.com/forms/d/e/1FAIpQLSfVr8HcCIwOW-pJ13i7TuXFJjD0AL2C6V8fS9-0WGUhv1a3Wg/viewform)
| May 29th, 2018      | Results are released to challenge participants

## FAQ

_Does my model have to reconstruct images in full resolution or can it be cropped?_

The decoder has to produce PNG images where each image has the same resolution as the corresponding image in the validation or test set.

_How is PSNR calculated?_

We compute a single MSE value by averaging across all RGB channels of all pixels of the whole dataset, and from that calculate a PSNR value.

_The evaluation server gives "ERROR: Missing image IMG\_20170114\_210112.png". What am I doing wrong?_

The error means that the decoder failed and did not produce all required files. This could have many
reasons. If the decoder works locally using our Docker environment but fails on the server, a
likely explanation is that it uses too much memory.

_In which directory should the decoder save images?_

The decoder can save images in the current working directory `.` or in any arbitrary subfolder
such as `images`.

</br>

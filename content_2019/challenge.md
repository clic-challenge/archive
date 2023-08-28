+++
title = "Challenge"
description = "Challenge on Learned Image Compression (CLIC 2019)"
type = "page"
+++


## Motivation
The domain of image compression has traditionally used approaches discussed in forums such as ICASSP, ICIP and other very specialized venues like PCS, DCC, and ITU/MPEG expert groups. This workshop and challenge will be the first computer-vision event to explicitly focus on these fields. Many techniques discussed at computer-vision meetings have relevance for lossy compression. For example, super-resolution and artifact removal can be viewed as special cases of the lossy compression problem where the encoder is fixed and only the decoder is trained. But also inpainting, colorization, optical flow, generative adversarial networks and other probabilistic models have been used as part of lossy compression pipelines. Lossy compression is therefore a potential topic that can benefit a lot from a large portion of the CVPR community.

Recent advances in machine learning have led to an increased interest in applying neural networks to the problem of compression. At CVPR 2017, for example, one of the oral presentations was discussing compression using recurrent convolutional networks. In order to foster more growth in this area, this workshop will not only try to encourage more development but also establish baselines, educate, and propose a common benchmark and protocol for evaluation. This is crucial, because without a benchmark, a common way to compare methods, it will be very difficult to measure progress.

We propose hosting an image-compression challenge which specifically targets methods which have been traditionally overlooked, with a focus on neural networks (but also welcomes traditional approaches). Such methods typically consist of an encoder subsystem, taking images and producing representations which are more easily compressed than the pixel representation (e.g., it could be a stack of convolutions, producing an integer feature map), which is then followed by an arithmetic coder. The arithmetic coder uses a probabilistic model of integer codes in order to generate a compressed bit stream. The compressed bit stream makes up the file to be stored or transmitted. In order to decompress this bit stream, two additional steps are needed: first, an arithmetic decoder, which has a shared probability model with the encoder. This reconstructs (losslessly) the integers produced by the encoder. The last step consists of another decoder producing a reconstruction of the original image.

In the computer vision community many authors will be familiar with a multitude of configurations which can act as either the encoder and the decoder, but probably few are familiar with the implementation of an arithmetic coder/decoder. As part of our challenge, we therefore will release a reference arithmetic coder/decoder in order to allow the researchers to focus on the parts of the system for which they are experts.

While having a compression algorithm is an interesting feat by itself, it does not mean much unless the results it produces compare well against other similar algorithms and established baselines on realistic benchmarks. In order to ensure realism, we have collected a set of images which represent a much more realistic view of the types of images which are widely available (unlike the well established benchmarks which rely on the images from the Kodak PhotoCD, having a resolution of 768x512, or Tecnick, which has images of around 1.44 megapixels). We will also provide the performance results from current state-of-the-art compression systems as baselines, like WebP and BPG.

## Prizes
Prizes will given to the winners of the challenges, amounting to more than 20 000$ value in total:

* 10000$ Google cloud credit
* 7000$ Cash awards
* 2x Nvidia Titan RTX GPUs

We note that the organizers will not participate in the challenge and other teams from Google, Twitter and ETH Zurich are not eligible for any prizes.


## Discussion forum
<strong>Please check out the <a href="https://groups.google.com/forum/#!forum/clic-2019">discussion forum of the challenge</a> for announcements and discussions related to the challenge.</strong>

## Challenge Tasks

We will be running two tracks: *low-rate compression*, to be judged on the quality, and *transparent compression*, to be judged by the bit rate. For the low-rate compression track, there will be a bitrate threshold that must be met.  For the transparent track, there will be several quality thresholds that must be met.  In all cases, the submissions will be judged based on the aggregate results across the test set: the test set will be treated as if it were a single 'target', instead of (for example) evaluating bpp or PSNR on each image separately.

### Low-rate compression
For the low-rate compression track, the requirement will be that the compression is to **less than 0.15 bpp** across the full test set.  The maximum size of the sum of all files will be released with the test set. In addition, a decoder executable has to be submitted that can run in the provided Docker environment and is capable of decompressing the submitted files.  We will impose reasonable limitations for compute and memory of the decoder executable. The submissions in this track that are at or below that bitrate threshold will then be evaluated for best PSNR, best MS-SSIM, and best MOS from human raters.

### Transparent compression
For the transparent compression track, the requirement will be that the compression quality is **at least 40 dB (aggregated) PSNR; at least 0.993 (aggregated) MS-SSIM**. The submissions in this track that are at or better than these quality thresholds will then be evaluated for lowest total bitrate.


## Data
We provide the same two training datasets as we did last year: **Dataset P** (“professional”) and **Dataset M** (“mobile”). The datasets are collected to be representative for images commonly used in the wild, containing around two thousand images.
The challenge will allow participants to train neural networks or other methods on any amount of data (it should be possible to train on the data we provide, but we expect participants to have access to additional data, such as ImageNet).

Participants will need to submit a decoder and a file for each validation or test image. The test dataset is going to be released at a later point. **To ensure that the decoder is not optimized for the test set, we will require the teams to use one of the decoders submitted in the validation phase of the challenge.**

The challenge data is released by the Computer Vision Lab of ETH Zurich, and can be downloaded here:

* __[Training Dataset P ("professional") (1.9GB)](https://data.vision.ee.ethz.ch/cvl/clic/professional_train.zip)__
* __[Training Dataset M ("mobile") (3.8GB)](https://data.vision.ee.ethz.ch/cvl/clic/mobile_train.zip)__
* __[Validation Dataset P ("professional") (129MB)](https://data.vision.ee.ethz.ch/cvl/clic/professional_valid.zip)__
* __[Validation Dataset M ("mobile") (226MB)](https://data.vision.ee.ethz.ch/cvl/clic/mobile_valid.zip)__

The total size of all compressed images should not exceed 4,722,341 bytes for the validation set for the low-rate track. 
For the transparent track, see above for the PSNR and MS-SSIM thresholds.

### NEW: Test Set is now available.

* __[Test Dataset P ("professional") (832.78)](https://data.vision.ee.ethz.ch/cvl/clic/test/CLIC2019Professional_test.zip)__
* __[Test Dataset M ("mobile") (354.9 MB)](https://data.vision.ee.ethz.ch/cvl/clic/test/CLIC2019Mobile_test.zip)__

The total size of all compressed images should not exceed 15,749,090 bytes for the test set for the low-rate track.
For the transparent track, see above for the PSNR and MS-SSIM thresholds.

### Test Server Instructions

The submission process is through the same docker image as before:

`docker run -v $(pwd):$(pwd) -w $(pwd) gcr.io/clic-215616/compression ./decode.py`
`docker run  -v "$(pwd)":"$(pwd)"  -w "$(pwd)" gcr.io/clic-215616/submit  -n <yourteamname>  -p <yourteampass>  -e <yourteamemail> decoder.py  images/*.bin`


We have 3 CPU and 3 GPU servers up. If you don't see "Submission queued..." soon after submitting, you should move on to the next server.

To do this, you can select one of the 3 servers:

`docker run  -v "$(pwd)":"$(pwd)"  -w "$(pwd)"  -e EVAL_SERVER=eval-cpu{0,1,2}.compression.cc  gcr.io/clic-215616/submit -n <yourteamname> -p <yourteampass> -e <yourteamemail> decoder.py images/*.bin`

For GPU servers:

`docker run -v "$(pwd)":"$(pwd)" -w "$(pwd)" -e EVAL_SERVER_GPU=eval-gpu{0,1,2}.compression.cc gcr.io/clic-215616/submit --use_gpu -n <yourteamname> -p <yourteampass>  -e <yourteamemail> decoder.py images/*.bin`


Since the submission time can take a while and the leaderboards are still not up to show submission time, please use: 

* __[http://results.compression.cc:8000/lowrate/test](http://results.compression.cc:8000/lowrate/test)__
* __[http://results.compression.cc:8000/transparent/test](http://results.compression.cc:8000/transparent/test)__

For the lowrate and transparent leaderboards respectively. Note: It will not show metrics for the lowrate task, as this isn't shared publicly on the leaderboards until after the testing phase is over. If you don't see your results on there after a day, please e-mail the group with team name and what server you submitted to and one of us will look at it.


## Evaluation server

We use Docker to allow you to test your decoder in the same environment as is run on our server. To
test your decoder in our environment, install Docker and run, for example:

`docker run -v $(pwd):$(pwd) -w $(pwd) gcr.io/clic-215616/compression ./decode.py`

The Docker environment and an example decoder can be viewed here:

* __[Dockerfile](/docker/Dockerfile)__
* __[requirements.txt](/docker/requirements.txt)__
* __[decoder.py](/decoder.py)__

To submit a decoder to our evaluation server, use the following command:

`docker run -v "$(pwd)":"$(pwd)" -w "$(pwd)" gcr.io/clic-215616/submit -n <team> -p <password> -e <email> -t <task> <decoder> <images>`

It requires a team name, a password, an email, an executable decoder, and files representing the compressed
images. `<task>` should be one of "low-rate" (default) or "transparent". Instead of an executable, the decoder can also be a zip file containing an executable named `decode` and other supporting files such as model parameters.
The password will be set the first time you submit. You can then use this password to submit updated decoders.
The decoder will be called with no arguments and is expected to reconstruct all validation files (PNG) from the compressed
image files.

At the moment, the evaluation server only supports the *low-bit rate* task. We will provide
instructions for the *transparent* task shortly.

There is a 12GB memory limit to run your decoder, and your decoder should run in a
reasonable amount of time on a CPU (hours not days). We aim to provide GPU support later.

## Validation and Test phases
During the validation phase, participants are free to develop their method and submit decoders to the server.
After the test set has been released, we will require the teams to use one of the decoders submitted in the validation phase of the challenge.
This is to ensure that the decoder is not optimized for the test set.

## Important Dates
All deadlines are 23:59:59 PST.

| Date                 | Description
| -------------------- | -----------
|December 17th, 2018&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Challenge announcement and the training part of the dataset released
|January 8th, 2019	| The validation part of the dataset released, online validation server is made available.
|April 8th, 2019   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     |Deadline for regular paper submissions
|April 22th, 2019       | Final decoders for test set must be submitted.
|April 22nd, 2019	| The test set is released.
|April 22nd, 2019	| Regular paper decision notification.
|April 29th, 2019	| The competition closes and participants are expected to have submitted their solutions along with the compressed versions of the test set.
|May 8th, 2019	| Deadline for paper submission and factsheets.
|May 15th, 2019	| Results are released to the participants.
|May 22th, 2019	| Challenge paper decision notification.
|May 30th, 2019	| Camera ready deadline (all papers).

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

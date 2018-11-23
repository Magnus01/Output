############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM chug/ubuntu14.04x64
#FROM ubuntu:16.04


# Update the repository sources list
RUN echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list
RUN apt-get update



#Install all the languages/compilers we are supporting.
#
RUN apt-get install -y gcc
RUN apt-get install -y g++
#RUN apt-get install -y php5-cli
#RUN apt-get install -y ruby
#RUN apt-get install -y python


#RUN apt-get install -y mono-xsp2 mono-xsp2-base

#RUN apt-get install -y mono-vbnc

RUN apt-get install curl -y
RUN apt-get install -y sudo -y
RUN apt-get install build-essential libssl-dev -y

#RUN apt-get install -y npm
#RUN apt-get install -y golang-go



#RUN apt-get install curl python-software-properties -y
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN ln -s "$(which nodejs)" /usr/local/bin/node

RUN npm config set strict-ssl false
RUN npm install -g underscore  request express jade shelljs passport http sys jquery lodash async mocha qunit moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone forever  debug && export NODE_PATH=/usr/local/lib/node_modules/

#RUN apt-get install -y clojure1.4




ARG THEANO_VERSION=rel-0.8.2
ARG TENSORFLOW_VERSION=0.12.1
ARG TENSORFLOW_ARCH=cpu
ARG KERAS_VERSION=1.2.0

#prepare for Java download
#RUN apt-get install -y python-software-properties python-dev python-numpy python-pip python-matplotlib
RUN apt-get install -y bc 
RUN apt-get install -y build-essential
RUN apt-get install -y cmake
RUN apt-get install -y curl
RUN apt-get install -y g++ 
RUN apt-get install -y gfortran
RUN apt-get install -y git
RUN apt-get install -y libffi-dev
RUN apt-get install -y libfreetype6-dev 
RUN apt-get install -y libhdf5-dev
RUN apt-get install -y  libjpeg-dev
#RUN apt-get install -y software-properties-common

RUN apt-get install -ylibpng12-dev 
RUN apt-get install -y libssl-dev 
RUN apt-get install -y ibtiff5-dev
RUN apt-get install -y libwebp-dev
RUN apt-get install -y libzmq3-dev
RUN apt-get install -y nano
RUN apt-get install -y pkg-config
RUN apt-get install -y python-dev
RUN apt-get install -y software-properties-common
RUN apt-get install -y unzip
RUN apt-get install -y vim
RUN apt-get install -y wget
RUN apt-get install -y zlib1g-dev
RUN apt-get install -y qt5-default
RUN apt-get install -y libvtk6-dev
RUN apt-get install -y zlib1g-dev
RUN apt-get install -y libjpeg-dev
RUN apt-get install -y libwebp-dev
RUN apt-get install -y libpng-dev
RUN apt-get install -y libtiff5-dev
RUN apt-get install -y libjasper-dev
RUN apt-get install -y libopenexr-dev
RUN apt-get install -y libgdal-dev
RUN apt-get install -y libdc1394-22-dev
RUN apt-get install -y libavcodec-dev
RUN apt-get install -y libavformat-dev
RUN apt-get install -y libswscale-dev
RUN apt-get install -y libtheora-dev
RUN apt-get install -y libvorbis-dev
RUN apt-get install -y libxvidcore-dev
RUN apt-get install -y libx264-dev
RUN apt-get install -y yasm
RUN apt-get install -y libopencore-amrnb-dev
RUN apt-get install -y libopencore-amrwb-dev
RUN apt-get install -y libv4l-dev
RUN apt-get install -y libxine2-dev
RUN apt-get install -y libtbb-dev
RUN apt-get install -y libeigen3-dev
RUN apt-get install -y python-dev
RUN apt-get install -y python-tk
RUN apt-get install -y python-numpy
RUN apt-get install -y python3-dev
RUN apt-get install -y python3-tk
RUN apt-get install -y python3-numpy
RUN apt-get install -y ant
RUN apt-get install -y default-jdk
RUN apt-get install -y doxygen
RUN apt-get install -y
RUN apt-get install -y apt-get clean
RUN apt-get install -y apt-get autoremove
RUN apt-get install -y rm -rf /var/lib/apt/lists/*
RUN apt-get install -y update-alternatives --set libblas.so.3 /usr/lib/openblas-base/libblas.so.3



















# Install some dependencies -- leaving them untouched
#RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
#		bc \
#        build-essential \
#        cmake \
#        curl \
#        g++ \
#        gfortran \
#        git \
#        libffi-dev \
#        libfreetype6-dev \
#        libhdf5-dev \
#        libjpeg-dev \
#
#        liblcms2-dev \
#        libopenblas-dev \
#        liblapack-dev \
#        libopenjpeg2 \
#        libpng12-dev \
#        libssl-dev \
#        libtiff5-dev \
#        libwebp-dev \
#        libzmq3-dev \
#        nano \
#        pkg-config \
#        python-dev \
#        software-properties-common \
#        unzip \
#        vim \
#        wget \
#        zlib1g-dev \
#        qt5-default \
#        libvtk6-dev \
#        zlib1g-dev \
#        libjpeg-dev \
#        libwebp-dev \
#        libpng-dev \
#        libtiff5-dev \
#        libjasper-dev \
#        libopenexr-dev \
#        libgdal-dev \
#        libdc1394-22-dev \
#        libavcodec-dev \
#        libavformat-dev \
#        libswscale-dev \
#        libtheora-dev \
#        libvorbis-dev \
#        libxvidcore-dev \
#        libx264-dev \
#        yasm \
#        libopencore-amrnb-dev \
#        libopencore-amrwb-dev \
#        libv4l-dev \
#        libxine2-dev \
#        libtbb-dev \
#        libeigen3-dev \
#        python-dev \
#        python-tk \
#        python-numpy \
#        python3-dev \
#        python3-tk \
#        python3-numpy \
#        ant \
#        default-jdk \
#        doxygen \
#        && \
#        apt-get clean && \
#        apt-get autoremove && \
#        rm -rf /var/lib/apt/lists/* && \
#        #Link BLAS library to use OpenBLAS using the alternatives mechanism (https://www.scipy.org/scipylib/building/linux.html#debian-ubuntu)
#        update-alternatives --set libblas.so.3 /usr/lib/openblas-base/libblas.so.3

# Install pip to get the latest version
RUN curl -O https://bootstrap.pypa.io/get-pip.py && \
	python get-pip.py && \
	rm get-pip.py
# Install useful Python packages using apt-get to avoid version incompatibilities with Tensorflow binary
# especially numpy, scipy, skimage and sklearn (see https://github.com/tensorflow/tensorflow/issues/2034)
RUN apt-get update && apt-get install -y \
		python-numpy \
		python-scipy \
		python-nose \
		python-h5py \
		python-skimage \
		python-matplotlib \
		python-pandas \
		python-sklearn \
		python-sympy \
		&& \
	apt-get clean && \
	apt-get autoremove && \
	rm -rf /var/lib/apt/lists/*

# Install other useful Python packages using pip
RUN pip --no-cache-dir install --upgrade ipython && \
	pip --no-cache-dir install \
		Cython \
		ipykernel \
		jupyter \
		path.py \
		Pillow \
		pygments \
		six \
		sphinx \
		wheel \
		zmq \
		&& \
	python -m ipykernel.kernelspec

# Install TensorFlow
RUN pip --no-cache-dir install \
	https://storage.googleapis.com/tensorflow/linux/${TENSORFLOW_ARCH}/tensorflow-${TENSORFLOW_VERSION}-cp27-none-linux_x86_64.whl


# Install Keras
RUN pip --no-cache-dir install git+git://github.com/fchollet/keras.git@${KERAS_VERSION}

## upgrade pip # Irrelevant for python 2, pip3 removed.
#RUN pip3 --no-cache-dir install -U pip
#COPY requirements.txt /requirements.txt
#RUN pip3 --no-cache-dir install -r /requirements.txt



# Add SNI support to Python --not really needed for modern Pythons
#RUN pip3 --no-cache-dir install \
#		pyopenssl \
#		ndg-httpsclient \
#		pyasn1

# Install useful Python packages using apt-get to avoid version incompatibilities with Tensorflow binary
# especially numpy, scipy, skimage and sklearn (see https://github.com/tensorflow/tensorflow/issues/2034)
#RUN apt-get update && apt-get install -y \
#		python3-numpy \
#		python3-scipy \
#		python3-nose \
#		python3-h5py \
#		python3-skimage \
#		python3-matplotlib \
#		python3-pandas \
#		python3-sklearn \
#		python3-sympy \
#		&& \
#	apt-get clean && \
#	apt-get autoremove && \
#	rm -rf /var/lib/apt/lists/*

# Install other useful Python packages using pip
#RUN pip3 --no-cache-dir install --upgrade ipython && \
#	pip --no-cache-dir install \
#		Cython \
#		ipykernel \
#		jupyter \
#		path.py \
#		Pillow \
#		pygments \
#		six \
#		sphinx \
#		wheel \
#		zmq \
#		&& \
#	python -m ipykernel.kernelspec


# Install TensorFlow
#RUN pip3 --no-cache-dir install \
#	https://storage.googleapis.com/tensorflow/linux/${TENSORFLOW_ARCH}/tensorflow-${TENSORFLOW_VERSION}-cp27-none-linux_x86_64.whl



# Set up notebook config
COPY jupyter_notebook_config.py /root/.jupyter/

# Jupyter has issues with being run directly: https://github.com/ipython/ipython/issues/7062
COPY run_jupyter.sh /root/
COPY versions.py /versions.py

# ATTENTION: after that apt may stop working so it should be kept at the bottom of Dockerfile
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.5 1







#
#
#
##
#
#
##
#
##
#
#
#
#
#
#


#THIS MIGHT WORK
#RUN mkdir -p /root/.config/matplotlib
RUN echo "backend : Agg" > /etc/matplotlibrc



#THIS IS JAVA
##grab oracle java (auto accept licence)
#RUN add-apt-repository -y ppa:webupd8team/java
#RUN apt-get update
#RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
#RUN apt-get install -y oracle-java8-installer


#RUN apt-get install -y gobjc
RUN apt-get install -y gnustep-devel &&  sed -i 's/#define BASE_NATIVE_OBJC_EXCEPTIONS     1/#define BASE_NATIVE_OBJC_EXCEPTIONS     0/g' /usr/include/GNUstep/GNUstepBase/GSConfig.h


#RUN apt-get install -y scala
#RUN apt-get install -y mysql-server
#RUN apt-get install -y perl

RUN apt-get install -y curl

#RUN mkdir -p /opt/rust && \
#    curl https://sh.rustup.rs -sSf | HOME=/opt/rust sh -s -- --no-modify-path -y && \
#    chmod -R 777 /opt/rust

#RUN apt-get install -y sudo
RUN apt-get install -y bc

RUN echo "mysql ALL = NOPASSWD: /usr/sbin/service mysql start" | cat >> /etc/sudoers


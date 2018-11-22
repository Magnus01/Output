############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM chug/ubuntu14.04x64 
MAINTAINER ASAD MEMON, OSMAN ALI

# Update the repository sources list
RUN echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list
RUN apt-get update
#RUN apt-get upgrade
#Install all the languages/compilers we are supporting.
RUN apt-get install -y gcc
RUN apt-get install -y g++
RUN apt-get install -y php5-cli
RUN apt-get install -y ruby
RUN apt-get install -y python
RUN apt-get install -y mono-xsp2 mono-xsp2-base

RUN apt-get install -y mono-vbnc

RUN apt-get install curl -y
RUN apt-get install -y sudo -y
#RUN apt-get install build-essential libssl-dev -y

#RUN apt-get install -y npm
RUN apt-get install -y golang-go



RUN apt-get install curl python-software-properties -y
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN ln -s "$(which nodejs)" /usr/local/bin/node

RUN npm config set strict-ssl false
RUN npm install -g underscore  request express jade shelljs passport http sys jquery lodash async mocha qunit moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone forever  debug && export NODE_PATH=/usr/local/lib/node_modules/

RUN apt-get install -y clojure1.4


#prepare for Java download
#RUN apt-get install -y python-software-properties python-dev python-numpy python-pip python-matplotlib
#RUN apt-get install -y software-properties-common

#RUN apt-get update && apt-get install -y wget ca-certificates \
#    git curl vim python3-dev python3-pip \
#    libfreetype6-dev libpng12-dev libhdf5-dev
#
#RUN pip3 install --upgrade pip
#RUN pip3 install tensorflow
#RUN pip3 install numpy pandas sklearn matplotlib seaborn jupyter pyyaml h5py
#RUN pip3 install keras --no-deps
#
##
#RUN mkdir -p /root/.config/matplotlib
#RUN echo "backend : Agg" > /root/.config/matplotlib/matplotlibrc






ENV PATH="/usr/local/cuda-8.0/bin:${PATH}"
ENV LD_LIBRARY_PATH="/usr/local/cuda-8.0/lib64:${LD_LIBRARY_PATH}"


## from core/Dockerfile-gpu
# Setup locales
RUN apt-get clean && apt-get install -y locales
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Purge existing python installs
RUN apt-get purge -y python.*

# Install prereqs
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y build-essential checkinstall \
	wget \
	bzip2 \
	ca-certificates \
	sudo \
	locales \
	fonts-liberation \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*


## below mostly from jupyter/minimal-notebook (there's a bit of it in the line above too)
## -- see https://github.com/jupyter/docker-stacks/blob/master/LICENSE.md
# Install Tini
RUN wget --quiet https://github.com/krallin/tini/releases/download/v0.10.0/tini && \
    echo "1361527f39190a7338a0b434bd8c88ff7233ce7b9a4876f3315c22fce7eca1b0 *tini" | sha256sum -c - && \
    mv tini /usr/local/bin/tini && \
    chmod +x /usr/local/bin/tini

# Configure environment
ENV CONDA_DIR /opt/conda
ENV PATH $CONDA_DIR/bin:$PATH
ENV SHELL /bin/bash
ENV NB_USER jovyan
ENV NB_UID 1000
ENV HOME /home/$NB_USER

# Create jovyan user with UID=1000 and in the 'users' group
RUN useradd -m -s /bin/bash -N -u $NB_UID $NB_USER && \
	mkdir -p $CONDA_DIR && \
	chown $NB_USER $CONDA_DIR

USER $NB_USER

# Setup work directory for backward-compatibility
RUN mkdir /home/$NB_USER/work

# Install conda as jovyan and check the md5 sum provided on the download site
ENV MINICONDA_VERSION 4.3.21
RUN cd /tmp && \
    mkdir -p $CONDA_DIR && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    echo "c1c15d3baba15bf50293ae963abef853 *Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh" | md5sum -c - && \
    /bin/bash Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh -f -b -p $CONDA_DIR && \
    rm Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    $CONDA_DIR/bin/conda config --system --prepend channels conda-forge && \
    $CONDA_DIR/bin/conda config --system --set auto_update_conda false && \
    $CONDA_DIR/bin/conda config --system --set show_channel_urls true && \
    $CONDA_DIR/bin/conda update --all && \
    conda clean -tipsy

# Install Jupyter Notebook and Hub
RUN conda install --quiet --yes \
    'notebook=5.0.*' \
    'jupyterhub=0.7.*' \
    'jupyterlab=0.24.*' \
    && conda clean -tipsy

USER root

EXPOSE 8888
WORKDIR $HOME

# Configure container startup
ENTRYPOINT ["tini", "--"]
CMD ["start-notebook.sh"]

# Add local files as late as possible to avoid cache busting
COPY installation/docker-stack-scripts/start.sh /usr/local/bin/
COPY installation/docker-stack-scripts/start-notebook.sh /usr/local/bin/
COPY installation/docker-stack-scripts/start-singleuser.sh /usr/local/bin/
COPY installation/docker-stack-scripts/jupyter_notebook_config.py /etc/jupyter/
RUN chown -R $NB_USER:users /etc/jupyter/


## the next chunk of code is from jupyter/minimal-notebook

# Install all OS dependencies for fully functional notebook server
RUN apt-get update && apt-get install -yq --no-install-recommends \
    build-essential \
    emacs \
    git \
    inkscape \
    jed \
    libsm6 \
    libxext-dev \
    libxrender1 \
    lmodern \
    pandoc \
    python-dev \
    texlive-fonts-extra \
    texlive-fonts-recommended \
    texlive-generic-recommended \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-xetex \
    vim \
    unzip \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*


## the next chunk of code is from jupyter/scipy-notebook

# libav-tools for matplotlib anim
RUN apt-get update && \
    apt-get install -y --no-install-recommends libav-tools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

USER $NB_USER

# Install Python 3 packages
# Remove pyqt and qt pulled in for matplotlib since we're only ever going to
# use notebook-friendly backends in these images
RUN conda install --quiet --yes \
    'nomkl' \
    'ipywidgets=6.0*' \
    'pandas=0.19*' \
    'numexpr=2.6*' \
    'matplotlib=2.0*' \
    'scipy=0.19*' \
    'seaborn=0.7*' \
    'scikit-learn=0.18*' \
    'scikit-image=0.12*' \
    'sympy=1.0*' \
    'cython=0.25*' \
    'patsy=0.4*' \
    'statsmodels=0.8*' \
    'cloudpickle=0.2*' \
    'dill=0.2*' \
    'numba=0.31*' \
    'bokeh=0.12*' \
    'sqlalchemy=1.1*' \
    'hdf5=1.8.17' \
    'h5py=2.6*' \
    'vincent=0.4.*' \
    'beautifulsoup4=4.5.*' \
    'xlrd'  && \
    conda remove --quiet --yes --force qt pyqt && \
    conda clean -tipsy

# Activate ipywidgets extension in the environment that runs the notebook server
RUN jupyter nbextension enable --py widgetsnbextension --sys-prefix

# Import matplotlib the first time to build the font cache.
ENV XDG_CACHE_HOME /home/$NB_USER/.cache/
RUN MPLBACKEND=Agg python -c "import matplotlib.pyplot"

USER $NB_USER



## Install TensorFlow for GPU
RUN conda install --quiet --yes 'tensorflow-gpu=1.0*'

## Install high-level TensorFlow APIs
RUN pip install tflearn==0.3.2
RUN pip install keras==2.0.8

## Install NLP packages
RUN pip install nltk==3.2.4
RUN pip install gensim==2.3.0

# install Reinforcement Learning packages:
RUN pip install gym==0.9.4
#
## フォント
#
## Matplotlib 用の設定ファイルを用意する。
#WORKDIR /etc
#RUN echo "backend : Agg" >> matplotlibrc
#
#
#




#grab oracle java (auto accept licence)
RUN add-apt-repository -y ppa:webupd8team/java
RUN apt-get update
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN apt-get install -y oracle-java8-installer


RUN apt-get install -y gobjc
RUN apt-get install -y gnustep-devel &&  sed -i 's/#define BASE_NATIVE_OBJC_EXCEPTIONS     1/#define BASE_NATIVE_OBJC_EXCEPTIONS     0/g' /usr/include/GNUstep/GNUstepBase/GSConfig.h


RUN apt-get install -y scala
RUN apt-get install -y mysql-server
RUN apt-get install -y perl

RUN apt-get install -y curl
RUN mkdir -p /opt/rust && \
    curl https://sh.rustup.rs -sSf | HOME=/opt/rust sh -s -- --no-modify-path -y && \
    chmod -R 777 /opt/rust

#RUN apt-get install -y sudo
RUN apt-get install -y bc

RUN echo "mysql ALL = NOPASSWD: /usr/sbin/service mysql start" | cat >> /etc/sudoers


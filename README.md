# Project Pharmacy

## First step : download the repo
Download the repo. After that, open the folder of the repo with vs code.
Then press <span style="color: lightblue;">CTRL + J</span> or <span style="color: lightblue;">Windows + J</span> to open a terminal inside the project.

## Second step : install docker container
For the first running, you need to have docker installed.<br>
Then, from your command line, run <code style="color: lightblue;">docker build -t truffle-dev .</code>

## run bash from the container
Run this command in your terminal<br>
<p>For Unix os</p>
<p><code style="color: lightblue;">docker run -it -p 7545:7545 -v $(pwd):/usr/src/app truffle-dev</code>

<p>For Windows os</p>
<p><code style="color: lightblue;">docker run -it -p 7545:7545 -v %cd%:/usr/src/app truffle-dev</code>

<p >Congrats !! Now you have access to command line. You can compile and mitigate your code.</p>

## <span style="color: red;">WARNING<span>
For <span style="color: lightblue;">truffle mitigate</span> to work, you should first open <span style="color: orange;">Ganache</span> on port 7545.
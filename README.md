## Introduction
This is the final Project for [SYS6023 System Cognitive Engineering](http://records.ureg.virginia.edu/preview_course_nopop.php?catoid=34&coid=155113). In this project, I developed an complete online experiment platform for representations in distributed cognitive tasks. The biggest advantage is that online platform will collect large amount of detailed data easily and accurately. Besides that, I do user interface design for the web service and try to make it easy to use.



## Online Experiment System Flow Chart
Firstly, user need to log in with a google account, in which system will store google account id in  database and if the user Id is already in database,  it will not add it. Once user login system with google account, it will randomly get game between coin games and disk games. After that, we will go to introduction of game rules. Considering there is a process to ensure tester understand the rules completely, it is also beneficial to do the rule understanding check before user start. So I add a rule quiz page there. Only when users answers all the questions correctly could they be allowed to start the games.

After the game starts, the timer will start timing from 0 seconds. User could use mouse to manipulate the position of disks or coins and if all the coins or disks are moved to a new circle bar, it will stop the timer automatically, and then send the Time and user ID to database. If the user want to continue the game, they could click play again button and play as many times as they want. See flow chart below.

![Flow Chart](https://raw.githubusercontent.com/haoyuchen1992/Online-Cognitive-Experiment/f6b81da522319d83fdd426fd1e06d2b5ac955dce/Project-Docs/FlowChart.png)

Notes:The website will not record your email, but only record your google ID and your name



The techniques used here:

1.[Google APP Engine](https://cloud.google.com/appengine/docs)  
2.[Google Cloud Datastore](https://cloud.google.com/appengine/docs/python/storage)   
3.Google Authentification  
4.[Tower of Hanoi](https://github.com/jwintersinger/towers-of-hanoi)

It's struggled experience to firstly create website with account and datebase.But finally, I figured it out and made this application, Cheer for myself!

Relavant Repository: [Coin Based Hanoi Tower](https://github.com/haoyuchen1992/Coin-Based-Hanoi-Tower)
### To DO
1. Combine Css and Js folders
When incorporating the code of tower of Hanoi, I didn't combine the css and js code with my original ones. So it is kind of awkward to have two css folders and two javascript folders.



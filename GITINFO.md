.	cd rm index.html —delete a file
.	cd mkDir eunsim — create a new directory named eunsim
.	cd touch index.html - create a new html file.
.
.
.	open terminal app 
.	go to your local project directory 
.	-$ cd project/kes3583.github.io 
.	user 설정 
.	git config —global user.email “kes3583@gmail.com” 
.	- new git repository 
.	git init
.		1.	$ git clone git@github.com:ltconwell/dash-hack.git ( if new repo)
.	git clone https://github.com/kes3583/javascript30.git
. 
.	upload a file or folder or your project 
1.	git add index.html 
2.	git add css/ 
3.	git add . 
.	git commit -m “ adding index.html” 
.	(한번씩 git status 로 남아있는 파일 확인. ) 
.	git remote add origin https://github.com/kes3583/kes3583.github.io.git 
.	git push origin master

git pull

https://github.com/kes3583/javascript30.git

브랜치 바꾸기
git branch --set-upstream-to=origin/ master
.
.	—————————————————————
.
.	config 파일 수정
.
.	$ git config --global --edit
add 한 거 모두 삭제 $ git reset or $git rm -r --cached .
git reset HEAD
- to upstage

 Arguments were expected in this order...
$ git commit a single file/directory
- git commit -m 'gulpfile.js' gulpfile.js

to look at the commit files
git show --stat --name-only

git push 에러
fatal: refusing to merge unrelated histories
* solution - git pull origin master --allow-unrelated-histories
or For new repos, first pulls, it's typically better to start with a git clone

내가 사용할 브랜치 시작알림. a start point
그러면 HEAD가 dev 로 넘어감.
$ git checkout dev

Merge 병합

git checkout master — 마스터 브랜치 이용 시작
git merge dev  — 마스터 브랜치에 dev 디렉토리 를 병합

——————————————————
NPM

delete your packages in your project directory
first check what you have

$ npm ls
$ nom uninstall barba.js
$ npm uninstall --save-dev barba.js

———————
.gitignore

bin/ -- folder
index -- files


 

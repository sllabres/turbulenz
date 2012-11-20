require 'albacore'
require 'peach'

task :default => [:build, :git_commit_and_push]

multitask :build => [:javascript_test, :jslint, :makehtml]

# set path value for phantomjs
task :javascript_test do
	Dir["tests/*.htm"].peach do |file|
		sh "phantomjs resources/run-qunit.js #{file}"		
	end
end

task :jslint do	
	sh "jsl -conf resources/jsl.default.conf"	
end

# using python.exe in the turbulenz env/script directory, added to the windows path environmental variable
task :makehtml do

	game_files = "scripts/GameOfLife.js"

	Dir["scripts/*.js"].each do |file|
		if file != "scripts/GameOfLife.js"			
			game_files = game_files + " " + file	
		end
	end

	puts `maketzjs --mode plugin -t templates -t . -o gameoflife.plugin.tzjs gameoflife.js`
	puts `maketzjs --mode canvas -t templates -t . -o gameoflife.canvas.js gameoflife.js`
end

task :git_commit_and_push do
	puts "Committing changes."
	puts `git add .`	
	puts `git commit -m "Automated Commit"`
	puts `git push origin master`
end

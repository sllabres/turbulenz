require 'albacore'
require 'peach'

task :default => [:build, :git_commit_and_push]

multitask :build => [:javascript_test, :jslint, :makejs]

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
task :makejs do
	makeCommands = ["maketzjs --mode plugin -t templates -t . -o gameoflife.plugin.tzjs gameoflife.js", 
					"maketzjs --mode canvas -t templates -t . -o gameoflife.canvas.js gameoflife.js"];

	compressCommands = ["maketzjs --mode plugin -t templates -t . -o gameoflife.plugin.tzjs gameoflife.js", 
						"maketzjs --mode canvas -t templates -t . -o gameoflife.canvas.js gameoflife.js"];

	makeCommands.peach do |command|
		sh command
	end

	compressCommands.peach do |command|
		sh command
	end
end

task :git_commit_and_push do
	puts "Committing changes."
	puts `git add .`	
	puts `git commit -m "Automated Commit"`
	puts `git push origin master`
end
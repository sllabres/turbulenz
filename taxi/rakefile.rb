require 'albacore'
require 'peach'

@game_name = "taxi"

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
	makeCommands = ["maketzjs --mode plugin -t templates -t . -o #{@game_name}.plugin.tzjs #{@game_name}.js", 
					"maketzjs --mode canvas -t templates -t . -o #{@game_name}.canvas.js #{@game_name}.js"];

	compressCommands = ["uglifyjs -o #{@game_name}.plugin.tzjs #{@game_name}.plugin.tzjs", 
						"uglifyjs -o #{@game_name}.canvas.js #{@game_name}.canvas.js"];

	makeCommands.peach do |command|
		sh command
	end

	compressCommands.peach do |command|
		sh command
	end
end

task :git_commit_and_push do
	puts "Committing changes."
	sh "git add ."
	sh "git commit -m \"Automated Commit\""
	sh "git push origin master"
end

task :publish do
	sh "deploygame -v -i manifest.yaml -u user --project=game-of-life --projectversion=0.1 --user=sllabres --cache H:\\Turbulenz\\SDK\\0.23.1\\devserver\\localdata\\deploycache --ultra"
end
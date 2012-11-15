require 'albacore'
require 'peach'

task :default => [:javascript, :makehtml, :git_commit_and_push]

multitask :javascript => [:javascript_test, :jslint]

# set path value for phantomjs
task :javascript_test do
	Dir["tests/*.htm"].peach do |file|
		phantom_result = `phantomjs resources/run-qunit.js #{file}`
		puts phantom_result if !phantom_result.include? '0 failed'
		fail "Javascript test failure" if !phantom_result.include? '0 failed'
	end	
end

task :jslint do
	Dir["scripts/*.js"].peach do |file|
		if file != "scripts/CellFactory.js"			
			jslint_result = `cscript resources/jslint.js #{file} //nologo`
			puts jslint_result	if jslint_result.include? 'JSLINT'			
			fail "JSLint failure" if jslint_result.include? 'JSLINT'	
		end
	end
end

# using python.exe in the turbulenz env/script directory, added to the windows path environmental variable
task :makehtml do

	game_files = "scripts/GameOfLife.js"

	Dir["scripts/*.js"].peach do |file|
		if file != "scripts/GameOfLife.js"			
			game_files = game_files + " " + file	
		end
	end

	puts `makehtml -t . #{game_files} -o gameoflife.plugin.debug.html --use-strict`
end

task :git_commit_and_push do
	puts "Committing changes."
	puts `git add .`	
	puts `git commit -m "Automated Commit"`
	puts `git push origin master`
end

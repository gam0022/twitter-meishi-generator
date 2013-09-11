def exception_handling(e, filename)
  puts "internal error ><;"

  time = Time.now.strftime("[%y.%m.%d-%H:%M:%S]")
  open(filename, "a") do |f|
    f.puts time
    f.puts e.to_s
    f.puts e.backtrace.join("\n")
    f.puts 
  end
end

def pal(a,left=0,right=a.size-1)
    left ||= 0
    right ||= a.size-1
    puts left
    puts right
  if a.size < 0
    return false
  elsif left >= right
    return true
  elsif a[left] == a[right]
    left += 1
    right -= 1
    pal(a,left,right)
  else
    puts left
    puts right
    puts right
    return false    
  end
end

  a = ["f","i","r","e","l","e","r","i","f"];

  puts pal(a)

  
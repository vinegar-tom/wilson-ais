#Persistent

SetTimer, CheckMinute, 60000
return

CheckMinute:
if A_Min = 55
    MsgBox, 4144, Hourly gate count, Please grab the gate count!, 3300
    return

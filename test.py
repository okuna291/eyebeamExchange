import smtplib
 
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login("raspberrypicallhome@gmail.com'", "picallhome")
 
msg = "YOUR MESSAGE!"
server.sendmail("raspberrypicallhome@gmail.com", "raspberrypicallhome@gmail.com", msg)
server.quit()
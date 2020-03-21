from datetime import datetime, timedelta
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd

driver = webdriver.Chrome("C:\webdriver\chromedriver")
driver.get("https://www.eia.gov/dnav/pet/hist/EER_EPD2F_PF4_Y35NY_DPGD.htm")


product="No.2 Heating Oil"
area="New York Harbor"

Product = []
Area = []
AllDates=[] #List to store all dates
AllPrices=[] #List to store all prices


content = driver.page_source
soup = BeautifulSoup(content, "html.parser")



#1- find all prices
prices = soup.find_all("td", attrs={"class": "B3"})
	
for price in prices:
 AllPrices.append(price.text.replace('\n', ' ').strip())
 Product.append(product)
 Area.append(area)




#2- find all dates 
dates = soup.find_all("td", attrs={"class": "B6"})	

first_date_row = dates[0].text		  # "1986 Jun- 2 to Jun- 6" "1985 Dec-30 to Jan- 3"
last_date_row = dates[-1].text		  #"2020 Feb-24 to Feb-28"


# to get "1985Dec30"
splittedfirst_date_row = first_date_row.split('to')    		#  ['1985 Dec-30 ', ' Jan- 3']
first_date = splittedfirst_date_row[0].split('-')         	#  '1985 Dec', '30'
first_dateyearmonth = first_date[0].split()              	#  '1985','Dec'
first_dateday = first_date[1].strip()          		        #  30
first_dateyear = first_dateyearmonth[0].strip()             #  1985
first_datemonth = first_dateyearmonth[1].strip()            #  Dec


#######################################################################
FinalFromDate = first_dateyear+first_datemonth+first_dateday #1985Dec30 
#######################################################################



# to get "2020Feb28"
splittedlast_date = last_date_row.split('to')                       #  ['2020 Feb-24 ', ' Feb-28']	
fromDate = splittedlast_date[0].split('-')                          #  '2020 Feb' , '24'
toDate = splittedlast_date[1].strip() 								#  Feb-28

# 1- add year to (toDate) to get "2020Feb28"

# first, check if month != Dec then add same year which is 2020
# otherwise, chick if date < 27 then add same year which is 2020
# otherwise, add 1 to 2020 which is 2021

#working on '2020 Feb-24 '
fromDateyearmonth = fromDate[0].split() 							# '2020','Feb'
fromDateday = fromDate[1].strip() 									# 24
fromDateyear = fromDateyearmonth[0].strip() 						# 2020
fromDatemonth = fromDateyearmonth[1].strip() 						# Feb




#working on ' Feb-28'
splittedtoDatemonthday = toDate.split('-')							#'Feb' , '28'
toDatemonth = splittedtoDatemonthday[0].strip() 					# Feb
toDateday = splittedtoDatemonthday[1].strip() 						# 28


if fromDatemonth == 'Dec':
 if fromDateday > '27':
  toDateyear = int(fromDateyear) + 1 								# 2021
  FinalToDate = str(toDateyear) + toDatemonth+toDateday 			# 2021Feb28
 else:
  FinalToDate = fromDateyear+toDatemonth+toDateday 					# 2020Feb28
elif fromDatemonth == toDatemonth:
 FinalToDate = fromDateyear+toDatemonth+toDateday 					# 2020Feb28
else:
 FinalToDate = fromDateyear+toDatemonth+toDateday 					# 2020Feb28
 
 
 
 
 

 # 2- generate all working dates from 1985 Dec-30  to 2020Feb28
sdate = datetime.strptime(FinalFromDate, '%Y%b%d').date()
edate = datetime.strptime(FinalToDate, '%Y%b%d').date()
 

delta = edate - sdate     
x = 0			# to abbend working days only from monday to friday
for i in range(delta.days + 1):
 day = sdate + timedelta(days=i)
 x+=1
 if x==6:
  i+=1
 elif x==7:
  x=0
  i+=1
 else:
  AllDates.append(str(day))


 
 
path='C:\\Users\\User\\Desktop\\'
df = pd.DataFrame({'Price':AllPrices, 'Date':AllDates}) 
df.to_csv(r'C:/Users/User/Desktop/No2HeatingOilNewYorkHarbor.csv', index=False, encoding='utf-8')

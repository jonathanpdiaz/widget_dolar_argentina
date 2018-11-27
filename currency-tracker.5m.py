#!/usr/bin/python
# -*- coding: utf-8 -*-
# <bitbar.title>Currency Tracker</bitbar.title>
# <bitbar.version>1.0</bitbar.version>
# <bitbar.author>Maxime Bertheau</bitbar.author>
# <bitbar.author.github>maxoumime</bitbar.author.github>
# <bitbar.desc>Keep an eye on the currencies you choose from your menu bar !</bitbar.desc>
# <bitbar.image>https://nothingreally.botler.me/bitbar.currency-tracker.png</bitbar.image>

import urllib2
import json
import time

def retryer():
    try:
        url = "https://s3.amazonaws.com/status-coins/nums.json"
        result = urllib2.urlopen(url).read()
        
        jsonCurr = json.loads(result)
        
        items = jsonCurr['items']
        nacion = items[0]
        promedio = items[1]
        riesgo = items[6]
        blue = items[2]
        
        variacion = nacion["dif"]
        ventaFormatted = "$" + str("%.2f" % nacion["venta"])
        if variacion > 2 :
            print "💸 " + ventaFormatted
        elif variacion > 0:
            print "📈 " + ventaFormatted
        elif variacion < 0:
            print "📉 " + ventaFormatted
        else:
            print ventaFormatted
        
        print "---"
        print "🏦 $" + str("%.2f" % nacion["compra"]) + "/$"+ str("%.2f" % nacion["venta"]) + " ~ " + str("%.2f" % nacion["dif"]) + "% | size=12"
        print "📊 $" + str(promedio["compra"]) + "/$"+ str(promedio["venta"]) + " ~ " + str("%.2f" % promedio["dif"]) + "% | size=12"
        print "🔵 $" + str("%.2f" % blue["compra"]) + "/$"+ str("%.2f" % blue["venta"]) + " ~ " + str("%.2f" % blue["dif"]) + "% | size=12"
        print "💣 " + str("%.f" % riesgo["unico"]) + " ~ " + str("%.2f" % riesgo["dif"]) + "% | size=12"
    except IOError:
        time.sleep(5)
        retryer()

retryer()

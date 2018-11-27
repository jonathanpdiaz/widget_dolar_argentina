#!/usr/bin/python
# -*- coding: utf-8 -*-
# <bitbar.title>Dolar Argentina</bitbar.title>
# <bitbar.version>1.0</bitbar.version>
# <bitbar.author>Jony & Raul</bitbar.author>
# <bitbar.author.github>jonathanpdiaz</bitbar.author.github>
# <bitbar.desc>Keep an eye on the Dolar in Argentina !</bitbar.desc>
# <bitbar.image>https://github.com/jonathanpdiaz/widget_dolar_argentina/raw/master/Screen%20Shot%202018-11-27%20at%2013.47.32.png?raw=true</bitbar.image>

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

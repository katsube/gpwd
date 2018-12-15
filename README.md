# gpwd.js

Generate password tool with [node.js](http://nodejs.org) command-line interfaces.

## Installation
```shellsession
$ npm install -g gpwd
```

## Option

### -l, --length
String length option. between 1 to 65536 bytes. Default is 8 bytes.
```shellsession
$ gpwd -l 16
EUMYbMvcyAI4xpO3

$ gpwd -l 128
Z5idYVnl1TJm2RBB6Zga66dbeMFrvk8qEYnXt8B6A5xNy3KrQRQiccJ42X1YhYzP1ythFAMevCM4nMMriRCLMpMJHPb8QkHRcLDs8X1QrP1UPZqQDrN64Plw9FaivW1C

$ gpwd -l 1024
akMusDubOP9xGWwgV9n7HHSN80CeDF8SxRQuNvQBiPwX4xp7aqpoQNRwPYtQGFc4OU1AyluFJkerLYStoVUS1BMerm3o1JY6hvONJ1RVJ8UbznQuG_074imR5QgX3CZ09ckOmD0izIixeUTymz86SxCyOdKUw7LH2q3lU5lWWEAF1nuoRCDHJHCptTA2WUPDYQmQROZ3DUAZwHAuCteWIeT_duPLteYtb_L3QwKJM5hSRucnCOXUBFPW7YWxRhcsPOiZ2jqrzqO44jxcSvUaFFORC8MHofg4zdyaQZOdiXGNoSfyyqTBVOqr1cowpd9BV6Y5lHhf8SA9LVKWm2qoiO0sMC8T1iGNtsVhE0HPQzNw8eqSw0QCkRzisg7iEO85nWuLYx6RKcU54S5p54yr3Cda9w4Yvwl3j6zxM9bIjNyLSNRhqQOsGVpCTuhAh3NeFtHwJgqA3AoW0JpFIXlDo12z60Snev6KjER8MFeHS3AZpfic6H7HH3Pkcdwp80BWPdlTDa4pq0atvHTfAudJ86xySllZ5JsHPFlqLq420Rc8CRYkg4fs01RnQdWuJSs9KIE2O6iDWQqS1jsOqcAGTxXSRpSeYfpS2G7aK0PaKin5h4yii10M7eKdtuwn2uDlKCTTscdOsIBlcy6gk6g2Py0q4cboYjVe2tTToy3hIhX8woVk6LGowmmKEWc2n6ywVWWRCcMOLFFYlCufJ_cWdVsOc5XG0_qCNh1uZ85ZsTDSiCp8qqikF2SlV6B9557KMwzLFfTZ8hi4uDqyp2aBGo9UOdkaGP2ZJhUqThHjrjM6IWtVcl0Ti_r6eacd16UDfSsJ9UAGlTfsGv1boN0V1Vg066tRUjxwuyx5FvX0ZVsvYZdeuombWYHxJuM9CfLFjPYIRorZrIfePIhTFqd2K6vayKp0EiC1Qy2GbumfX4Dr0f9nTpMpp7XxmOPvhpG981X1Yz527FsiYC2FDgK4SyWmaGgBBO82v9CPsnwvgsXW401mpFxK09c5O0TbbdKh
```

### -s, --strength
You can choose the strength of the password in "god", "strong", "normal", "weak". Default is "normal".
```shellsession
$ gpwd -s weak -l 16
zmknwxzsyvbbgffl

$ gpwd -s normal -l 16
4wejB2eSb_woKUys

$ gpwd -s strong -l 16
_cIb8GvAvLWA+qg8

$ gpwd -s god -l 16
OslE&p=OgsaCYg)
```

|  mode   |  base string |
| ------- | ------------------------------------------------------|
| weak    | `abcdefghijklmnopqrstuvwxyz` |
| normal  | weak + `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_` |
| strong  | normal + `.+/` |
| god     | strong + `!"#$%&'()*,;<=>?@\[]^``{|}~` |


### -i, --item
You can choose the number to generate. Default is 1.
```shellsession
$ gpwd -i 10
7cZtAV8t
bNMw19Dp
oVf0XQUZ
WodrTBqC
VzMytwYr
DWF2iZ7n
WXvZ3kBO
BAtM2H7U
7uxZYXDi
Jq9pduFB
```

## License
The MIT License.
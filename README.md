# gpwd.js
Generate password tool with [node.js](http://nodejs.org) command-line interfaces.

## INDEX
1. [Installation](#installation)
1. [Usage](#usage)
    1. [Basic](#basic)
1. [Option](#option)
    1. [-l, --length](#-l---length)
	1. [-s, --strength]("-s---strength)
    1. [-b, --base](#-b---base)
	1. [-i, --item](#-i---item)
1. [License](#license)

## Installation
```
$ npm install -g gpwd
```

## Usage
### Basic
Generate random 8byte string.
```
$ gpwd
Zqp3Lz4I
```

## Option
### -l, --length
String length option. between 1 to 65536 bytes. Default is 8 bytes.
```
$ gpwd -l 16
f2U52CjrPjlcYgyO

$ gpwd -l 128
Pe7cvIASKFK-WmY4oW7WuH3f7qsNROHUYE-zZuLd1GdvjV13-Cjx5B6kdVMlhZGvn2-QFEdn.JShkGPsDxBIE3oiXKCW-KfO9ry-.JzpZ0GseoW2iGreKheboLAVl55i

$ gpwd -l 1024
B30.8LAa_8mOB0gXSTW-ozOZMSad9P2otAKrhHc1fsbGMm62eVxHyX80OCP8qsrwgccfXudm7D5KeTPNl0IjEX9JkDw55wuvkJ1wJyD4WCkaEfyi6hzm.U4d-o_JX5S24CApMjf1366UM_1Cwi07j3qYzUONsqzCOdjHWlMmodQtoMt8OwStXHootN5DjYfLiGpcskbNUfLkqVw19mrVYadWM8sJ0UpbSUQNWFjNd56QVaDJQ_jWBtEtc.QkhLy3oi1n3.W_OuPeix7Z.oPBrV-EQuUgkfHmD1lDsN5Y76b_9cZNeH18mzUlCoVjdkBYfBTiwLdYY20oRnbOWhSw3dCAQefSlPzmLHwhBxggxW8T_wD4y4gqjm3T35v_Lza4b72IhRRPISmABQqLlZwhyhdXAL0LZUClpX5i8HfH_oYNk0e2EyPaomRWhSAENHHs0p9h_eiHM67Q6qG3v8l3IoemxrYrFjA5ebNTbimEpiN5lDgc91tiWh6nOLjzXxr5SKPHe.7jHSlg7.82oFh4hqvWaNEOMlV839TjS-J_j-bqaJxpfABDKDI4tzNA248qAPmto-paoOrcgYfZqTU.Pbrr27DUy-2Fmv2F9fhd3tua26kjK2dQD_MOlfaEC3IeeIQxFhTEfQ9JK6orWKTKzPeaOBRg75DhcFjGKeIl6_cJ_MuRApqCGYvSK1H5vfh9SchNVnZU3T34vs18ySAT14ZvNHkIaVjBWP5ZXC.IvNRL_fH5_W8EyitAY4Z.Nmy2sc71hhHck3tOTGTk3E7av.9V72oIhPsGgHzGUrzgzDfbGtx-LWrB0sCwBDVG_tz2lvzsWT41rKWpyew3gg8y8SPz7feaTTFX47XHX_jUnNn9qFBaEpaM5gufMk3R8MRcSqYp3qAm7f.hy0LIg7ndtUeVgZVE-ig_MJ.kUtnbtR8A4l58axleCBQEbQ0TE8qll4-xoJn6cXL1NA40gZCEX.ZJfo9mncWYe9v89x3Qf7FctMdwUWHU4vpcie8YbBOL
```

### -s, --strength
You can choose the strength of the password in "god", "strong", "normal", "weak". Default is "strong".
```
$ gpwd -s weak -l 16
ttexfrokswnjeiqa

$ gpwd -s normal -l 16
X5CmbohiboF0fnD7

$ gpwd -s strong -l 16
ok3Rh.wEt7IO_QMv

$ gpwd -s god -l 16
%"Eo1.Y0)ZfQ)>~0
```

|  mode   |  base string |
| ------- | ------------------------------------------------------|
| weak    | `abcdefghijklmnopqrstuvwxyz` |
| normal  | weak + `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789` |
| strong  | normal + `.-_` |
| god     | strong + `+/!\"#$%&'()*,;<=>?@[]^`{\|}~` |

You can also specify the character type directly.(v1.1.0 later)

|  mode   |  base string |
| ------- | ------------------------------------------------------|
|  num    | `01234567890` |
| char1   | `.-_` |
| char2   | `+/!\"#$%&'()*,;<=>?@[]^`{\|}~` |
| alpha   | `abcdefghijklmnopqrstuvwxyz` |
| ALPHA   | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| alnum   | alpha + num |
| ALnum   | ALPHA + num |
| Alnum   | ALPHA + alpha + num |
| base64  | ALPHA + alpha + num + `/+=` |

### -b, --base
You can specify the character type used for the password. (v1.2.0 later)

example is like Binary, Hexadecimal and Morse code.
```
$ gpwd -b "01"
10100010

$ gpwd -b "0123456789ABCDEF"
9672AE1C

$ gpwd -b ".-_"
.--.._..
```

Higher priority than -s,--strength option
```
$ gpwd -s god -b "01"
01101110
```

### -i, --item
You can choose the number to generate. Default is 1.
```
$ gpwd -i 10
mWXAiASq
b--ZtW7i
8f97Tdkq
cV5E4FmJ
siHQChPA
4PTESsAV
FpVbMzLc
0FIDaI53
vDJJ.cxU
ahQ3n7XV
```

## License
The MIT License.
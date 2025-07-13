# compatible-boot-theater
This *was* a small patch to Charles Mangin's awesome web page that displays 4AM's Apple II crack movies.  When I checked back recently my code (and his original as well) no longer worked.  So now it's a medium patch to his awesome original idea.

### NEW for INIT HELLO 2025: It actually works again!
![INITLogo](https://i0.wp.com/init-hello.org/wp-content/uploads/2025/03/sketchymonitor-transparent-greentxt-simple-small.png)

**INIT HELLO is an exciting new Apple II conference this year.  See the info at https://init-hello.org.**

New in 2025:

- The API at Internet Archive had changed in some way which broke URL enumerating...
- 4AM has already discovered* and cracked all the software ever available, so now I just have a static listing of his crack movies in the Javascript. This makes startup faster and reduces load on the Internet Archive.  It was also a lot easier than trying to debug the broken fetch logic and encoding on the URL strings...
- I took out the OGG / MP4 compatibility test logic which also had broken on newer browser versions.  It's just MP4 now.  That's disappointing (OGG is smaller for same quality) but this version is intended to be compatible. (I tried a hack that used a Javascript OGG player in Safari but performance in the browser playing multiple simultaneous videos was lousy.)
- It now won't show the same video multiple times on the same screen, which was unattractive and not uncommon on the Mac side where there are many fewer videos.)

\* actual discovery not guaranteed ;)

### NEW for Marchintosh 2023: Now also has a version with 4AM's Mac boot videos! #MARCHintosh

Original Motivation: Charles' orgiginal was hard-coded to use the smaller Ogg video files. Ogg video doesn't work in Safari or in the Mac WebViewScreenSaver (https://github.com/liquidx/webviewscreensaver).  My original patch (now obsolete) detected browser compatibility and subbed in MP4 instead of Ogg.

## Note One: Browsers have changed, and thankfully autoplaying videos with sound (which this relies upon) are generally no longer supported.  If you want to use a non-Safari browser, use the silent versions of the HTML.  Otherwise, you'll probably just see a black screen.  (This is even more strict as time goes on -- what worked in 2023 usually doesn't in 2025.)
## Note Two: Due to sandboxing, loading the HTML in the screensaver using a local file:// URL will likely not work.  If you put the HTML on any old static web server you'll have better luck.  You can try these links straight to the HTML files in this repository if you don't want to host them yourself.

```
https://esoffron.github.io/compatible-boot-theater/compatible_boot_theater_silent.html
```
```
https://esoffron.github.io/compatible-boot-theater/compatible_boot_theater_mac_silent.html
```
Make sure you enter URLs exactly, with no leading or trailing spaces.  The Screen Saver isn't tolerant of whitespace!
### Credits
Original at http://textfiles.com/appleboot/

Follow 4AM at @a2_4am@mastodon.social

Follow Charles Mangin at @Option8@oldbytes.space

Charles Mangin's RetroConnector site (http://retroconnector.com)

https://user-images.githubusercontent.com/4109731/219543457-17785b4e-742e-403f-8fef-9109366de9c0.mp4

https://user-images.githubusercontent.com/4109731/222925444-9a55c5bc-acab-4b41-bdfd-fec7aafefd88.mp4

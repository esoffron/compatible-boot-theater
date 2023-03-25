# compatible-boot-theater
Small patch to Charles Mangin's awesome web page that displays 4AM's Apple II crack movies.

![MARCHintoshLogo](https://user-images.githubusercontent.com/4109731/222930338-a6d13385-3580-4691-9ebe-0e84430cdfdf.png)

### NEW for Marchintosh 2023: Now also has a version with 4AM's Mac boot videos! #MARCHintosh

Charles' orgiginal was hard-coded to use the smaller Ogg video files. Ogg video doesn't work in Safari or in the Mac WebViewScreenSaver (https://github.com/liquidx/webviewscreensaver).  This version will use MPEG4.

## Note One: Browsers have changed, and thankfully autoplaying videos with sound (which this relies upon) are generally no longer supported.  If you want to use a non-Safari browser, use the silent versions of the HTML.  Otherwise, you'll probably just see a black screen.
## Note Two: Due to sandboxing, loading the HTML in the screensaver using a local file:// URL will likely not work.  If you put the HTML on any old static web server you'll have better luck.  You can try these links straight to the HTML files in this repository if you don't want to host them yourself.  For the screensaver, you almost certainly want the URLs that end with "_silent.html"
```
https://rawcdn.githack.com/esoffron/compatible-boot-theater/d462a953fbf2a856dac97cb10047f7ddc8dc91bf/compatible_boot_theater.html
```
```
https://rawcdn.githack.com/esoffron/compatible-boot-theater/d462a953fbf2a856dac97cb10047f7ddc8dc91bf/compatible_boot_theater_silent.html
```
```
https://rawcdn.githack.com/esoffron/compatible-boot-theater/d462a953fbf2a856dac97cb10047f7ddc8dc91bf/compatible_boot_theater_mac.html
```
```
https://rawcdn.githack.com/esoffron/compatible-boot-theater/d462a953fbf2a856dac97cb10047f7ddc8dc91bf/compatible_boot_theater_mac_silent.html
```
Make sure you enter URLs exactly, with no leading or trailing spaces.  The Screen Saver isn't tolerant of whitespace!
### Credits
Original at http://textfiles.com/appleboot/

Follow 4AM at @a2_4am@mastodon.social

Follow Charles Mangin at @Option8@oldbytes.space

Charles Mangin's RetroConnector site (http://retroconnector.com)

https://user-images.githubusercontent.com/4109731/219543457-17785b4e-742e-403f-8fef-9109366de9c0.mp4

https://user-images.githubusercontent.com/4109731/222925444-9a55c5bc-acab-4b41-bdfd-fec7aafefd88.mp4

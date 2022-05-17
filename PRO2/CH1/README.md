JavaScript in Space
===================

### Prompt (shortened):

Design and create a website that is to be used inside  spacecraft. The purpose of
the website is to give information about the trip and to prepare travelers for
upcoming arrival on mars.
    
### Details

The website is made to somewhat resemble a terminal display, though with some exceptions. Borders are used instead of proper border characters, and some of the spacing isn't fully accurate. This was mostly done for styling reasons.

#### Data displays

All of the displayed data points are either randomized within an accurate-ish range of values, based on a bit of research. There are also some (like ETA, distance & fuel) that are calculated based on the targeted "end" time of the trip.

#### Terminal
The "terminal" box at the bottom has a couple of commands it can handle:

- `help`: Displays the help menu.
- `echo`: Prints anything given to it to this terminal.
- `marsweight`: Returns the given earth weight, adjusted for Mars' gravity.


![JavaScript in Space](https://raw.githubusercontent.com/bczsalba/THUAS/master/PRO2/CH1/screenshot.png)

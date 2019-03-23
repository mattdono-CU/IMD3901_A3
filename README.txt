Author: Matthew M. Donoghue, 100977476
Date: March 21th, 2019
Course: IMD3901B
Assignment: 03 | Multi-User Interactions
Title: Chromatose
Instructor: Anthony Scavarelli

Project GitHub: https://github.com/mattdono-CU/IMD3901_A3


# O V E R V I E W - C H R O M A T O S E
Two players find themselves in separate rooms that require coloured blocks to be placed on matching pads on the floor to escape.
Both players have access to a button that will change the colour of their room to reveal blocks and pads of differing colours.
Though, pressing one button randomly changes the colour of BOTH rooms.
If both players are press their buttons at the same time, both rooms will turn white to reveal all coloured blocks and pads.
Players must race against each other and decide when or if to work together to find and place all of their blocks on the correct pads.
Either way, there can only be one winner.

NOTE: users will require a mouse and keyboard to play.

I decided to develop this application exclusively on desktop to embrace the competitive side of the experience by making the playing
field as even as possible. I designed the game with the idea of two players sitting side by side racing against each other to place
their blocks while peeking over at their counterpart's screen to sabotage their efforts by swapping the room colours over and over.
It's an easy-to-understand concept that brings back memories of playing couch-coop games and trying to subtly 'screen-cheat' to get
the upper hand. The collaborative element I implemented, however, is something new in that respect. I wanted to design the
collaboration around the same tasks that both players are trying to complete independently in order to beat their opponent, like
pressing the button to change room colour. I thought: if pressing one room's button independently effects the other room in a,
potentially, negative way, why not allow the two players battling it out side-by-side to call a momentary truce for a mutual advantage?
Some players may race to finish as quickly as they can, some may try to strategically match blocks while pressing their button to hinder
their opposition, and some may find it in their hearts to work together, for better or for worse, in pursuit of their own common, yet
opposing, goals. Either way, every move has an impact on both you and your opponent and things really start to get interesting when both
players get the hang of it. My general goal was to apply a relatively straight forward concept to create rich and interesting user
interactions and I believe I've succeeded in acheiving that goal. Toss blocks across the room, sabotage your opponent, do everything you
can to make sure you're not left chromatose.


# C H A L L E N G E S
The greatest challenge in developing CHROMATOSE was utilizing Socket.io after our limited exposure in class. I originally tried
creating a variety of components to handle different events but that methodology quickly became more complicated than necessary. I
opted for a more direct approach by writing my event management and socket code as a script in the html files for each room (A and B).
It took a lot of time and experimentation to efficiently (or so I think) send, receive, and interpret events and data between the two
rooms and the server. I was running into issues where both rooms were being managed under the same socket instance and decided to add
some backbone to my server by tracking the number of connected users and directing connections to my html documents based on how many
users were currently connected. Building off of this, rather than requiring users to enter the specific page address for their specific
room, I created an index page that redirects connected users based on their order of connection. For example, I can enter the
server:port address and be automatically directed to either room A or room B depending on if I'm the first or second user respectively;
you'll even be sent to a queue page if there are already two users connected (disclaimer: not a real queue, just a colourful web page).
Ultimately, I was able to overcome the many unknown and unexpected challenges with using Socket.io for the first time by meticulously
working through each step, outputting as much data as I possibly could, and trying to account for as many use-cases as I could within
reason for this assignment. There is still an issue where the sound just doesn't play in the main game for an unknown reason that I was
unable to solve, I am simply autoplaying background music and playing a sound when a button is pressed but they fail to load at random.
Others were having the same issue so I am unsure if it's a probelm I can fix or if it's a browser issue.


# W H A T  W E N T  W E L L
I implemented the aframe-physics-system based grabbing constraints used in my term project and it turned out much better on than I
expected. There was some initial trouble with getting it up and running but once I managed to hit the magic switch to get it off the
ground, it felt exactly how I wanted. Players will notice that their reticle expands when they're hovering over a interactable object
and within range. At this point they can click on a block to pick it up and throw it around the room with some pretty satisfying physics
by moving the mouse while holding down the left mouse button and releasing.
The visuals also turned out exactly how I wanted, which I was unsure would happen, with flat shading making objects coloured the same way
as the surrounding walls practically invisible. The colour of the room is randomly chosen each time one of the buttons is pressed which adds
some unpredictale chaos into the mix given that each player cannot see one of their blocks out of the gate. I would love to expand on this
concept by incorporating more engaging puzzles and interactions.
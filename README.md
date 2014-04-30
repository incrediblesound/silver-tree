The Silver Tree
===============

This app uses Node-Webkit to create a desktop game. The Silver Tree contains a story broken up into sections that describe an imaginary civilization. The user is given the titles of each section at the top and a jumbled mix of sentences at the bottom. The game is to put together each section in order by clicking on the sentences in the jumble. Click on the right sentence and it will be added to the section above where it belongs. If there are no correct sentences the user can click "New Jumble" to get a new collection.

To run, clone the app, navigate to the directory and type this into your console:

    ./nw app.nw

Windows users can just drag the app.nw file onto the nw file.

Key players:

app.html 		-> The basic html layout for the game   
silvertree.js 	-> All the data and functions   
package.json 	-> Node-Webkit configuration   
app.nw          -> Executable package

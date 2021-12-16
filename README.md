Rails app generated with [lewagon/rails-templates](https://github.com/lewagon/rails-templates), created by the [Le Wagon coding bootcamp](https://www.lewagon.com) team.


# TrainEQQ app

## Introduction 

This app was created as a final project for the Le Wagon fullstack bootcamp, batch 727. The prupose of the app is to get feedback on the emotional state of online meeting participants, both live and after the meeting session has ended in form of a full report. No pictures or names are stored, the trackign is done annonymously.  


## How to use the app
The app works as an extension for chrome, and currently only works for google meets. In order to run the app, the extension needs to be downloaded (the link below) , and loaded as an extension on chrome. The user will need to register and login before turning on the app. 

Once the user is registered, and the zoom meeting is set up, the user needs to click the toggle button on the extension. The app is now ON. It will give live feedbacks on the emotions of the participants. Once the meeting is done, the toggle botton needs to be clicked one more time, and now the app is off. To get the full report on the meeting, dashboard button needs to be pressed in the extension. The user is redirected to the app dashboard, and the full report the past meeting can be viewed. 

## How does the app work? 
The app runs face-api.js library in the background script. The screenshots of the video are taken once every 3 seconds(can be adjusted). Then the screenshots are fed to the face-api.js library to be analyses, and the resutls are sent as a display and sent to the back-end api for storing. The screenshots are not stored in the process. 


The link to download the extension
https://downgit.github.io/#/home?url=https:%2F%2Fgithub.com%2FSteve-Jobless%2FTrainEQAPP%2Ftree%2Fmaster%2Fchrome-extension

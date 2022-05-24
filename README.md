# chat-frontend

A full-stack node/express,react and mongodb application currently hosted on chatbaze.site , this repo is the frontend for chat-backend repo.

This is a chat application with: 
  src/auth/  - working login and logout . password reset still in beta.
  src/home/  - twitter-style posts on an infinite scrolling feed on which you can reply(tweets.jsx). 
                      - An input component to enter data to post(tweetarea.jsx)
  src/popups - modal for typing input once the user goes past the reply area(tweetinputpopup.jsx), styled with framer motion library
  src/profile - a component to update your username, bio and profile picture(profile.jsx). Accessibility of your profile to others still in beta.
  
  routing with react router (app.jsx)
  styling with vanilla css (to be refactored with css modules later)
  react portals for modals
  context api for app wide state management, context data available in app.jsx component
  
  File uploads available but only for images at the moment. Image files are optimized by lossy compression with react-image-file-resizer before uploading.
  
  Fetch api and React query library for data fetching

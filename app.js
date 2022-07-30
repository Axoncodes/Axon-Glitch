const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
app.use(cors())
const fs = require('fs');
const PORT = process.env.PORT || 3012

app.use((req, res, next) => {
  console.log(`${req.method} : ${req._parsedUrl.path}`);
  next();
})

// INIT
// js
app.get(`/initJs`, (req, res) => res.sendFile(path.join(__dirname, `/registery.js`)))
app.get(`/initJs-dev`, (req, res) => res.sendFile(path.join(__dirname, `/registery-sample.js`)))
// css
// fontVars
app.get(`/fontVarsStyle`, (req, res) => res.sendFile(path.join(__dirname, `/assets/css/fontVars.css`)))
app.get(`/fontVarsStyle-dev`, (req, res) => res.sendFile(path.join(__dirname, `/assets/css/fontVars.css`)))
// colorVars
app.get(`/colorVarsStyle`, (req, res) => res.sendFile(path.join(__dirname, `/assets/css/colorVars.css`)))
app.get(`/colorVarsStyle-dev`, (req, res) => res.sendFile(path.join(__dirname, `/assets/css/colorVars.css`)))


// dropdown
// js
app.get(`/dropdownJs`, (req, res) => res.sendFile(path.join(__dirname, `/dropdown/FuncLibrary.js`)))
app.get(`/dropdownJs-dev`, (req, res) => res.sendFile(path.join(__dirname, `/dropdown/FuncLibrary-sample.js`)))
// css
app.get(`/dropdownStyle`, (req, res) => res.sendFile(path.join(__dirname, `/dropdown/assets/css/style.css`)))
app.get(`/dropdownStyle-dev`, (req, res) => res.sendFile(path.join(__dirname, `/dropdown/assets/css/style.css`)))


// searchbar
// template
app.get(`/searchbarTemplateJs`, (req, res) => res.sendFile(path.join(__dirname, `/searchbar/template/main.js`)))
app.get(`/searchbarTemplateJs-dev`, (req, res) => res.sendFile(path.join(__dirname, `/searchbar/template/main.js`)))
// template-css
app.get(`/searchbarStyle`, (req, res) => res.sendFile(path.join(__dirname, `/searchbar/template/style.css`)))
app.get(`/searchbarStyle-dev`, (req, res) => res.sendFile(path.join(__dirname, `/searchbar/template/style.css`)))

// script
app.get(`/searchbarJs`, (req, res) => res.sendFile(path.join(__dirname, `/searchbar/script/script.js`)))
app.get(`/searchbarJs-dev`, (req, res) => res.sendFile(path.join(__dirname, `/searchbar/script/script.js`)))


// layout activation handler
// js
app.get(`/layoutactivationJs`, (req, res) => res.sendFile(path.join(__dirname, `/activationHandler/index.js`)))
app.get(`/layoutactivationJs-dev`, (req, res) => res.sendFile(path.join(__dirname, `/activationHandler/index.js`)))
// css
app.get(`/layoutactivationStyle`, (req, res) => res.sendFile(path.join(__dirname, `/activationHandler/style.css`)))
app.get(`/layoutactivationStyle-dev`, (req, res) => res.sendFile(path.join(__dirname, `/activationHandler/style.css`)))

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
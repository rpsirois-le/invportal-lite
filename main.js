const path = require('path')
const fs = require('fs')

const resourcePath = !process.env.NODE_ENV || process.env.NODE_ENV == 'production' ? process.resourcePath : __dirname

const uuid = require( 'uuidv4' ).default
const express = require('express')
const Busboy = require('busboy')
const bodyParser = require('body-parser')

const app = express()
const dg = require('./docxgen.js')
app.use(express.static('./build'))
app.use('/static', express.static('./static'))

let server, presets, locations, defaults, glossary, glossaryIndex

const processFormFields = (( req, cb ) => {
    let busboy = new Busboy({
        headers: req.headers})
    let form = {}

    busboy.on('field', ( field, val ) => form[field] = val)
    busboy.on('finish', () => {
        cb(form) } )

    req.pipe(busboy) })

app.get('/', ( req, res ) => {
    res.sendFile(path.join(resourcePath, 'build/index.html')) } )

app.get('/defaults', ( req, res ) => {
    res.json(defaults) } )

app.get('/presets', ( req, res ) => {
    res.json(presets) } )

app.get('/locations', ( req, res ) => {
    res.json(locations) } )

app.get('/glossary', ( req, res ) => {
    res.json(glossary) } )

app.get('/glossaryIndex', ( req, res ) => {
    res.json(glossaryIndex) } )

app.get('/download/:token', ( req, res ) => {
    const p = path.join(resourcePath, 'output', req.params.token)
    res.download(p, () => {
       fs.unlink(p, err => {
           if (err) {console.error(err)} } ) } ) } )

app.post('/arrestwarrant', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateAw(form, res) } ) } )

app.post([ '/pcaffidavit', '/prelim', '/dvm', '/filingdecision' ], ( req, res ) => {
    processFormFields(req, form => {
        dg.generatePcAffidavit(form, form.type, res) } ) } )

app.post('/411', ( req, res ) => {
    processFormFields(req, form => {
        dg.generate411(form, res) } ) } )

app.post('/sw', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateSw(form, res) } ) } )

app.post('/roe', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateRoe(form, res) } ) } )

app.post('/awSeal', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateAwSeal(form, res) } ) } )

app.post('/swSeal', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateSwSeal(form, res) } ) } )

app.post('/dfuform', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateDfuForm(form, res) } ) } )

app.post('/nonDisclosureOrder', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateNonDisclosureOrder(form, res) } ) } )

app.post('/cellebriteReport', ( req, res ) => {
    processFormFields(req, form => {
        dg.generateCellebriteReport(form, res) } ) } )

app.get('/preservationLetter', ( req, res ) => {
    dg.generatePreservationLetter(req.query, ( err, filename ) => {
        if (err) {
            console.error(err)
            res.sendStatus(500) }
        else {
            res.redirect(`../download/${ filename }`) } } ) } )

const port = process.env.PORT || 3001

const startServer = (() => {
    app.listen(port, (() => {
        console.log(`[Investigations Portal] Listening on port ${ port }.`)

        const { app, BrowserWindow, screen } = require('electron')

        const createWindow = (() => {
            const win = new BrowserWindow({
                show: false
              , //, width: screen.width
                //, height: screen.height
                webPreferences:{
                    preload: path.join(resourcePath, 'preload.js') } })

            win.maximize()
            win.show()
            win.loadURL('http://localhost:3001/')
            win.openDevTools()} )

        app.whenReady().then((() => {
            createWindow()

            app.on('activate', (() => {
                if(BrowserWindow.getAllWindows().length === 0) {createWindow()} } ) ) } ) )

        app.on('window-all-closed', (() => {
            if(process.platform !== 'darwin') {app.quit()} } ) ) } ) ) } )

const filesToLoad =[
    'json/presets.json'
  , 'json/locations.json'
  , 'json/defaults.json'
  , 'json/glossary.json'
  , 'json/glossaryIndex.json']

Promise.all(filesToLoad.map(p => {
    return fs.promises.readFile( path.join( resourcePath, p ), 'utf-8' )
        .then(data => JSON.parse(data.trim()))
        .catch(err => console.log(err)) } ) )
.then(data => {
    presets = data[0]
    locations = data[1]
    defaults = data[2]
    glossary = data[3]
    glossaryIndex = data[4]

    try {
        fs.mkdirSync(path.resolve(resourcePath, 'temp')) }
    catch (err) {
        console.log('mkdir path err', err) }

    startServer()} )


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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
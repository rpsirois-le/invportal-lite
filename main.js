const path = require('path')
const fs = require('fs')

process.env.NODE_ENV = 'production'

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
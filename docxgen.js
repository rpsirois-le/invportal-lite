const p = require('path')
const fs = require('fs')

process.env.NODE_ENV = 'production'

const resourcePath = !process.env.NODE_ENV || process.env.NODE_ENV == 'production' ? process.resourcePath : __dirname

const moment = require('moment-timezone')
const Zip = require('pizzip')
const Docx = require('docxtemplater')
const expressions = require('angular-expressions')

expressions.filters.cb = bool => {
    return bool == 'true' ? '☒' : '☐'}

const parser = tag => {
    if (tag === '.') {
        return {
            get: s => s} }

    const expr = expressions.compile(tag.replace(/(’|“|”|‘)/g, "'"))

    return {
        get: s => expr(s) } }

const generateReport = ( filename, data, res, resIsCb=false ) => {
    fs.readFile(p.join( resourcePath, `docx/${ filename }.docx` ), 'binary', ( err, tpl ) => {
        if (err) {
            console.log(err)

            if (resIsCb) {
                res(err) }
            else {
                res.sendStatus(500) } }
        else {
            let zip = new Zip(tpl)
            let doc = new Docx().loadZip( zip ).setOptions({
                parser
                , linebreaks: true})

            // vars available to all docs
            data.today = moment().format('MMMM Do, YYYY')
            data.todayShort = moment().format('M/D/YY')
            data.year = moment().format('YYYY')
            data.now = moment().tz( 'America/Denver' ).format('HHmm')

            doc.setData(data)

            try {
                doc.render()}
            catch (err) {
                console.log(err)

                if (resIsCb) {
                    res(err) }
                else {
                    res.sendStatus(500)
                    return} }

            let buffer = doc.getZip().generate({
                type: 'nodebuffer'})

            const filename = `${ data.filename }.docx`

            fs.writeFile(p.join( resourcePath, 'output' , filename ), buffer, err => {
                if (err) {
                    console.log(err)

                    if (resIsCb) {
                        res(err) }
                    else {
                        res.sendStatus(500) } }
                else {
                    if (resIsCb) {
                        res(false, filename) }
                    else {
                        res.json({
                            filename}) } } } ) } } ) }

module.exports.generate411 = ( data, res ) => {
    data.descriptor = `${ data.defendantName }, DOB ${ data.defendantDob }, ${ data.height }, ${ data.weight } lbs., ${ data.race } ${ data.sex }, ${ data.hair } hair, ${ data.eyes } eyes`

    if (data.hasOwnProperty( 'ssn' ) && data.ssn != '') {
        data.descriptor = `${ data.descriptor }, SSN ${ data.ssn }`}

    if (data.hasOwnProperty( 'ols' ) && data.ols != '') {
        data.descriptor = `${ data.descriptor }, ${ data.ols } driver\'s license ${ data.oln }`}

    generateReport('411', data, res) }

module.exports.generateSw = ( data, res ) => {
    data.usc2705b = data.usc2705b == 'true'
    data.attachmentBItems = JSON.parse( data.attachmentBItems ).map(item => item.description)

    generateReport('sw', data, res) }

module.exports.generateRoe = ( data, res ) => {
    data.items = JSON.parse( data.items ).map(item => item.description)
    data.executionDate = moment( data.executionDate, 'YYYY-MM-DD' ).format('Do [day of] MMMM, YYYY')

    data.filename = `${ data.filename } ROE`
    generateReport('roe', data, res) }

module.exports.generateAw = ( data, res ) => {
    data.descriptor = `${ data.defendantName }, DOB ${ data.defendantDob }, ${ data.height }, ${ data.weight } lbs., ${ data.race } ${ data.sex }, ${ data.hair } hair, ${ data.eyes } eyes`

    if (data.hasOwnProperty( 'ssn' ) && data.ssn != '') {
        data.descriptor = `${ data.descriptor }, SSN ${ data.ssn }`}

    if (data.hasOwnProperty( 'ols' ) && data.ols != '') {
        data.descriptor = `${ data.descriptor }, ${ data.ols } driver\'s license ${ data.oln }`}

    data.offenses = data.charges.split('\n')
    data.victims = JSON.parse( data.victims ).map(v => `${ v.name }${ v.dob ? ' (DOB ' + v.dob + ')' : ''}`)

    generateReport('aw', data, res) }

module.exports.generatePcAffidavit = ( data, type='pcaffidavit', res ) => {
    data.victims = JSON.parse(data.victims)
    data.victimsShort = data.victims.map( v => `${ v.name }${ v.dob ? ' (DOB ' + v.dob + ')' : ''}` ).join(', ')
    data.codefendants = data.hasOwnProperty( 'codefendants' ) ? JSON.parse( data.codefendants ) : ''
    data.charges = data.charges.split('\n')
    data.chargesShort = data.charges.join(', ')

    if (data.hasOwnProperty('arrestedDate') ) {
        data.arrestedDate = moment( data.arrestedDate, 'YYYY-MM-DD' ).format('Do [day of] MMMM, YYYY') }

    let filenameSuffix = ''

    if (type == 'filingdecision') {filenameSuffix = ' FILING DECISION'}
    if (type == 'prelim') {filenameSuffix = ' PRELIM'}
    if (type == 'dvm') {filenameSuffix = ' DVM'}

    data.filename = `${ data.filename }${ filenameSuffix }`
    generateReport(type, data, res) }

module.exports.generateAwSeal = ( data, res ) => {
    data.descriptor = `${ data.defendantName }, DOB ${ data.defendantDob }`

    if (data.hasOwnProperty( 'ssn' ) && data.ssn != '') {
        data.descriptor = `${ data.descriptor }, SSN ${ data.ssn }`}

    data.filename = `${ data.filename } SEAL`
    generateReport('awseal', data, res) }

module.exports.generateSwSeal = ( data, res ) => {
    data.filename = `${ data.filename } SEAL`
    generateReport('swseal', data, res) }

module.exports.generateDfuForm = ( data, res ) => {
    data.notFiled = String(!data.isFiled)
    data.patrol = String(data.baseUnit == 'patrol')
    data.mcu = String(data.baseUnit == 'mcu')
    data.svu = String(data.baseUnit == 'svu')
    data.fcu = String(data.baseUnit == 'fcu')
    data.ciu = String(data.baseUnit == 'ciu')
    data.dfu = String(data.baseUnit == 'dfu')

    generateReport('dfuform', data, res) }

module.exports.generateCellebriteReport = ( data, res ) => {
    data.extractionInfo = data.hasOwnProperty( 'extractionInfo' ) ? JSON.parse( data.extractionInfo ) : ''
    generateReport('cellebriteReport', data, res) }

module.exports.generateNonDisclosureOrder = ( data, res ) => {
    generateReport('nonDisclosureOrder', data, res) }

module.exports.generatePreservationLetter = ( data, cb ) => {
    generateReport('preservationLetter', data, cb, true) }


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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
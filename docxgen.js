const path = require('path')
const fs = require('fs')

const resourcePath = process.resourcesPath || __dirname

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
    fs.readFile(path.resolve( resourcePath, 'docx', `${ filename }.docx` ), 'binary', ( err, tpl ) => {
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

            fs.writeFile(path.resolve( resourcePath, 'output' , filename ), buffer, err => {
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


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3hnZW4uanN5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFzQixBQUFDO0FBQ3ZCLG1CQUFvQixBQUFDOztBQUVyQjs7QUFFQSx1QkFBd0IsQUFBQztBQUN6QixvQkFBcUIsQUFBQztBQUN0QixxQkFBc0IsQUFBQztBQUN2Qiw0QkFBNkIsQUFBQzs7QUFFOUI7SUFDSSxlQUFlLE1BQU0sR0FBRyxHQUFHLEdBQUc7O0FBRWxDO1FBQ00sUUFBUztRQUNQO1lBQ0k7O0lBRVIsaUNBQWtDLFlBQWMsQUFBQyxZQUFZLEVBQUU7O0lBRS9EO1FBQ0ksZUFBZ0I7O0FBRXhCO0lBQ0ksWUFBYSw0QkFBNkIsTUFBTSxFQUFFLEdBQUcsV0FBVyxNQUFNLElBQUksUUFBUTtZQUM1RTtZQUNFLFlBQWE7O2dCQUVYO2dCQUNFLElBQUs7WUFDVDtnQkFDSSxlQUFnQjtRQUN4QjtZQUNJLGtCQUFtQjtZQUNuQjtnQkFDSTtnQkFDQTs7O1lBR0osNkJBQThCLEFBQUM7WUFDL0Isa0NBQW1DLEFBQUM7WUFDcEMsNEJBQTZCLEFBQUM7WUFDOUIsd0JBQXdCLGdCQUFnQixVQUFXLEFBQUM7O1lBRXBELFlBQWE7O1lBRWI7Z0JBQ0k7bUJBQ0M7Z0JBQ0QsWUFBYTs7b0JBRVg7b0JBQ0UsSUFBSztnQkFDVDtvQkFDSSxlQUFnQjtvQkFDaEI7O1lBRVI7Z0JBQ0ksTUFBTTs7WUFFVixpQkFBaUIsR0FBRyxnQkFBZ0I7O1lBRXBDLGFBQWMsNEJBQTZCLFFBQVE7b0JBQzdDO29CQUNFLFlBQWE7O3dCQUVYO3dCQUNFLElBQUs7b0JBQ1Q7d0JBQ0ksZUFBZ0I7Z0JBQ3hCO3dCQUNNO3dCQUNFLElBQUs7b0JBQ1Q7d0JBQ0k7NEJBQ0k7O0FBRTVCO0lBQ0ksa0JBQWtCLEdBQUcscUJBQXFCLFFBQVEsb0JBQW9CLElBQUksY0FBYyxJQUFJLGNBQWMsU0FBUyxZQUFZLEdBQUcsV0FBVyxJQUFJLFlBQVksU0FBUyxZQUFZOztRQUVoTCxxQkFBc0IsS0FBSyxrQkFBa0I7UUFDM0Msa0JBQWtCLEdBQUcsa0JBQWtCLFFBQVEsV0FBVzs7UUFFNUQscUJBQXNCLEtBQUssa0JBQWtCO1FBQzNDLGtCQUFrQixHQUFHLGtCQUFrQixJQUFJLFdBQVcscUJBQXFCLFdBQVc7O0lBRTFGLGVBQWdCLEFBQUMsS0FBSzs7QUFFMUI7SUFDSSxpQ0FBaUM7SUFDakMsZ0VBQWlFOztJQUVqRSxlQUFnQixBQUFDLElBQUk7O0FBRXpCO0lBQ0ksMENBQTJDO0lBQzNDLGlEQUFpRCxZQUFZLFVBQVcsQUFBQzs7SUFFekUsZ0JBQWdCLEdBQUcsZ0JBQWdCO0lBQ25DLGVBQWdCLEFBQUMsS0FBSzs7QUFFMUI7SUFDSSxrQkFBa0IsR0FBRyxxQkFBcUIsUUFBUSxvQkFBb0IsSUFBSSxjQUFjLElBQUksY0FBYyxTQUFTLFlBQVksR0FBRyxXQUFXLElBQUksWUFBWSxTQUFTLFlBQVk7O1FBRWhMLHFCQUFzQixLQUFLLGtCQUFrQjtRQUMzQyxrQkFBa0IsR0FBRyxrQkFBa0IsUUFBUSxXQUFXOztRQUU1RCxxQkFBc0IsS0FBSyxrQkFBa0I7UUFDM0Msa0JBQWtCLEdBQUcsa0JBQWtCLElBQUksV0FBVyxxQkFBcUIsV0FBVzs7SUFFMUYsbUNBQW9DLEFBQUM7SUFDckMsOENBQStDLEtBQU0sR0FBRyxTQUFTLEVBQUUsU0FBUyxRQUFRLFdBQVcsR0FBRyxHQUFHLEdBQUc7O0lBRXhHLGVBQWdCLEFBQUMsSUFBSTs7QUFFekIsa0RBQWtELGFBQWE7SUFDM0QsMEJBQTJCO0lBQzNCLDJDQUEyQyxHQUFHLFNBQVMsRUFBRSxTQUFTLFFBQVEsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVMsQUFBQztJQUN6Ryx5Q0FBeUMsY0FBYyx1Q0FBdUM7SUFDOUYsa0NBQW1DLEFBQUM7SUFDcEMsc0NBQXVDLEFBQUM7O1FBRXRDLG9CQUFzQixBQUFDO1FBQ3JCLCtDQUErQyxZQUFZLFVBQVcsQUFBQzs7SUFFM0UscUJBQXFCOztRQUVuQixRQUFTLG1CQUFtQixpQkFBa0I7UUFDOUMsUUFBUyxXQUFXLGlCQUFrQjtRQUN0QyxRQUFTLFFBQVEsaUJBQWtCOztJQUVyQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsRUFBRSxpQkFBaUI7SUFDdEQsZUFBZ0I7O0FBRXBCO0lBQ0ksa0JBQWtCLEdBQUcscUJBQXFCLFFBQVEsb0JBQW9COztRQUVwRSxxQkFBc0IsS0FBSyxrQkFBa0I7UUFDM0Msa0JBQWtCLEdBQUcsa0JBQWtCLFFBQVEsV0FBVzs7SUFFOUQsZ0JBQWdCLEdBQUcsZ0JBQWdCO0lBQ25DLGVBQWdCLEFBQUMsUUFBUTs7QUFFN0I7SUFDSSxnQkFBZ0IsR0FBRyxnQkFBZ0I7SUFDbkMsZUFBZ0IsQUFBQyxRQUFROztBQUU3QjtJQUNJLHVCQUF3QjtJQUN4QixxQkFBc0IsaUJBQWtCO0lBQ3hDLGtCQUFtQixpQkFBa0I7SUFDckMsa0JBQW1CLGlCQUFrQjtJQUNyQyxrQkFBbUIsaUJBQWtCO0lBQ3JDLGtCQUFtQixpQkFBa0I7SUFDckMsa0JBQW1CLGlCQUFrQjs7SUFFckMsZUFBZ0IsQUFBQyxTQUFTOztBQUU5QjtJQUNJLDJDQUEyQyxnQkFBZ0IseUNBQXlDO0lBQ3BHLGVBQWdCLEFBQUMsa0JBQWtCOztBQUV2QztJQUNJLGVBQWdCLEFBQUMsb0JBQW9COztBQUV6QztJQUNJLGVBQWdCLEFBQUMsb0JBQW9CIn0=
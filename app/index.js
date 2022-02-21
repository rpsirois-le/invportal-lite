import React from 'react'
import ReactDOM from 'react-dom'
import * as UI from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import moment from 'moment-timezone'

import ViewDefault from './components/default.jsy'
import ViewPCAff from './components/pcaff.jsy'
import ViewAW from './components/aw.jsy'
import ViewSW from './components/sw.jsy'
import View411 from './components/411.jsy'
import ViewNonDisclosureOrder from './components/nonDisclosureOrder.jsy'

import ViewSearchWaiver from './components/searchwaiver.jsy'
import ViewPhoneWaiver from './components/phonewaiver.jsy'
import ViewMirandaWarning from './components/miranda.jsy'

import ViewDfuForm from './components/dfuexam.jsy'
import ViewGlossary from './components/glossary.jsy'

class Application extends React.Component ::
    constructor( props ) ::
        super @ props

        const parts = window.location.href.split @ '/'
        let crumb = parts[parts.length-1].replace @ '#', ''

        let defaultView = 'index'

        if crumb == 'dfuform' :: defaultView = 'dfuform'
        else if crumb == 'glossary' :: defaultView = 'glossary'

        this.state = ::
            view: defaultView

    handleIndexClick( e ) ::
        this.setState @:
            view: 'index'

    handlePCAffClick( e ) ::
        this.setState @:
            view: 'pcaff'

    handleAWClick( e ) ::
        this.setState @:
            view: 'aw'

    handleSWClick( e ) ::
        this.setState @:
            view: 'sw'

    handle411Click( e ) ::
        this.setState @:
            view: '411'

    handleNonDisclosureOrderClick( e ) ::
        this.setState @:
            view: 'nonDisclosureOrder'

    handleSearchWaiverClick( e ) ::
        this.setState @:
            view: 'search'

    handlePhoneWaiverClick( e ) ::
        this.setState @:
            view: 'phone'

    handleMirandaClick( e ) ::
        this.setState @:
            view: 'miranda'

    handleDfuExamClick( e ) ::
        this.setState @:
            view: 'dfuform'

    handleGlossaryClick( e ) ::
        this.setState @:
            view: 'glossary'

    render() ::
        let view = <ViewDefault />

        if this.state.view == 'pcaff' :: view = <ViewPCAff />
        if this.state.view == 'aw' :: view = <ViewAW />
        if this.state.view == 'sw' :: view = <ViewSW />
        if this.state.view == '411' :: view = <View411 />
        if this.state.view == 'nonDisclosureOrder' :: view = <ViewNonDisclosureOrder />
        if this.state.view == 'search' :: view = <ViewSearchWaiver />
        if this.state.view == 'phone' :: view = <ViewPhoneWaiver />
        if this.state.view == 'miranda' :: view = <ViewMirandaWarning />
        if this.state.view == 'dfuform' :: view = <ViewDfuForm />
        if this.state.view == 'glossary' :: view = <ViewGlossary />

        return @
            <div>
                <UI.Navbar className="has-shadow">
                    <UI.Container>
                        <UI.Navbar.Brand>
                            <UI.Image src="img/badge.png" size={48} />
                            <UI.Navbar.Item onClick={ e => this.handleIndexClick( e ) }>
                                <UI.Heading>EPSO Investigations</UI.Heading>
                            </UI.Navbar.Item>
                            <UI.Navbar.Burger />
                        </UI.Navbar.Brand>
                        <UI.Navbar.Container position="end">
                            <UI.Navbar.Menu>
                                <UI.Navbar.Item hoverable dropdown>
                                    <UI.Navbar.Link>Research</UI.Navbar.Link>
                                    <UI.Navbar.Dropdown>
                                        <UI.Navbar.Item renderAs="a" href="https://secure.accurint.com/" target="_blank"><UI.Icon><span className="fas fa-search" /></UI.Icon><span>Accurint</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://property.spatialest.com/co/elpaso" target="_blank"><UI.Icon><span className="fas fa-search" /></UI.Icon><span>Assessor</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://us.availweb.net/avail" target="_blank"><UI.Icon><span className="fas fa-video" /></UI.Icon><span>Avail</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.sos.state.co.us/biz/BusinessEntityCriteriaExt.do" target="_blank"><UI.Icon><span className="fas fa-building" /></UI.Icon><span>Colorado Business Search</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.jbits.courts.state.co.us/pas/pubaccess/" target="_blank"><UI.Icon><span className="fas fa-globe" /></UI.Icon><span>Colorado State Courts Data Access</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="http://www.lexisnexis.com/hottopics/Colorado" target="_blank"><UI.Icon><span className="fas fa-book" /></UI.Icon><span>Colorado Statutes</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.doc.state.co.us/oss/" target="_blank"><UI.Icon><span className="fas fa-house-user" /></UI.Icon><span>DOC Inmate Locator</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="http://ccic.state.co.us:8080/COL" target="_blank"><UI.Icon><span className="fab fa-searchengin" /></UI.Icon><span>OpenFox</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://dpo.colorado.gov/PDMP/Forms" target="_blank"><UI.Icon><span className="fas fa-prescription-bottle" /></UI.Icon><span>Colorado Prescription Drug Monitoring Program</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://lea.sotar.us" target="_blank"><UI.Icon><span className="fab fa-searchengin" /></UI.Icon><span>SOTAR</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://tloxp.tlo.com/login" target="_blank"><UI.Icon><span className="fas fa-search" /></UI.Icon><span>TLOxp</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://epsobrowser.eptc911.org/VisiNetBrowser/Login.aspx" target="_blank"><UI.Icon><span className="fas fa-headset" /></UI.Icon><span>Visinet</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://epsocad.xyz/VisiNetBrowser/Login.aspx" target="_blank"><UI.Icon><span className="fas fa-headset" /></UI.Icon><span>Visinet OLD 11/19/03 - 1/7/20</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item renderAs="a" href="https://hawkanalytics.com/login" target="_blank"><UI.Icon><span className="fas fa-mobile-alt" /></UI.Icon><span>Cellhawk</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://cbilab.state.co.us/" target="_blank"><UI.Icon><span className="fas fa-vial" /></UI.Icon><span>CBI Lab</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://glimpse.geotime.com" target="_blank"><UI.Icon><span className="fas fa-map-marked-alt" /></UI.Icon><span>Glimpse</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://mcl-portal.coloradosprings.gov/portal" target="_blank"><UI.Icon><span className="fas fa-fingerprint" /></UI.Icon><span>LIMS</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.nettranscripts.com/ordercenter" target="_blank"><UI.Icon><span className="fas fa-language" /></UI.Icon><span>NetTranscripts</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://webshuttle-login.com/" target="_blank"><UI.Icon><span className="fas fa-language" /></UI.Icon><span>WebShuttle</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://riss.net" target="_blank"><UI.Icon><span className="fas fa-globe-americas" /></UI.Icon><span>RISS</span></UI.Navbar.Item>
                                    </UI.Navbar.Dropdown>
                                </UI.Navbar.Item>
                                <UI.Navbar.Item hoverable dropdown>
                                    <UI.Navbar.Link>Forms</UI.Navbar.Link>
                                    <UI.Navbar.Dropdown>
                                        <UI.Navbar.Item renderAs="a" href="../static/Arrest Warrant - Fillable.docx" target="_blank"><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Arrest Warrant Fillable</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/COPR - Fillable.doc" target="_blank"><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>COPR Fillable</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/Search Warrant - Fillable.docx" target="_blank"><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Search Warrant Fillable</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/411 - Fillable.docx" target="_blank"><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Rule 41.1 Order Fillable</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item renderAs="a" href="../static/Biological Sample Waiver.pdf" target="_blank"><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Biological Waiver</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../resources/Forms/Waivers/Digital Device and Data Search Waiver.docx" target="_blank"><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Digital Device and Data Search Waiver</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/Juvenile Waiver.pdf" target="_blank"><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Juvenile Waiver</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/Miranda Waiver.pdf" target="_blank"><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Miranda Waiver</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/Search Waiver.pdf" target="_blank"><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Search Waiver</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item renderAs="div">
                                            <UI.Dropdown label="Spanish Forms" hoverable up>
                                                <UI.Dropdown.Item renderAs="a" href="../static/spanish/Biological Sample Release Waiver SPANISH.docx" target="_blank" value=""><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Biological Sample Release Waiver</span></UI.Dropdown.Item>
                                                <UI.Dropdown.Item renderAs="a" href="../static/spanish/Digital Device and Data Search Waiver SPANISH.docx" target="_blank" value=""><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Digital Device and Data Search Waiver</span></UI.Dropdown.Item>
                                                <UI.Dropdown.Item renderAs="a" href="../static/spanish/Extent of Injury SPANISH.docx" target="_blank" value=""><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Extent of Injury</span></UI.Dropdown.Item>
                                                <UI.Dropdown.Item renderAs="a" href="../static/spanish/Juvenile Waiver SPANISH.docx" target="_blank" value=""><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Juvenile Waiver</span></UI.Dropdown.Item>
                                                <UI.Dropdown.Item renderAs="a" href="../static/spanish/New Miranda Waiver SPANISH.docx" target="_blank" value=""><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Miranda Waiver</span></UI.Dropdown.Item>
                                                <UI.Dropdown.Item renderAs="a" href="../static/spanish/New Search Waiver SPANISH.docx" target="_blank" value=""><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Search Waiver</span></UI.Dropdown.Item>
                                                <UI.Dropdown.Item renderAs="a" href="../static/spanish/Victim Statement SPANISH.docx" target="_blank" value=""><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>Victim Statement</span></UI.Dropdown.Item>
                                            </UI.Dropdown>
                                        </UI.Navbar.Item>
                                    </UI.Navbar.Dropdown>
                                </UI.Navbar.Item>
                                <UI.Navbar.Item hoverable dropdown>
                                    <UI.Navbar.Link>Generators</UI.Navbar.Link>
                                    <UI.Navbar.Dropdown>
                                        <UI.Navbar.Item onClick={ e => this.handleAWClick( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Arrest Warrant</span></UI.Navbar.Item>
                                        <UI.Navbar.Item onClick={ e => this.handlePCAffClick( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>PC Affidavit</span></UI.Navbar.Item>
                                        <UI.Navbar.Item onClick={ e => this.handleSWClick( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Search Warrant</span></UI.Navbar.Item>
                                        <UI.Navbar.Item onClick={ e => this.handle411Click( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Rule 41.1 Order</span></UI.Navbar.Item>
                                        <UI.Navbar.Item onClick={ e => this.handleNonDisclosureOrderClick( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Non-Disclosure Order</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item onClick={ e => this.handleGlossaryClick( e ) }><UI.Icon><span className="fas fa-book" /></UI.Icon><span>Glossary</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item onClick={ e => this.handleDfuExamClick( e ) }><UI.Icon><span className="fas fa-file-word" /></UI.Icon><span>DFU Examination</span></UI.Navbar.Item>
                                        {/*
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item onClick={ e => this.handleSearchWaiverClick( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Search Waiver</span></UI.Navbar.Item>
                                        <UI.Navbar.Item onClick={ e => this.handlePhoneWaiverClick( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Cell Phone Waiver</span></UI.Navbar.Item>
                                        <UI.Navbar.Item onClick={ e => this.handleMirandaClick( e ) }><UI.Icon><span className="fas fa-file-pdf" /></UI.Icon><span>Miranda Warning</span></UI.Navbar.Item>
                                        */}
                                    </UI.Navbar.Dropdown>
                                </UI.Navbar.Item>
                                <UI.Navbar.Item hoverable dropdown>
                                    <UI.Navbar.Link>Subpoena Portals</UI.Navbar.Link>
                                    <UI.Navbar.Dropdown>
                                        <UI.Navbar.Item renderAs="a" href="https://ler.amazon.com" target="_blank"><UI.Icon><span className="fab fa-amazon" /></UI.Icon><span>Amazon + Twitch</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://legalportal.capitalone.com/" target="_blank"><UI.Icon><span className="fas fa-credit-card" /></UI.Icon><span>Capital One</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://clrp.spectrum.com/" target="_blank"><UI.Icon><span className="fas fa-network-wired" /></UI.Icon><span>Charter Communications (Spectrum)</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://lea.comcast.com/register" target="_blank"><UI.Icon><span className="fas fa-network-wired" /></UI.Icon><span>Comcast</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://facebook.com/records/login" target="_blank"><UI.Icon><span className="fab fa-facebook" /></UI.Icon><span>Facebook + Instagram</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://lers.google.com" target="_blank"><UI.Icon><span className="fab fa-google" /></UI.Icon><span>Google</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://lyft.mailroom.datagov360.com/intake-form" target="_blank"><UI.Icon><span className="fab fa-lyft" /></UI.Icon><span>Lyft</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://leportal.microsoft.com" target="_blank"><UI.Icon><span className="fab fa-microsoft" /></UI.Icon><span>Microsoft</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://lawenforcementrequests.oath.com" target="_blank"><UI.Icon><span className="fab fa-yahoo" /></UI.Icon><span>Oath Holdings, Inc. (Yahoo) + Oath, Inc. (AOL)</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://safetyhub.paypalcorp.com" target="_blank"><UI.Icon><span className="fab fa-paypal" /></UI.Icon><span>PayPal</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://less.snapchat.com" target="_blank"><UI.Icon><span className="fab fa-snapchat" /></UI.Icon><span>Snapchat</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://customerservice.starbucks.com/app/contact/security_video_requests/" target="_blank"><UI.Icon><span className="fas fa-coffee" /></UI.Icon><span>Starbucks (Video Requests)</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://lert.uber.com/s/portal-submission?language=en_US" target="_blank"><UI.Icon><span className="fab fa-uber" /></UI.Icon><span>Uber</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.search.org/resources/isp-list/" target="_blank"><UI.Icon><span className="fas fa-network-wired" /></UI.Icon><span>(Search for all others.)</span></UI.Navbar.Item>
                                    </UI.Navbar.Dropdown>
                                </UI.Navbar.Item>
                                <UI.Navbar.Item hoverable dropdown>
                                    <UI.Navbar.Link>Resources</UI.Navbar.Link>
                                    <UI.Navbar.Dropdown>
                                        <UI.Navbar.Item renderAs="a" href="../static/Bond Schedule.pdf" target="_blank"><UI.Icon><span className="fas fa-balance-scale" /></UI.Icon><span>Bond Schedule</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="mailto:04warrantclerk@judicial.state.co.us"><UI.Icon><span className="fas fa-at" /></UI.Icon><span>Court Clerk Email (ROEs)</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="mailto:04oncalljudge@judicial.state.co.us"><UI.Icon><span className="fas fa-at" /></UI.Icon><span>Duty Judge Email</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/Duty Judge.pdf" target="_blank"><UI.Icon><span className="fas fa-gavel" /></UI.Icon><span>Duty Judge Schedule</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/Hot Sheet.pdf" target="_blank"><UI.Icon><span className="fas fa-file-alt" /></UI.Icon><span>Hot Sheet</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/MFR Guide.pdf" target="_blank"><UI.Icon><span className="fas fa-book-open" /></UI.Icon><span>MFR Guide</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item renderAs="a" href="../static/directories/Phone List - Courts.xlsx" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone List - Courts</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/directories/Phone List - DA Investigators.doc" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone List - DA Investigators</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/directories/Phone List - DDAs.docx" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone List - DDAs</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/directories/Phone List - CSPD.xlsx" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone List - CSPD</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/directories/Phone List - EPSO.xlsx" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone List - EPSO</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/directories/Phone List - EPSO Investigations.xlsx" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone List - EPSO Investigations</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/directories/Phone List - Metro Crime Lab.docx" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone List - Metro Crime Lab</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item renderAs="a" href="../static/Community Resources.docx" target="_blank"><UI.Icon><span className="fas fa-globe-americas" /></UI.Icon><span>Community Resources</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="../static/County Statutes.pdf" target="_blank"><UI.Icon><span className="fas fa-clipboard-list" /></UI.Icon><span>County Ordinance Violation Guide</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="http://www.4thjudicialda.com/GoingToCourt.html" target="_blank"><UI.Icon><span className="fas fa-globe" /></UI.Icon><span>Court Calloffs</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.epcsheriffsoffice.com/" target="_blank"><UI.Icon><span className="fas fa-globe" /></UI.Icon><span>EPSO Public Website</span></UI.Navbar.Item>
                                    </UI.Navbar.Dropdown>
                                </UI.Navbar.Item>
                                <UI.Navbar.Item hoverable dropdown>
                                    <UI.Navbar.Link>Tech Links</UI.Navbar.Link>
                                    <UI.Navbar.Dropdown>
                                        <UI.Navbar.Item renderAs="a" href="https://www.arin.net/" target="_blank"><UI.Icon><span className="fas fa-globe" /></UI.Icon><span>ARIN (IP Address Lookup)</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.ip2location.com/" target="_blank"><UI.Icon><span className="fas fa-globe" /></UI.Icon><span>IP Address Lookup</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.imei.info/" target="_blank"><UI.Icon><span className="fas fa-mobile-alt" /></UI.Icon><span>IMEI Lookup (Get Phone Info)</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://www.phonescoop.com/" target="_blank"><UI.Icon><span className="fas fa-phone" /></UI.Icon><span>Phone Scoop (Phone Hardware Info)</span></UI.Navbar.Item>
                                        <UI.Navbar.Item renderAs="a" href="https://phonelookup.zetx.com/" target="_blank"><UI.Icon><span className="fas fa-address-book" /></UI.Icon><span>ZETX Phone Lookup</span></UI.Navbar.Item>
                                        <UI.Navbar.Divider />
                                        <UI.Navbar.Item renderAs="a" href="https://www.walletexplorer.com/" target="_blank"><UI.Icon><span className="fab fa-bitcoin" /></UI.Icon><span>Wallet Explorer (Bitcoin Only)</span></UI.Navbar.Item>
                                    </UI.Navbar.Dropdown>
                                </UI.Navbar.Item>
                            </UI.Navbar.Menu>
                        </UI.Navbar.Container>
                    </UI.Container>
                </UI.Navbar>
                <UI.Section>
                    { view }
                </UI.Section>
                <UI.Footer>
                    <UI.Container>
                        <UI.Content style={{ textAlign: 'center' }}>
                            <p><strong>&copy;{ moment().format( 'YYYY' ) } Universes Games</strong></p>
                            Content last updated: 7/28/2021 (ported on 2/21/22)<br />
                            <strong>***</strong>This is the portable version - updates coming soon!<strong>***</strong>
                        </UI.Content>
                    </UI.Container>
                </UI.Footer>
            </div>

ReactDOM.render @ <Application />, document.getElementById @ 'app'

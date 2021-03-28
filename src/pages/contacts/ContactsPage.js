import React from 'react';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import skills from '../../static/config';

import './ContactsPage.scss';

const ContactsPage = () => (
    <div className="about-me">
        <div className="about-me__title">
            <h1 className="about-me__title-text">About me</h1>
            <div className="about-me__avatar"></div>
        </div>
        <div className="about-me__content">
            <h2 className="about-me__name-text">Gryn Andriy</h2>
            <p className="about-me__position-text">Front-end Developer</p>
            <div className="about-me__email-container">
                <span className="about-me__email-text-container">
                    <PhoneIphoneIcon className="about-me__email-icon" />
                    068-806-73-85
                </span>
                <span className="about-me__email-text-container">
                    <MailOutlineIcon className="about-me__email-icon" />
                    AndGreNik@gmail.com
                </span>
            </div>
            <h2 className="about-me__subtitle">Summary</h2>
            <p>
                Hard-working middle-level front-end developer. Looking for new
                challenges. Learning extremely fast. Have a flexible mind.
                Stress resistant, positive person. (Location: only Kyiv).
            </p>
            <h2 className="about-me__subtitle">Professional Skills</h2>
            <div className="about-me__skill-container">
                {skills.map((item, i) => (
                    <span key={i} className="about-me__skill-item">
                        {item}
                    </span>
                ))}
            </div>
            <h2 className="about-me__subtitle">Work Experience</h2>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>Kiy Avia</p>
                    <p>software engineer, programmer</p>
                    <p>01/2012 - 10/2018</p>
                </div>
                <div className="about-me__work-cell">
                    <p>IP telephony, 1C</p>
                </div>
            </div>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>freelance</p>
                    <p>front-end developer</p>
                    <p>10/2018 - 06/2019</p>
                </div>
                <div className="about-me__work-cell">
                    <p>Front-end developer;</p>
                </div>
            </div>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>Doruk</p>
                    <p>front-end developer</p>
                    <p>07/2019 - </p>
                </div>
                <div className="about-me__work-cell">
                    <p>Front-end developer, React</p>
                </div>
            </div>
            <h2 className="about-me__subtitle">Education</h2>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>NTUU KPI</p>
                    <p>2004 - 2009</p>
                </div>
                <div className="about-me__work-cell">
                    <p>
                        Radio Engineering Faculty, Engineer of electronic
                        household appliances.
                    </p>
                </div>
            </div>
            <h2 className="about-me__subtitle">Certificates</h2>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>2017</p>
                </div>
                <div className="about-me__work-cell">
                    <p>IT Education Academy (ITEA), ofline course:</p>
                    <ul>
                        <li>Basics of programming</li>
                        <li>HTML, CSS (red diploma)</li>
                        <li>JavaScript Base</li>
                        <li>JavaScript Advanced</li>
                        <li>JavaScript Professional</li>
                        <li>ReactJS Base</li>
                    </ul>
                </div>
            </div>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>2018</p>
                </div>
                <div className="about-me__work-cell">
                    <p>“IT Stolitsa”, ofline course:</p>
                    <ul>
                        <li>PHP Basics</li>
                    </ul>
                </div>
            </div>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>2018</p>
                </div>
                <div className="about-me__work-cell">
                    <p>Free Code Camp, online courses:</p>
                    <ul>
                        <li>Responsive Web Design</li>
                        <li>
                            Javascript Algorithms and Data Structures
                            Certiication
                        </li>
                        <li>Front End Libraries Certiication</li>
                    </ul>
                </div>
            </div>
            <h2 className="about-me__subtitle">About</h2>
            <div className="about-me__work-exp-row">
                <div className="about-me__company-cell">
                    <p>Work preferences</p>
                </div>
                <div className="about-me__work-cell">
                    <p>
                        I am experienced in solving front end related tasks and
                        enjoy doing it. My goal is to enhance my skills and grow
                        as a front-end specialist. I am an easy-going person and
                        a good team-player.
                    </p>
                    <a
                        href=" https://linkedin.com/in/andry-green-6b8645154"
                        className="about-me__link">
                        <p>LinkedIn</p>
                    </a>
                    <a
                        href="https://github.com/DrGreenNow"
                        className="about-me__link">
                        <p>GitHub</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default ContactsPage;

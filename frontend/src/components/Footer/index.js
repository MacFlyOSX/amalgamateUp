import React from "react";
import githubPurple from '../../icons/githubPurple.svg';
import githubGrey from '../../icons/githubGrey.svg';
import linkedinGrey from '../../icons/linkedinGrey.svg';
import linkedinBlue from '../../icons/linkedinBlue.svg';
import './Footer.css';

export default function Footer({ isLoaded }) {

    return (
        <div className="footer">
            <div className="footer-left">
                <p className="footer-left-text">
                    dev: Brandon Tasaki
                </p>
            </div>
            <div className="footer-right">
                <a href='https://github.com/MacFlyOSX/amalgamateUp' target='_blank'>
                    <div className="github">
                        <img src={githubGrey} style={{ height: 45 }} alt='github' className="github-bottom"></img>
                        <img src={githubPurple} style={{ height: 45 }} alt='github' className="github-top"></img>
                    </div>
                </a>
                <a href='https://www.linkedin.com/in/brandon-tasaki/' target='_blank'>
                    <div className="linkedin">
                        <img src={linkedinGrey} style={{ height: 45 }} alt='linkedin' className="linkedin-bottom"></img>
                        <img src={linkedinBlue} style={{ height: 45 }} alt='linkedin' className="linkedin-top"></img>
                    </div>
                </a>
            </div>
        </div>
    )
}

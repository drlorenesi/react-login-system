import React from 'react';
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="main-footer container-fluid">
      <div className="container-fluid">
        <div className="row text-center">
          <p>
            &copy; {new Date().getFullYear()} COMPANY | and some other legal
            stuff.
          </p>
          <p>
            <a
              href="https://github.com/drlorenesi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size="1.5em" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

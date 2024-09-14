import "./SeniorProject.css";
import "./InstaBioUpdater.css";
import { React, useState, useEffect } from "react";

const InstaBioUpdater = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidthInPixels = window.innerWidth;

      if (screenWidthInPixels <= 1320) {
        setIsMobileWidth(true);
      } else {
        setIsMobileWidth(false);
      }
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="project-slide sp-main instaCont" id="insta">
      <div
        className="imageHolder"
        style={{ display: isMobileWidth ? "none" : "grid" }}
      >
        <img
          src="/images/Insta.gif"
          rel="noreferrer"
          alt="Browser control by Selenium and BeautifulSoup"
        />
      </div>
      <div className="description">
        <div className="desc-grid-item-1">
          <h1>Automatic Update of Instagram Bio</h1>
        </div>
        <div className="desc-grid-item-2">
          <p>
            Using Selenium Webdriver I changed my instagram bio to a planet's
            loaction
          </p>
          <br />
          <div>
            <ul>
              <li className="ltitle">Python Libraries:</li>
              <ul>
                <li>
                  <a
                    href="https://www.selenium.dev/documentation/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Selenium
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.crummy.com/software/BeautifulSoup/bs4/doc/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    BeautifulSoup
                  </a>
                </li>
              </ul>
            </ul>
            <hr />
            <ul>
              <li className="ltitle">Worked on:</li>
              <ul>
                <li>APIs</li>
                <li>Automation</li>
                <li>Webscraping</li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="desc-grid-item-3">
          <div style={{ display: isMobileWidth ? "none" : "grid" }}>
            <p>Enjoy the show!</p>
          </div>
          <img
            style={{ display: isMobileWidth ? "grid" : "none" }}
            src="/images/Insta.gif"
            rel="noreferrer"
            alt="Browser control by Selenium and BeautifulSoup"
          />
        </div>
      </div>
    </div>
  );
};

export default InstaBioUpdater;

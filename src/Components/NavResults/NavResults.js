import React from "react";
import {
  NavdataHeader,
  HeaderTitle,
  NavdataList,
  NavResultsContainer,
  NavRow,
  NavRowItem,
  NavDate,
  BackButton

} from "../styles/home";
import backButton from "../../assets/back-button.svg";

const HEADER_TITLES = ["Month", "Returns", "Calculations"];

const NavResults = ({ navRows, goBack }) => {
  return (
    <>
      <BackButton
              src={backButton}
              onClick={goBack}
            />
      <NavResultsContainer>
        <NavdataHeader>
          {HEADER_TITLES.map((title, index) => (
            <HeaderTitle key={index}>{title}</HeaderTitle>
          ))}
        </NavdataHeader>
        <NavdataList>
          {navRows.map((navRow) => (
            <NavRow key={navRow.startNavDate.toString()}>
              <NavRowItem>{navRow.month}</NavRowItem>
              <NavRowItem>{navRow.returns}%</NavRowItem>
              <NavRowItem>
                <NavDate>
                  Start nav - <span>{navRow.startNavDate}</span>
                </NavDate>
                <NavDate>
                  End nav - <span>{navRow.endNavDate}</span>
                </NavDate>
              </NavRowItem>
            </NavRow>
          ))}
        </NavdataList>
      </NavResultsContainer>
    </>
  );
};

export default NavResults;

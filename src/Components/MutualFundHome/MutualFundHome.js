import React, { useState } from "react";
import {
  MainContainer,
  FormContainer,
  Input,
  Label,
  InputContainer,
  Button,
  Footer,
  BackButton,
} from "../styles/home";

import backButton from "../../assets/back-button.svg";

import { fetchNavDetails } from "../../api/mutualfund";
import { getNavRows } from "../../utils/calculateNavData";

import NavResults from "../NavResults/index";

const MutualFundHome = () => {
  const [schemeDetails, setSchemeDetails] = useState({
    schemeNumber: "",
    investmentPeriod: "",
    horizon: "",
  });
  const [isFetchingNavDetails, setIsFetchingNavDetails] = useState(false);

  const [navData, setNavData] = useState([]);

  const [showNavResults, setShowNavResults] = useState(false);

  const [navRows, setNavRows] = useState([]);

  const [footerText, setFooterText] = useState("");

  const [step, setStep] = useState(1);

  const downloadNavDetails = async () => {
    setIsFetchingNavDetails(true);
    let response;
    try {
      response = await fetchNavDetails(schemeDetails.schemeNumber);
      if (response.data.length !== 0) {
        setNavData(response.data);
        setStep(2);
      }
    } catch (e) {
      setFooterText("Please enter the correct scheme number");
    } finally {
      setIsFetchingNavDetails(false);
      if (
        !response ||
        response.data.length === 0 ||
        (response.meta && Object.keys(response.meta).length === 0)
      ) {
        setFooterText("Please enter the correct scheme number");
      } else {
        setFooterText("Details fetched successfully!");
      }
    }
  };

  const handleShowReturns = () => {
    const { investmentPeriod, horizon } = schemeDetails;
    const data = {
      navData,
      horizon,
      investmentPeriod,
    };
    const navDataRows = getNavRows(data);
    setNavRows(navDataRows);
    setShowNavResults(true);
    setFooterText('');
  };

  const handleBackButton = () => {
    setShowNavResults(false);
    setNavData([]);
    setNavRows([]);
    setFooterText("");
    setSchemeDetails({
      schemeNumber: "",
      investmentPeriod: "",
      horizon: "",
    });
    setStep(1);
  };

  return (
    <MainContainer>
      {!showNavResults ? (
        <FormContainer>
          {step !== 1 && (
            <BackButton
              src={backButton}
              onClick={() => {
                setStep(1);
                setFooterText('');
              }}
            />
          )}
          {step === 1 && (
            <>
              <InputContainer>
                <Label htmlFor="schemeNumber"> Scheme Number</Label>
                <Input
                  name="schemeNumber"
                  type="text"
                  onChange={({ target: { value: schemeNumber } }) => {
                    setSchemeDetails((prevState) => ({
                      ...prevState,
                      schemeNumber,
                    }));
                    setFooterText("");
                  }}
                  value={schemeDetails.schemeNumber}
                />
              </InputContainer>
              <Button
                onClick={() => {
                  downloadNavDetails();
                }}
                disabled={!schemeDetails.schemeNumber}
              >
                {isFetchingNavDetails
                  ? `Fetching Details for  ${schemeDetails.schemeNumber}`
                  : "Fetch Nav Details"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <InputContainer>
                <Label htmlFor="investmentPeriod"> Period of investment</Label>
                <Input
                  name="investmentPeriod"
                  type="text"
                  maxLength="2"
                  onFocus={()=> {setFooterText('')}}
                  onChange={({ target: { value: investmentPeriod } }) => {
                    setSchemeDetails((prevState) => ({
                      ...prevState,
                      investmentPeriod: investmentPeriod.replace(
                        /[^0-9]+/g,
                        ""
                      ),
                    }));
                    setFooterText("");
                  }}
                  value={schemeDetails.investmentPeriod}
                />
              </InputContainer>

              <InputContainer>
                <Label htmlFor="horizon"> Horizon</Label>
                <Input
                  name="horizon"
                  type="text"
                  maxLength="2"
                  onFocus={()=> {setFooterText('')}}
                  onChange={({ target: { value: horizon } }) => {
                    setSchemeDetails((prevState) => ({
                      ...prevState,
                      horizon: horizon.replace(/[^0-9]+/g, ""),
                    }));
                    setFooterText("");
                  }}
                  value={schemeDetails.horizon}
                />
              </InputContainer>

              <Button onClick={handleShowReturns} disabled={!(schemeDetails.investmentPeriod && schemeDetails.horizon)}>Show returns</Button>
            </>
          )}
        </FormContainer>
      ) : (
        <NavResults navRows={navRows} goBack={handleBackButton} />
      )}
      {footerText ? <Footer isError={step === 1}>{footerText}</Footer> : null}
    </MainContainer>
  );
};

export default MutualFundHome;

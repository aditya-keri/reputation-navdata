import styled from "styled-components";

const MainContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background: #1488cc;
  display: grid;
  place-items: center;
  font-family: sans-serif;
`;

const FormContainer = styled.div`
  height: 40%;
  width: 50%;
  background: rgba(250, 250, 250, 1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const BackButton = styled.img`
  position: absolute;
  top: 30px;
  left: 30px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: baseline;
  height: 50px;
  position: relative;
  margin: 20px 0;
`;

const Input = styled.input`
  height: 2rem;
  border-color: #1488cc;
  border-radius: 40px;
  z-index: 2;
  padding-left: 15px;
  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #1488cc;
  font-weight: bold;
  width: 200px;
`;

const Button = styled.button`
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  background: ${({ disabled }) => (disabled ? "#a9a9a9" : "#1488CC")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  border-radius: 40px;
  margin-top: 10px;
  &:focus {
    outline: none;
  }
`;

const NavResultsContainer = styled.main`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 20px;
`;

const NavdataHeader = styled.header`
  display: flex;
  background: #1488cc;
`;
const HeaderTitle = styled.h1`
  font-size: 1rem;
  width: 33.33%;
  text-align: center;
  color: #fff;
`;

const NavdataList = styled.div`
  background: #fff;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
`;

const NavRow = styled.div`
  display: flex;
`;

const NavRowItem = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #00587a;
  color: #1488cc;
  span {
    font-style: normal;
  }
`;

const NavDate = styled.p`
  font-style: italic;
  margin-bottom: 10px;
`;

const Footer = styled.p`
  background: ${({ isError }) => (isError ? "#B33A3A" : "#00AB66")};
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
`;

const ExampleText = styled.p`
  color: #407088;
  font-style: italic;
`;

export {
  MainContainer,
  FormContainer,
  Input,
  Label,
  InputContainer,
  Button,
  NavdataHeader,
  HeaderTitle,
  NavResultsContainer,
  NavdataList,
  NavRowItem,
  NavRow,
  NavDate,
  Footer,
  BackButton,
  ExampleText
};

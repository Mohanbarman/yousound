import styled from "styled-components";
import { FC, ReactNode } from "react";
import { Box } from "@material-ui/core";
import { ThemeSwitch } from "../../components/ThemeSwitch";

interface IProps {
  logo: ReactNode;
  heading: ReactNode;
  loginButton: ReactNode;
  footer: ReactNode;
}

export const Layout: FC<IProps> = (props) => {
  return (
    <Container>
      <Box marginLeft="auto" textAlign="end">
        <ThemeSwitch />
      </Box>
      <Box>
        {props.logo} {props.heading}
        <Box marginTop="40px">{props.loginButton}</Box>
      </Box>
      <Box marginTop="auto">{props.footer}</Box>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  margin: auto;
`;

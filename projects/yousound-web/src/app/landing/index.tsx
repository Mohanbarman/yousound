import { FC } from "react";

import { Footer } from "./Footer";
import { Heading } from "./Heading";
import { Layout } from "./Layout";
import { LoginButton } from "./LoginButton";
import { Logo } from "./Logo";

const Landing: FC = () => {
  return (
    <Layout
      footer={<Footer />}
      heading={<Heading />}
      loginButton={<LoginButton />}
      logo={<Logo />}
    />
  );
};

export default Landing;

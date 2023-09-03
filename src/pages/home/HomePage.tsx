import React from "react";

import { SkeletonComponent } from '@syncfusion/ej2-react-notifications';

import Topbar from "../../components/common/Topbar/Topbar";

type Props = {};

const HomePage: React.FC<Props> = () => {
  return (
    <div>
      <Topbar title="Home" />

      <SkeletonComponent id='cardProfile' shape='Circle' width="60px"></SkeletonComponent>
      <SkeletonComponent id="text1" width="30%" height='15px'></SkeletonComponent>
      <SkeletonComponent id="text2" width="15%" height='15px'></SkeletonComponent>
      <SkeletonComponent id="cardImage" shape="Rectangle" width="100%" height='150px'></SkeletonComponent>
      <SkeletonComponent id="rightOption" shape="Rectangle" width="20%" height='32px'></SkeletonComponent>
      <SkeletonComponent id="leftOption" shape="Rectangle" width="20%" height='32px'></SkeletonComponent>

    </div>
  );
};

export default HomePage;

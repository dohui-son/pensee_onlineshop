import React from "react";

import "./stylesheet/global.scss";
import { Route } from "react-router-dom";
import Home from "./page/Home";
import Auth from "./page/Auth";
import MyPage from "./page/MyPage";
import Market from "./page/Market";
import Sell from "./page/Sell";
import Layout from "./components/Layout";
import Square from "./components/Square";
import DetailThree from "./components/DetailThree";
import DetailQuote from "./components/DetailQuote";
import Detail_1 from "./components/Detail_1";
import Detail_2 from "./components/Detail_2";
import Detail_3 from "./components/Detail_3";
import Detail_5 from "./components/Detail_5";
import Detail_4 from "./components/Detail_4";
import Detail_6 from "./components/Detail_6";
const App = () => {
  return (
    <div>
      {/* <Detail_4 /> */}
      {/* <Detail_2 /> */}
      {/* <Detail_5 /> */}
      <Detail_6 />
      {/* <DetailQuote/> */}
      <div className="global">
        {/* <Layout> */}
        {/* <DetailThree />
        <Square /> */}
        {/* <Route path="/" component={Home} exact={true} />
        <Route path="/auth" component={Auth} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/market" component={Market} />
        <Route path="/sell" component={Sell} /> */}
        {/* </Layout> */}
      </div>
    </div>
  );
};

export default App;

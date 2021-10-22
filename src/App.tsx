import React from "react";
import { RecoilRoot } from "recoil";
import Card from "pages/card";

import "styles/_global.scss";

function App() {
  return (
    <RecoilRoot>
      <div className="container">
        <Card />
      </div>
    </RecoilRoot>
  );
}

export default App;

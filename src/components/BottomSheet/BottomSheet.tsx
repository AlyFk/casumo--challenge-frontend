import React from "react";
import ReactDOM from "react-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { AutoSizer } from "react-virtualized";

import "./styles.scss";

interface BottomSheetProps {
  children: React.ReactNode;
}
export const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <>
      <div className="bottom-sheet">
        <AutoSizer disableWidth>
          {({ height }) => {
            return <Scrollbars style={{ height }}>{children}</Scrollbars>;
          }}
        </AutoSizer>
      </div>
      <div className="backdrop"/>
    </>,
    document.getElementById("app-modal")!
  );
};

export default BottomSheet;

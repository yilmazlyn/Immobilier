import React from "react";

const Container = (props) => {
  const { children } = props;
  const render = () => {
    const str = window.location.href.split("/");
    const path = str[str.length - 1];
    if (path === "url") {
      return (
        <div>
          {/ ... /}
          Another Component
        </div>
      );
    } else {
      return (
        <div className="template">
          <div className="mainContent">{children}</div>
        </div>
      );
    }
  };

  return render();
};

export default Container;

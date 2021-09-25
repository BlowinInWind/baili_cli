/** @format */

import React from 'react';
import ReactDOM from 'react-dom';

// eruda.init({
//     useShadowDom: true
// });

const App = () => {
  return <div>1</div>;
};

const render = (Component: React.ReactElement) => {
  ReactDOM.render(Component, document.getElementById('app'));
};

// 热更新
const hotDev = (module: any) => {
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(() => {
      render(<App />);
    });
  }
};

hotDev(module);

render(<App />);

import React from 'react';
import { Factory } from './PageFactory';


export const IPageBuilder = ({ opt, type }) => {
  const { CreateOption, List, Detail, All,CreateStyle } = Factory();
  const options = CreateOption(opt);
  const Style = CreateStyle(opt);
  switch(type) {
    case "List":
      return (
        <List 
          options={options} 
          renderChild={(data) => <Style.list {...data} />}
        />);
    case "Detail":
      return (
        <Detail 
          options={options} 
          renderChild={(data) => <Style.detail {...data} />}
        />
      );
    case "All":
      return <All />;
    default:
      return null;
  }
};

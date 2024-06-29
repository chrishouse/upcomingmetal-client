import React from "react";

const TypeFilter = (props) => {
  return (
    <div className="type-filter filter">
      Type&nbsp;
      <select name="type-select" id="type-select" value={props.value} onChange={props.changeType}>
        <option value="all">All</option>
        <option value="full">Full-Length</option>
        <option value="ep">EP</option>
        <option value="demo">Demo</option>
        <option value="single">Single</option>
        <option value="compilation">Compilation</option>
        <option value="live">Live album</option>
        <option value="split">Split</option>
        <option value="boxed">Boxed set</option>
        <option value="collaboration">Collaboration</option>
      </select>
    </div>
  );
};

export default TypeFilter;

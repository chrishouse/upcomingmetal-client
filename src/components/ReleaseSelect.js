import React from "react";

const ReleaseSelect = (props) => {
	return (
		<div className="release-select-wrap">
			<button name="upcoming" className={props.selection === "upcoming" ? "active" : ""} onClick={props.changeSelection}>
				Upcoming Releases
			</button>
			<button name="recent" className={props.selection === "recent" ? "active" : ""} onClick={props.changeSelection}>
				Recent Releases
			</button>
		</div>
	);
};

export default ReleaseSelect;

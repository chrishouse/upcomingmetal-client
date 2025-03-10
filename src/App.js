import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import GenreFilter from "./components/GenreFilter";
import TypeFilter from "./components/TypeFilter";
import ReleaseSelect from "./components/ReleaseSelect";

function App() {
	let [releases, setReleases] = useState([]);
	const [options, setOptions] = useState({
		genre: "all",
		type: "all"
	});
	const [sortedBy, setSortedBy] = useState("isoDate");
	const [reverseSort, setReverseSort] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [selection, setSelection] = useState("upcoming");
	const [noResults, setNoResults] = useState(false);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_SERVER_DOMAIN + "/api/releases/" + selection, {
				params: options
			})
			.then((res) => {
				setLoading(false);
				if (res.data.length === 0 && options.genre === "all" && options.type === "all") {
					setRefreshing(true);
				} else {
					if (res.data.length === 0) {
						setNoResults(true);
					} else {
						setNoResults(false);
						setRefreshing(false);
						setReleases(res.data);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [options, selection]);

	releases.forEach((item) => {
		// construct ISO date from given date
		let splitDate = item.date.split(" ");
		let month = splitDate[0];
		let date;
		let year;
		const yearRegex = /^[0-9]*$/;
		if (splitDate[1].match(yearRegex)) {
			// if the second item is year instead of date (i.e. there's no date)
			date = "01";
			year = splitDate[1];
		} else {
			date = splitDate[1].replace("th", "").replace("rd", "").replace("nd", "").replace("st", "").replace(",", "");
			year = splitDate[2];
		}
		let newDate = new Date(date + " " + month + " " + year + " 00:00 UTC");
		newDate = newDate.toISOString();
		item.isoDate = newDate;
		item.albumTitle = item.album.replace(/(<([^>]+)>)/gi, "");
	});

	releases.sort((a, b) => {
		switch (sortedBy) {
			case "isoDate":
				return a.isoDate > b.isoDate ? 1 : b.isoDate > a.isoDate ? -1 : 0;
			case "band":
				return a.band > b.band ? 1 : b.band > a.band ? -1 : 0;
			case "albumTitle":
				return a.albumTitle > b.albumTitle ? 1 : b.albumTitle > a.albumTitle ? -1 : 0;
			case "type":
				return a.type > b.type ? 1 : b.type > a.type ? -1 : 0;
			case "genre":
				return a.genre > b.genre ? 1 : b.genre > a.genre ? -1 : 0;
			case "isoDateReverse":
				return a.isoDate < b.isoDate ? 1 : b.isoDate < a.isoDate ? -1 : 0;
			case "bandReverse":
				return a.band < b.band ? 1 : b.band < a.band ? -1 : 0;
			case "albumTitleReverse":
				return a.albumTitle < b.albumTitle ? 1 : b.albumTitle < a.albumTitle ? -1 : 0;
			case "typeReverse":
				return a.type < b.type ? 1 : b.type < a.type ? -1 : 0;
			case "genreReverse":
				return a.genre < b.genre ? 1 : b.genre < a.genre ? -1 : 0;
			default:
				return a.isoDate < b.isoDate ? 1 : b.isoDate < a.isoDate ? -1 : 0;
		}
	});

	const changeSorting = (e) => {
		const labels = document.querySelectorAll(".header-item-label");
		labels.forEach((item) => item.classList.remove("active"));
		labels.forEach((item) => item.classList.remove("reversed"));
		labels.forEach((item) => item.classList.add("regular"));
		if (reverseSort === false && sortedBy === e.target.id) {
			setSortedBy(e.target.id + "Reverse");
			setReverseSort(true);
			e.target.classList.remove("regular");
			e.target.classList.add("reversed");
		} else {
			setSortedBy(e.target.id);
			setReverseSort(false);
			e.target.classList.add("regular");
			e.target.classList.remove("reversed");
		}
		e.target.classList.add("active");
	};

	const changeGenre = (e) => {
		setOptions({ genre: e.target.value, type: options.type });
	};

	const changeType = (e) => {
		setOptions({ genre: options.genre, type: e.target.value });
	};

	const changeSelection = (e) => {
		if (selection !== e.target.name) {
			setLoading(true);
			setSelection(e.target.name);
			if (e.target.name === "recent") {
				setSortedBy("isoDateReverse");
			} else if (e.target.name === "upcoming") {
				setSortedBy("isoDate");
			}
		}
	};

	let content;

	if (refreshing) {
		content = (
			<div className="refreshing-message">
				<h2>The database is currently being updated. Please reload the page in about 30 seconds.</h2>
			</div>
		);
	} else if (loading) {
		content = (
			<div className="loading">
				<img src="/images/loading-loading-forever.gif" alt="Loading" />
			</div>
		);
	} else if (noResults) {
		content = (
			<div className="refreshing-message">
				<h2>There are no results for those filters.</h2>
			</div>
		);
	} else {
		content = releases.map((item, index) => {
			const band = item.band.replace("<a", "<a target='_blank'");
			const album = item.album.replace("<a", "<a target='_blank'");
			return (
				<div className="release-item" key={index}>
					<div>
						<div className="mobile-label">Band:&nbsp;</div>
						<div key={item.index} dangerouslySetInnerHTML={{ __html: band }}></div>
					</div>
					<div>
						<div className="mobile-label">Album Title:&nbsp;</div>
						<div key={item.index} dangerouslySetInnerHTML={{ __html: album }}></div>
					</div>
					<div>
						<div className="mobile-label">Release Type:&nbsp;</div>
						<div key={item.index} dangerouslySetInnerHTML={{ __html: item.type }}></div>
					</div>
					<div>
						<div className="mobile-label">Genre:&nbsp;</div>
						<div key={item.index} dangerouslySetInnerHTML={{ __html: item.genre }}></div>
					</div>
					<div>
						<div className="mobile-label">Release Date:&nbsp;</div>
						<div key={item.index} dangerouslySetInnerHTML={{ __html: item.date }}></div>
					</div>
				</div>
			);
		});
	}

	return (
		<div className="App">
			<header className="header-main">
				<div className="logo-wrap">
					<img src="/images/upcoming-metal-logo.png" alt="Upcoming Metal" />
				</div>
				<ReleaseSelect selection={selection} changeSelection={changeSelection}></ReleaseSelect>
				<div className="dropdown-wrapper">
					<GenreFilter value={options.genre} changeGenre={changeGenre}></GenreFilter>
					<TypeFilter value={options.type} changeType={changeType}></TypeFilter>
				</div>
			</header>

			<div className="release-wrapper">
				<div className="release-item header-item">
					<div className="header-item-label regular" id="band" onClick={changeSorting}>
						Band
					</div>
					<div className="header-item-label regular" id="albumTitle" onClick={changeSorting}>
						Album Title
					</div>
					<div className="header-item-label regular" id="type" onClick={changeSorting}>
						Release Type
					</div>
					<div className="header-item-label regular" id="genre" onClick={changeSorting}>
						Genre
					</div>
					<div className="header-item-label regular active" id="isoDate" onClick={changeSorting}>
						Release Date
					</div>
				</div>

				{content}
			</div>
		</div>
	);
}

export default App;

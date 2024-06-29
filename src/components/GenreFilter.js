import React from "react";

const GenreFilter = (props) => {
  return (
  <div className="genre-filter filter">
    Genre&nbsp;
    <select name="genre-select" id="genre-select" value={props.value} onChange={props.changeGenre}>
      <option value="all">All</option>
      <option value="ambient">Ambient Black Metal</option>
      <option value="atmospheric black">Atmospheric Black Metal</option>
      <option value="atmospheric sludge">Atmospheric Sludge Metal</option>
      <option value="avant">Avant-garde Metal</option>
      <option value="blackened">Blackened Death Metal</option>
      <option value="black">Black Metal</option>
      <option value="brutal">Brutal Death Metal</option>
      <option value="celtic folk">Celtic Folk</option>
      <option value="crossover">Crossover</option>
      <option value="crust">Crust Punk</option>
      <option value="dark ambient">Dark Ambient</option>
      <option value="deathcore">Deathcore</option>
      <option value="death">Death Metal</option>
      <option value="d-beat">D-Beat</option>
      <option value="depressive">Depressive Black Metal</option>
      <option value="doom">Doom Metal</option>
      <option value="drone">Drone Metal</option>
      <option value="dungeon synth">Dungeon Synth</option>
      <option value="folk">Folk Metal</option>
      <option value="funeral">Funeral Doom</option>
      <option value="goregrind">Goregrind</option>
      <option value="gorenoise">Gorenoise</option>
      <option value="gothic">Gothic Metal</option>
      <option value="grindcore">Grindcore</option>
      <option value="groove">Groove Metal</option>
      <option value="hardcore">Hardcore</option>
      <option value="hard">Hard Rock</option>
      <option value="heavy">Heavy Metal</option>
      <option value="industrial">Industrial Metal</option>
      <option value="melodic black">Melodic Black Metal</option>
      <option value="melodic death">Melodic Death Metal</option>
      <option value="melodic power">Melodic Power Metal</option>
      <option value="melodic thrash">Melodic Thrash Metal</option>
      <option value="metalcore">Metalcore</option>
      <option value="neoclassical power">Neoclassical Power Metal</option>
      <option value="pagan black">Pagan Black Metal</option>
      <option value="pornogrind">Pornogrind</option>
      <option value="post black">Post-Black Metal</option>
      <option value="post">Post-Metal</option>
      <option value="power">Power Metal</option>
      <option value="violence">Powerviolence</option>
      <option value="progressive black">Progressive Black Metal</option>
      <option value="progressive death">Progressive Death Metal</option>
      <option value="progressive rock">Progressive Rock</option>
      <option value="psychedelic doom">Psychedelic Doom Metal</option>
      <option value="psychedelic stoner">Psychedelic Stoner Metal</option>
      <option value="punk">Punk</option>
      <option value="raw black">Raw Black Metal</option>
      <option value="shoegaze">Shoegaze</option>
      <option value="shred">Shred</option>
      <option value="slam">Slam</option>
      <option value="sludge">Sludge Metal</option>
      <option value="speed">Speed Metal</option>
      <option value="stoner">Stoner Metal</option>
      <option value="symphonic black">Symphonic Black Metal</option>
      <option value="symphonic power">Symphonic Power Metal</option>
      <option value="technical">Technical Death Metal</option>
      <option value="thrash">Thrash Metal</option>
    </select>
  </div>
  );
};

export default GenreFilter;

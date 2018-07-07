import React from "react";
import games from "./data/games";
import * as R from "ramda";
import util from "./util";
import Hex from "./Hex";
import Title from "./Title";
import Svg from "./Svg";

import HexContext from "./context/HexContext";

const HEX_RATIO = 0.57735;

const Map = ({ match }) => {
  let game = games[match.params.game];
  let map = game.map;

  if (!map) {
    return null;
  }

  let hexWidth = game.info.width;
  let edge = hexWidth * HEX_RATIO;
  let halfHexWidth = 0.5 * hexWidth;
  let maxX = util.maxMapX(map.hexes);
  let maxY = util.maxMapY(map.hexes);
  let totalWidth = halfHexWidth * (maxX + 1);
  let totalHeight = 1.5 * (maxY - 1) * edge + 2 * edge;

  let hexX = (x, y) => {
    return x * halfHexWidth;
  };

  let hexY = (x, y) => {
    return (y - 1) * 1.5 * edge + edge;
  };

  let hexes = R.chain(hex => {
    let resolvedHex = util.resolveHex(hex, map.hexes);

    return R.map(([x, y]) => {
      return (
        <g transform={`translate(${hexX(x, y)} ${hexY(x, y)})`}>
          <Hex hex={resolvedHex} id={`${util.toAlpha(y)}${x}`} border={true} />
        </g>
      );
    }, R.map(util.toCoords, hex.hexes || []));
  }, map.hexes);

  return (
    <HexContext.Provider
      value={{ width: game.info.width, rotation: game.info.rotation }}
    >
      <div className="cutlines">
        <div className="map">
          <Svg width={totalWidth} height={totalHeight}>
            <Title game={game} />
            {hexes}
          </Svg>
        </div>
      </div>
    </HexContext.Provider>
  );
};

export default Map;
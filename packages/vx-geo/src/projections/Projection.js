import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Group } from '@vx/group';
import additionalProps from '../util/additionalProps';
import Graticule from '../graticule/Graticule';
import { geoOrthographic, geoAlbers, geoMercator, geoPath } from 'd3-geo';

// TODO: Implement all projections of d3-geo
const projectionMapping = {
  orthographic: () => geoOrthographic(),
  albers: () => geoAlbers(),
  mercator: () => geoMercator()
};

/**
 * Component for all projections.
 */
export default function Projection({
  data,
  projection = 'mercator',
  projectionFunc,
  clipAngle,
  clipExtent,
  scale,
  translate,
  center,
  rotate,
  precision,
  fitExtent,
  fitSize,
  centroid,
  graticule,
  graticuleLines,
  graticuleOutline,
  className,
  ...restProps
}) {
  const currProjection = projectionMapping[projection]();

  if (clipAngle) currProjection.clipAngle(clipAngle);
  if (clipExtent) currProjection.clipExtent(clipExtent);
  if (scale) currProjection.scale(scale);
  if (translate) currProjection.translate(translate);
  if (center) currProjection.translate(center);
  if (rotate) currProjection.rotate(rotate);
  if (precision) currProjection.rotate(precision);
  if (fitExtent) currProjection.fitExtent(...fitExtent);
  if (fitSize) currProjection.fitSize(...fitSize);

  const path = geoPath().projection(currProjection);

  return (
    <Group className={`vx-geo`}>
      {graticule &&
        !graticule.foreGround &&
        <Graticule graticule={g => path(g)} {...graticule} />}
      {graticuleLines &&
        !graticuleLines.foreGround &&
        <Graticule lines={g => path(g)} {...graticuleLines} />}
      {graticuleOutline &&
        !graticuleOutline.foreGround &&
        <Graticule outline={g => path(g)} {...graticuleOutline} />}

      {data.map((feature, i) => {
        let c;
        if (centroid) c = path.centroid(feature);
        return (
          <g key={`${projection}-${i}`}>
            <path
              className={`vx-geo-${projection}`}
              d={path(feature)}
              {...additionalProps(restProps, {
                ...feature,
                index: i,
                centroid: c
              })}
            />
            {centroid && centroid(c, feature)}
          </g>
        );
      })}
      {/* TODO: Maybe find a different way to pass projection function to use for example invert */}
      {projectionFunc && projectionFunc(currProjection)}

      {graticule &&
        graticule.foreGround &&
        <Graticule graticule={g => path(g)} {...graticule} />}
      {graticuleLines &&
        graticuleLines.foreGround &&
        <Graticule lines={g => path(g)} {...graticuleLines} />}
      {graticuleOutline &&
        graticuleOutline.foreGround &&
        <Graticule outline={g => path(g)} {...graticuleOutline} />}
    </Group>
  );
}

Projection.propTypes = {
  data: PropTypes.array.isRequired,
  projection: PropTypes.string,
  projectionFunc: PropTypes.func,
  clipAngle: PropTypes.number,
  clipExtent: PropTypes.array,
  scale: PropTypes.number,
  translate: PropTypes.array,
  center: PropTypes.array,
  rotate: PropTypes.array,
  precision: PropTypes.number,
  fitExtent: PropTypes.array,
  fitSize: PropTypes.array,
  centroid: PropTypes.func,
  className: PropTypes.string
};

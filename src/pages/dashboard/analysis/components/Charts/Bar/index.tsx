/**
 * 折线图
 */
import { Axis, Chart, Geom, Tooltip } from 'bizcharts';
import React, { Component } from 'react';

import Debounce from 'lodash.debounce';
import autoHeight from '../autoHeight';
import styles from '../index.less';

export interface BarProps {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height?: number;
  data: {

  }[];
  forceFit?: boolean;
  autoLabel?: boolean;
  style?: React.CSSProperties;
  scale:object;
}

class Bar extends Component<
  BarProps,
  {
    autoHideXLabels: boolean;
  }
  > {
  state = {
    autoHideXLabels: false,
  };

  root: HTMLDivElement | undefined = undefined;

  node: HTMLDivElement | undefined = undefined;

  resize = Debounce(() => {
    if (!this.node || !this.node.parentNode) {
      return;
    }
    const canvasWidth = (this.node.parentNode as HTMLDivElement).clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }, 500);

  componentDidMount() {
    window.addEventListener('resize', this.resize, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = (n: HTMLDivElement) => {
    this.root = n;
  };

  handleRef = (n: HTMLDivElement) => {
    this.node = n;
  };

  render() {
    const {
      height = 1,
      title,
      forceFit = true,
      data,
      color = 'rgba(24, 144, 255, 0.85)',
      padding,
      scale
    } = this.props;

    const { autoHideXLabels } = this.state;


    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot} >
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            scale={scale}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={data}
            padding={padding || 'auto'}
          >
            <Axis
              name="x"
              title={false}
              label={autoHideXLabels ? undefined : {}}
              tickLine={autoHideXLabels ? undefined : {}}
            />
            <Axis name="y" min={0} />
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="line" position="x*y" size={2} />
            <Geom
              type="point"
              position="x*y"
              size={4}
              shape={"circle"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
              color={color}
            />
            {/* <Geom type="interval" position="datetime*countlogin" color={color} /> */}
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
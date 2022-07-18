const SquareLoadingSvg = (props) => {
  const { color, height, width } = props;
  return (
    <svg
      id='L6'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      width='100'
      height='100'
    >
      <rect
        fill={color}
        stroke={color}
        strokeWidth='4'
        x='25'
        y='25'
        width={width}
        height={height}
      >
        <animateTransform
          attributeName='transform'
          dur='0.8s'
          from='0 50 50'
          to='180 50 50'
          type='rotate'
          id='strokeBox'
          attributeType='XML'
          begin='rectBox.end'
        />
      </rect>
      <rect x='27' y='27' fill='#fff' width='46' height='50'>
        <animate
          attributeName='height'
          dur='1s'
          attributeType='XML'
          from='50'
          to='0'
          id='rectBox'
          fill='freeze'
          begin='0s;strokeBox.end'
        />
      </rect>
    </svg>
  );
};

export default SquareLoadingSvg;

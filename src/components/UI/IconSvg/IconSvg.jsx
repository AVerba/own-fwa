const IconSvg = ({ sprite, icon, ...props }) => {
  // console.log(props, 'props');
  return (
    <svg {...props}>
      <use xlinkHref={`${sprite}#${icon}`} />
    </svg>
  );
};

export default IconSvg;

const Divider = () => {
  return (
    <div className='d-flex'>
      <div
        style={{
          width: "45%",
          borderTop: "1px solid #E9EAEC"
        }}
      />
      <div
        className='text-center'
        style={{
          width: "10%",
          padding: "0 8px",
          transform: "translateY(-12px)"
        }}
      >
        or
      </div>
      <div
        style={{
          width: "45%",
          borderTop: "1px solid #E9EAEC"
        }}
      />
    </div>
  );
};

export default Divider;

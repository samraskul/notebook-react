import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-body">
      {/* <div className="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
      {/* <div class="square">
        <div></div>
        <div></div>
      </div> */}

      <div className="spinner" style={{ fontSize: "20px" }}>
        <div className="head"></div>
      </div>
    </div>
  );
};

export default Loading;

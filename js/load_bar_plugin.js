const load_bar_plugin = (body_, FR) => {
  let bar_ = create_("div");
  _css(bar_, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "rgb(255, 20, 35)",
    transform: "translateX(-100%)",
    zIndex: 99999,
  });

  append_(body_.lastChild, bar_);

  FR.onprogress = (e) => {
    let loaded_ = (e.loaded * 100) / e.total;

    if (loaded_ === 100) {
      bar_.remove();
    } else if (loaded_ < 100 && loaded_ !== 100) {
      _css(bar_, "transform", `translateX(-${100 - loaded_}%)`);
    }
  };
};

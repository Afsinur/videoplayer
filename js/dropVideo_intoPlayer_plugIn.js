const dropVideo_intoPlayer_plugIn = (
  body_,
  playerContainer,
  ul__,
  trigger_function_ = null
) => {
  const events_ = [
    {
      q_s_: body_,
      event: "dragenter",
      F_: (e) => {
        e.preventDefault();
      },
    },
    {
      q_s_: body_,
      event: "dragover",
      F_: (e) => {
        e.preventDefault();
      },
    },
    {
      q_s_: body_,
      event: "drop",
      F_: (e) => {
        e.preventDefault();

        let data = e.dataTransfer.items;

        if (data) {
          let FRarr = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].kind === "file") {
              let file = data[i].getAsFile();

              FRarr.push(file);
            }
          }

          let sortASC = FRarr.sort((a, b) => {
            if (a.name < b.name) return -1;
            return 1;
          });

          let i = 0;

          commonFilePass(i, sortASC);
        }
      },
    },
  ];

  //app init function
  const forE_init = (ev) => {
    on_(ev.q_s_, ev.event, ev.F_);
  };

  //app init
  events_.forEach(forE_init);
};

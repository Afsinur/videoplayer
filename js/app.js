//selector variables
const CancelButton =
  ".alertBox_ > div > div:nth-child(2) > div:nth-child(1) button";
const YesButton =
  ".alertBox_ > div > div:nth-child(2) > div:nth-child(2) button";
const clearButton =
  ".puaseBX > div > div:nth-child(3) > div:nth-child(1) button";
const CancelButton2 =
  ".puaseBX > div > div:nth-child(3) > div:nth-child(2) button";
const YesButton2 =
  ".puaseBX > div > div:nth-child(3) > div:nth-child(3) button";

//app variables
let hidden_ = true;
let currentId;
let currentPlaybackSpeed = null;
let bubble = 0;
let currentPlay = false;
let pauseColor = "#fff700";
let playColor = "#04ff43";
let notselectedColor = "#fffffe";
let puseTimerTime = 0;
let puseTimerseted = 0;
let setPressed = 0;

//functions
const updatesVideoplaybackRate = (id) => {
  let c_DOM = q_s(`video#${id}`);

  currentPlaybackSpeed = c_DOM.playbackRate;
};

const titleVideoShowTimeF = (e) => {
  //play pause only
  commonCK = (ep) => {
    if (ep === 1) {
      q_s(`a#a_${currentId}`).click();

      qa_s("video").forEach((vd) => {
        //vd.id === e.target.id
        if (vd.id !== currentId) {
          vd.pause();
        }
      });

      qa_s(".ul_ li a").forEach((a) => {
        if (a.attributes.href.value === `#${currentId}`) {
          a.style["color"] = playColor;
        } else {
          a.style["color"] = notselectedColor;
        }
      });
    }

    if (ep === 0) {
      q_s(`a#a_${currentId}`).click();

      qa_s(".ul_ li a").forEach((a) => {
        if (a.attributes.href.value === `#${currentId}`) {
          if (q_s(`video#${currentId}`).paused) {
            a.style["color"] = pauseColor;
          }
        } else {
          a.style["color"] = notselectedColor;
        }
      });
    }
  };
  //switch
  switch (e.type) {
    case "play":
      currentId = e.target.id;
      commonCK(1);
      break;

    case "pause":
      commonCK(0);
      do_hidden_false();
      break;

    case "ratechange":
      updatesVideoplaybackRate(e.target.id);
      break;

    default:
      break;
  }
};

const ckeckID_Time = (interval) => {
  setInterval(() => {
    if (currentId !== undefined) {
      let selectedDOM = q_s(`video#${currentId}`);

      if (selectedDOM !== null) {
        let currentTime_ = selectedDOM.currentTime;
        let duration_ = selectedDOM.duration;

        //pause timer
        if (puseTimerseted === 1 && currentTime_ >= puseTimerTime) {
          selectedDOM.pause();

          //add class
          //r_class(q_s(".Open_File_3"), "playTimerCOLOR");
          a_class(q_s(".Open_File_3"), "pauseTimerCOLOR");
        }

        if (puseTimerseted === 1 && currentTime_ < puseTimerTime) {
          //add class
          r_class(q_s(".Open_File_3"), "pauseTimerCOLOR");
          a_class(q_s(".Open_File_3"), "playTimerCOLOR");
        }

        if (puseTimerseted === 0) {
          //add class
          r_class(q_s(".Open_File_3"), "pauseTimerCOLOR");
          r_class(q_s(".Open_File_3"), "playTimerCOLOR");
        }

        //let covert_currentTime_ = ;
        const getTimeConversions = (TIME_) => {
          let covert_duration_ = Math.floor(TIME_) / 60;

          let numberAfterDecimal = parseInt(
            (covert_duration_ % 1).toFixed(2).substring(2)
          );

          let numberBeforeDecimal = parseInt(covert_duration_);
          if (numberBeforeDecimal >= 60) {
            let covert_duration__1 = numberBeforeDecimal / 60;

            let numberAfterDecimal_1 = parseInt(
              (covert_duration__1 % 1).toFixed(2).substring(2)
            );

            let numberAfterDecimalConvert__1 =
              (numberAfterDecimal_1 * 60) / 100;

            numberBeforeDecimal = Math.round(numberAfterDecimalConvert__1);
          }

          let numberAfterDecimalConvert_ = Math.round(
            (numberAfterDecimal * 60) / 100
          );

          let HR_, MIN_, SEC_;
          if (numberBeforeDecimal >= 10) {
            MIN_ = `${numberBeforeDecimal}:`;
          } else {
            MIN_ = `0${numberBeforeDecimal}:`;
          }

          if (numberAfterDecimalConvert_ >= 10) {
            SEC_ = `${numberAfterDecimalConvert_}`;
          } else {
            SEC_ = `0${numberAfterDecimalConvert_}`;
          }

          if (Math.floor(TIME_) < 3600) {
            HR_ = ``;
          } else {
            let covert_duration_hr = Math.floor(TIME_) / 3600;
            let numberBeforeDecimal_hr = parseInt(covert_duration_hr);
            HR_ = `0${numberBeforeDecimal_hr}:`;
          }

          return `${HR_}${MIN_}${SEC_}`;
        };

        let duration_related = getTimeConversions(duration_);
        let currentTime_related = getTimeConversions(currentTime_);

        document.title = `video | ${currentTime_related} / ${duration_related}`;
        //update playback speed

        if (currentPlaybackSpeed !== null) {
          let vidArr = Array.from(qa_s(`video`));

          if (vidArr.length !== 0) {
            vidArr.forEach((cld) => {
              cld.playbackRate = currentPlaybackSpeed;
            });
          }
        }
      }
    }
  }, interval);
};

const do_hidden_false = () => {
  hidden_ = false;

  _css(q_s(".ulContainer"), "transform", "translateY(0%)");
  _css(q_s(".Open_File_1"), "transform", "translateY(360%)");
};

const do_hidden_true = () => {
  hidden_ = true;

  _css(q_s(".ulContainer"), "transform", "translateY(-100%)");
  _css(q_s(".Open_File_1"), "transform", "translateY(0%)");
};

const commonFilePass = (i, sortASC) => {
  if (i < sortASC.length) {
    const file = sortASC[i];

    if (file.type === "video/mp4" || file.type === "video/webm") {
      let file_Reader = new FileReader();

      load_bar_plugin(q_s("html"), file_Reader);

      file_Reader.onload = (ev) => {
        let video = create_("video");

        s_attr(video, "controls", "");
        video.src = URL.createObjectURL(
          new Blob([new Uint8Array(ev.target.result)])
        );

        let ID_ = `id_${Math.ceil(Math.random() * 10000)}`;
        video.id = ID_;

        a_class(video, "userVideo");

        let li = create_("li");

        let a = create_("a");
        a.href = `#${ID_}`;

        a.innerHTML = file.name;

        let span = create_("span");
        span.id = `${ID_}_`;
        span.textContent = "x";

        append_(li, span);
        append_(li, a);
        append_(q_s(".ul_"), li);

        a = create_("a");
        a.href = `#${ID_}`;
        a.id = `a_${ID_}`;

        append_(q_s("div.videoPlayerContainer"), a);
        append_(q_s("div.videoPlayerContainer"), video);

        let eventArr = ["play", "pause", "ratechange"];
        eventArr.forEach((ev) => {
          on_(q_s(`video#${ID_}`), ev, titleVideoShowTimeF);
        });

        do_hidden_false();
      };

      file_Reader.onloadend = () => {
        i++;
        commonFilePass(i, sortASC);
      };

      file_Reader.readAsArrayBuffer(file);
    } else {
      alert(
        `Sorry, can not play this type of file: ${file.type}\n [ only: video/mp4 or video/webm ]`
      );
    }
  }
};

//event handelers
//objects and arrays
//EVhandlersARR[3] = header list functions;
const EVhandlersARR = [
  {
    q_s: q_s("input#video_file_"),
    ev: "change",
    f_: (e) => {
      let files_ = e.target.files;

      let sortASC = Array.from(files_).sort((a, b) => {
        if (a.name < b.name) return -1;
        return 1;
      });

      let i = 0;

      commonFilePass(i, sortASC);

      e.target.value = "";
    },
  },
  {
    q_s: q_s(".Open_File"),
    ev: "click",
    f_: () => {
      q_s("input#video_file_").click();
    },
  },
  {
    q_s: q_s(".Open_File_1"),
    ev: "click",
    f_: () => {
      if (q_s(".ulContainer .ul_").innerHTML !== "") {
        if (hidden_) {
          do_hidden_false();
        } else {
          do_hidden_true();
        }
      }
    },
  },
  {
    q_s: q_s(".ulContainer .ul_"),
    ev: "click",
    f_: (e) => {
      if (e.target.nodeName === "A") {
        qa_s(".ul_ li a").forEach((a) => {
          if (a.attributes.href.value === e.target.attributes.href.value) {
            const test = () => {
              let add = "";

              Array.from(e.target.attributes.href.value).forEach((txt) => {
                if (txt !== "#") {
                  add += txt;
                }
              });

              return add;
            };

            let txtText = test();

            qa_s("video").forEach((vd) => {
              if (vd.id === txtText) {
                if (q_s(`video#${vd.id}`).paused) {
                  currentPlay = true;

                  vd.play();

                  a.style["color"] = playColor;
                } else if (!q_s(`video#${vd.id}`).paused) {
                  currentPlay = false;

                  vd.pause();

                  a.style["color"] = pauseColor;
                }
              } else {
                vd.pause();
              }
            });
          } else {
            a.style["color"] = notselectedColor;
          }
        });
      }

      if (e.target.nodeName === "SPAN") {
        qa_s("video").forEach((vd) => {
          if (`${vd.id}_` === `${e.target.id}`) {
            vd.remove();
          }
        });

        e.target.parentNode.remove();

        setTimeout(() => {
          if (qa_s(".ul_ li a").length <= 0) {
            do_hidden_true();
          }
        }, 100);
      }
    },
  },
  {
    q_s: q_s(".Open_File_2"),
    ev: "click",
    f_: () => {
      q_s(".alertBox_").style["visibility"] = "visible";
    },
  },
  {
    q_s: q_s(CancelButton),
    ev: "click",
    f_: () => {
      q_s(".alertBox_").style["visibility"] = "hidden";
    },
  },
  {
    q_s: q_s(YesButton),
    ev: "click",
    f_: () => {
      Array.from(q_s("div.videoPlayerContainer").childNodes).forEach((node) => {
        if (node.nodeName === "VIDEO") {
          node.remove();
        }

        if (node.nodeName === "A") {
          node.remove();
        }
      });

      q_s(".ulContainer .ul_").innerHTML = ``;

      do_hidden_true();
      q_s(".alertBox_").style["visibility"] = "hidden";
    },
  },
  {
    q_s: q_s(CancelButton2),
    ev: "click",
    f_: () => {
      _css(q_s(".puaseBX"), {
        visibility: "hidden",
      });

      if (setPressed === 0) {
        puseTimerseted = 0;
      }
    },
  },
  {
    q_s: q_s(YesButton2),
    ev: "click",
    f_: () => {
      if (
        !isNaN(q_s("#setTime").value) &&
        !isNaN(q_s("#setTime1").value) &&
        !isNaN(q_s("#setTime2").value)
      ) {
        let numVAL = Number(q_s("#setTime").value);
        let numVAL1 = Number(q_s("#setTime1").value);
        let numVAL2 = Number(q_s("#setTime2").value);

        if (numVAL >= 0 && numVAL1 >= 0 && numVAL2 >= 0) {
          puseTimerseted = 1;
          setPressed = 1;

          q_s(CancelButton2).click();

          let hTOs = 60 * 60 * numVAL;
          let mTOs = 60 * numVAL1;
          let totalS = Number(hTOs + mTOs + numVAL2);

          puseTimerTime = totalS;
        }
      }
    },
  },
  {
    q_s: q_s(".Open_File_3"),
    ev: "click",
    f_: () => {
      _css(q_s(".puaseBX"), {
        visibility: "visible",
      });
    },
  },
  {
    q_s: q_s(clearButton),
    ev: "click",
    f_: () => {
      setPressed = 0;

      q_s("#setTime").value = "";
      q_s("#setTime1").value = "";
      q_s("#setTime2").value = "";

      q_s(CancelButton2).click();
    },
  },
];
//initArr
EVhandlersARR.forEach((arr) => {
  on_(arr.q_s, arr.ev, arr.f_);
});

//init
ckeckID_Time(100);

let hl_ = q_s("html"),
  cn_ = q_s(".videoPlayerContainer"),
  _u = q_s(".ul_");

dropVideo_intoPlayer_plugIn(hl_, cn_, _u, do_hidden_false);

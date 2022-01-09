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
const clearButton2 =
  ".gotoBX > div > div:nth-child(3) > div:nth-child(1) button";
const CancelButton3 =
  ".gotoBX > div > div:nth-child(3) > div:nth-child(2) button";
const YesButton3 = ".gotoBX > div > div:nth-child(3) > div:nth-child(3) button";
const onlySuports = [
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
];

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
let frwSpeed = 5;
let setTimeOutAfter = 5;
let mouseOvered = 0;

//functions
const btnListShow = () => {
  q_s(".Open_File_5").dataset.active = 1;

  _css(q_s(".under_collapseBTNlist"), {
    transform: "translate(-2px, 260px) scale(0)",
  });

  Array.from(q_s(".under_collapseBTNlist").children).forEach((c, i) => {
    _css(c, {
      transform: "scale(0)",
      "transition-delay": `0ms`,
    });
  });
};

const btnListHide = () => {
  q_s(".Open_File_5").dataset.active = 0;

  _css(q_s(".under_collapseBTNlist"), {
    transform: "translate(0, -5px) scale(1)",
  });

  Array.from(q_s(".under_collapseBTNlist").children).forEach((c, i) => {
    _css(c, {
      transform: "scale(1)",
      "transition-delay": `${(i + 1) * 100}ms`,
    });
  });
};

const shortCut_init = (arr) => {
  let srtC_ul = q_s(".shortCutShow ul");

  for (let i = 0; i < arr.length; i++) {
    const prs = arr[i]["press"];
    const fr = arr[i]["for"];

    let li = create_("li");
    li.innerHTML = `for <mark>${fr}</mark> press <mark>${prs}</mark>`;

    append_(srtC_ul, li);
  }
};

const muteShow = (mt) => {
  let div = create_("div");

  if (mt) {
    div.textContent = `muted on`;
  } else {
    div.textContent = `muted off`;
  }

  a_class(div, "showPlayBKspeed");
  a_class(div, "fadeoutAnim");

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

const arClass = (spd) => {
  let div = create_("div");
  div.textContent = `${spd}x`;

  a_class(div, "showPlayBKspeed");
  a_class(div, "fadeoutAnim");

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

const v_arClass = (spd) => {
  let div = create_("div");
  div.textContent = `${(spd * 100).toFixed(0)}%`;

  a_class(div, "showPlayBKspeed");
  a_class(div, "fadeoutAnim");

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

const frwrdIconShow = (frwSpeed) => {
  let div = create_("div");
  let div1 = create_("div");
  let div2 = create_("div");
  let p = create_("p");

  a_class(div, "fd-x");
  a_class(div, "showPlayBKspeed");
  a_class(div, "fadeoutAnim");
  a_class(div1, "frwrdOneIcon");
  a_class(div2, "frwrdOneIcon");

  _css(div1, {
    "margin-left": "20px",
  });

  p.textContent = `${frwSpeed}`;
  _css(p, {
    position: "absolute",
    top: "-50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "5px 15px",
    "text-align": "center",
    background: "rgba(0,0,0,0.5)",
    "border-radius": "50%",
  });

  append_(div, p);
  append_(div, div1);
  append_(div, div2);

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

const bkwrdIconShow = (frwSpeed) => {
  let div = create_("div");
  let div1 = create_("div");
  let div2 = create_("div");
  let p = create_("p");

  a_class(div, "fd-x");
  a_class(div, "showPlayBKspeed");
  a_class(div, "fadeoutAnim");
  a_class(div1, "frwrdOneIcon");
  a_class(div2, "frwrdOneIcon");

  _css(div1, {
    "margin-left": "20px",
  });

  p.textContent = `${frwSpeed}`;
  _css(p, {
    position: "absolute",
    top: "150%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(180deg)",
    padding: "5px 15px",
    "text-align": "center",
    background: "rgba(0,0,0,0.5)",
    "border-radius": "50%",
  });

  append_(div, p);
  append_(div, div1);
  append_(div, div2);

  _css(div, {
    transform: "translate(-50%, -50%) rotate(180deg)",
  });

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

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

    let numberAfterDecimalConvert__1 = (numberAfterDecimal_1 * 60) / 100;

    numberBeforeDecimal = Math.round(numberAfterDecimalConvert__1);
  }

  let numberAfterDecimalConvert_ = Math.round((numberAfterDecimal * 60) / 100);

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

const pauseIconShow = () => {
  let div = create_("div");
  let div1 = create_("div");

  a_class(div, "fd-x");
  a_class(div, "showPlayBKspeed");
  a_class(div, "fadeoutAnim");
  a_class(div1, "iconPlayPause2");

  append_(div, div1);

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

const playIconShow = () => {
  let div = create_("div");
  let div1 = create_("div");
  let div2 = create_("div");

  a_class(div, "fd-x");
  a_class(div, "showPlayBKspeed");
  a_class(div, "fadeoutAnim");
  a_class(div1, "iconPlayPause");
  a_class(div2, "iconPlayPause");

  append_(div, div1);
  append_(div, div2);

  append_(q_s("body"), div);

  on_(div, "animationend", () => {
    div.remove();
  });
};

const getPercent = (x, y) => (y * 100) / x;

const getNumToPercent = (x, y) => (x * y) / 100;

const onlySuportsPrint = () => {
  let str = "";

  for (let i = 0; i < onlySuports.length; i++) {
    const el = onlySuports[i];

    str += ` ${el} `;
  }

  return str;
};

const mouseoverTimeOut = () => {
  setTimeout(() => {
    if (mouseOvered === 0) {
      do_hidden_true();
    }
  }, setTimeOutAfter * 1000);
};

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

        //let covert_currentTime_
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
  _css(
    q_s(".Open_File_1"),
    "transform",
    `translateY(${q_s(".ul_").clientHeight}px)`
  );

  mouseoverTimeOut();
};

const do_hidden_true = () => {
  hidden_ = true;

  _css(q_s(".ulContainer"), "transform", "translateY(-100%)");
  _css(q_s(".Open_File_1"), "transform", "translateY(0%)");
};

const commonFilePass = (i, sortASC) => {
  if (i < sortASC.length) {
    const file = sortASC[i];

    if (
      file.type === "video/mp4" ||
      file.type === "video/webm" ||
      file.type === "audio/mpeg" ||
      file.type === "audio/wav" ||
      file.type === "audio/mp3"
    ) {
      let file_Reader = new FileReader();

      load_bar_plugin(q_s("html"), file_Reader);

      file_Reader.onload = (ev) => {
        let video = create_("video");

        video.src = URL.createObjectURL(
          new Blob([new Uint8Array(ev.target.result)])
        );

        let ID_ = `id_${Math.ceil(Math.random() * 10000)}`;
        video.id = ID_;

        a_class(video, "userVideo");
        a_class(video, "fd-x");
        a_class(video, "fx-x-c");
        a_class(video, "fx-y-c");

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

        let div_ = create_("div");
        div_.id = `vdC_${ID_}`;
        a_class(div_, "vdC_Container");

        let div_1 = create_("div");
        a_class(div_1, "videoPRGbar");

        let div_2 = create_("div");
        a_class(div_2, "in_videoPRGbar");

        let div_3 = create_("div");
        a_class(div_3, "on_videoPRGbar");

        let div_4 = create_("div");
        a_class(div_4, "on_videoPRGbar_absolute");

        let div_5 = create_("div");
        a_class(div_5, "showTime_absolute");

        const tmPrint2 = (e) => {
          let d3_p = getPercent(div_3.clientWidth, e.offsetX);

          let d3_nTp = getNumToPercent(video.duration, d3_p);

          video.currentTime = d3_nTp;
        };

        on_(div_3, "mousedown", () => {
          on_(div_1, "mousemove", tmPrint2);
        });

        on_(div_3, "mouseup", () => {
          r_listener(div_1, "mousemove", tmPrint2);
        });

        on_(div_3, "click", (e) => {
          let d3_p = getPercent(div_3.clientWidth, e.offsetX);

          let d3_nTp = getNumToPercent(video.duration, d3_p);

          video.currentTime = d3_nTp;
        });

        on_(div_, "mousemove", () => {
          _css(div_1, {
            visibility: "visible",
          });

          _css(div_, {
            cursor: "default",
          });
        });

        on_(video, "click", () => {
          if (video.paused) {
            video.play();

            playIconShow();
          } else {
            video.pause();

            pauseIconShow();
          }
        });

        const tmPrint = (e) => {
          let d3_p = getPercent(div_3.clientWidth, e.offsetX);

          let d3_nTp = getNumToPercent(video.duration, d3_p);

          //d3_nTp
          let total_tm_ = getTimeConversions(video.duration);
          let c_tm_ = getTimeConversions(d3_nTp);

          div_4.textContent = `${c_tm_} / ${total_tm_}`;

          if (e.offsetX < div_3.clientWidth / 2) {
            _css(div_4, {
              left: `${e.offsetX}px`,
            });
          } else {
            _css(div_4, {
              left: `${e.offsetX - div_4.clientWidth}px`,
            });
          }
        };

        let stayVisible = 0;

        on_(div_1, "mouseover", (e) => {
          stayVisible = 1;

          on_(div_1, "mousemove", tmPrint);

          _css(div_4, {
            visibility: "visible",
          });
        });

        on_(div_1, "mouseleave", () => {
          stayVisible = 0;

          _css(div_4, {
            visibility: "hidden",
          });
        });

        //setInterVal
        setInterval(() => {
          let v_p = getPercent(video.duration, video.currentTime);

          _css(div_2, {
            transform: `translateX(-${100 - v_p}%)`,
          });

          let total_tm_ = getTimeConversions(video.duration);
          let c_tm_ = getTimeConversions(video.currentTime);

          div_5.textContent = `${c_tm_} / ${total_tm_}`;
        }, 100);

        setInterval(() => {
          if (video.paused || stayVisible === 1) {
            _css(div_1, {
              visibility: "visible",
            });

            _css(div_, {
              cursor: "default",
            });
          } else {
            _css(div_1, {
              visibility: "hidden",
            });

            _css(div_, {
              cursor: "none",
            });
          }
        }, 5000);

        append_(div_1, div_2);
        append_(div_1, div_3);
        append_(div_1, div_4);
        append_(div_1, div_5);
        append_(div_, video);
        append_(div_, div_1);

        append_(q_s("div.videoPlayerContainer"), div_);

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
        `Sorry, can not play this type of file: ${
          file.type
        }\n [ only: ${onlySuportsPrint()} ]`
      );
    }
  }
};

//event handelers
//objects and arrays
const casesArr = [
  {
    case: " ",
    press: "Space",
    for: "play / pause",
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let cVD = q_s(`video#${currentId}`);

        if (cVD.paused) {
          cVD.play();

          playIconShow();
        } else {
          cVD.pause();

          pauseIconShow();
        }
      }
    },
  },
  {
    case: "ArrowRight",
    press: "Arrow Right",
    for: `${frwSpeed}s forward`,
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let initGoal = q_s(`video#${currentId}`).currentTime;
        let goalTime = initGoal + frwSpeed;

        q_s(`video#${currentId}`).currentTime = goalTime;

        frwrdIconShow(`${frwSpeed}s`);
      }
    },
  },
  {
    case: "ArrowLeft",
    press: "Arrow Left",
    for: `${frwSpeed}s backward`,
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let initGoal = q_s(`video#${currentId}`).currentTime;
        let goalTime = initGoal - frwSpeed;

        q_s(`video#${currentId}`).currentTime = goalTime;

        bkwrdIconShow(`${frwSpeed}s`);
      }
    },
  },
  {
    case: "Shift" && ">",
    press: "Shift & >",
    for: "speed up",
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let vd = q_s(`video#${currentId}`);

        if (vd.playbackRate < 2) {
          vd.playbackRate += 0.25;

          arClass(vd.playbackRate);
        } else {
          arClass(vd.playbackRate);
        }
      }
    },
  },
  {
    case: "Shift" && "<",
    press: "Shift & <",
    for: "speed down",
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let vd = q_s(`video#${currentId}`);

        if (vd.playbackRate > 0.25) {
          vd.playbackRate -= 0.25;

          arClass(vd.playbackRate);
        } else {
          arClass(vd.playbackRate);
        }
      }
    },
  },
  {
    case: "Shift" && "?",
    press: "Shift & ?",
    for: "shortcut panel",
    f: (e) => {
      e.preventDefault();

      let srtC_ = q_s(".shortCutShow");

      if (get_css(srtC_, "visibility") === "hidden") {
        _css(srtC_, {
          visibility: "visible",
        });
      } else {
        _css(srtC_, {
          visibility: "hidden",
        });
      }
    },
  },
  {
    case: "ArrowUp",
    press: "Arrow Up",
    for: "volume up",
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let vd = q_s(`video#${currentId}`);

        if (vd.volume < 1 && vd.volume >= 0) {
          v_arClass((vd.volume += 0.1));
        } else {
          v_arClass(vd.volume);
        }
      }
    },
  },
  {
    case: "ArrowDown",
    press: "Arrow Down",
    for: "volume down",
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let vd = q_s(`video#${currentId}`);

        if (vd.volume <= 1 && vd.volume > 0.1) {
          v_arClass((vd.volume -= 0.1));
        } else {
          v_arClass(vd.volume);
        }
      }
    },
  },
  {
    case: "f",
    press: "f",
    for: "full screen mode",
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let vd = q_s(`video#${currentId}`);

        if (vd.requestFullscreen) {
          vd.requestFullscreen();
        }
      }
    },
  },
  {
    case: "m",
    press: "m",
    for: "mute toggle",
    f: (e) => {
      e.preventDefault();

      if (currentId !== undefined) {
        let vd = q_s(`video#${currentId}`);

        if (vd.muted) {
          vd.muted = false;

          muteShow(vd.muted);
        } else {
          vd.muted = true;

          muteShow(vd.muted);
        }
      }
    },
  },
];
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

                  playIconShow();

                  a.style["color"] = playColor;
                } else if (!q_s(`video#${vd.id}`).paused) {
                  currentPlay = false;

                  vd.pause();

                  pauseIconShow();

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
            vd.parentNode.remove();

            q_s(`#a_${vd.id}`).remove();
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

        //remove class
        r_class(q_s(".Open_File_3"), "pauseTimerCOLOR");
        r_class(q_s(".Open_File_3"), "playTimerCOLOR");
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
  {
    q_s: q_s(".Open_File_4"),
    ev: "click",
    f_: () => {
      _css(q_s(".gotoBX"), {
        visibility: "visible",
      });
    },
  },
  {
    q_s: q_s(CancelButton3),
    ev: "click",
    f_: () => {
      _css(q_s(".gotoBX"), {
        visibility: "hidden",
      });
    },
  },
  {
    q_s: q_s(clearButton2),
    ev: "click",
    f_: () => {
      q_s("#setTime3").value = "";
      q_s("#setTime4").value = "";
      q_s("#setTime5").value = "";

      q_s(CancelButton3).click();
    },
  },
  {
    q_s: q_s(YesButton3),
    ev: "click",
    f_: () => {
      if (
        !isNaN(q_s("#setTime3").value) &&
        !isNaN(q_s("#setTime4").value) &&
        !isNaN(q_s("#setTime5").value)
      ) {
        let numVAL3 = Number(q_s("#setTime3").value);
        let numVAL4 = Number(q_s("#setTime4").value);
        let numVAL5 = Number(q_s("#setTime5").value);

        if (numVAL3 >= 0 && numVAL4 >= 0 && numVAL5 >= 0) {
          q_s(CancelButton3).click();

          let hTOs = 60 * 60 * numVAL3;
          let mTOs = 60 * numVAL4;
          let totalS = Number(hTOs + mTOs + numVAL5);

          q_s(`video#${currentId}`).currentTime = totalS;
        }
      }
    },
  },
  {
    q_s: window,
    ev: "keyup",
    f_: (e) => {
      for (let i = 0; i < casesArr.length; i++) {
        const cn = casesArr[i];

        if (e.key === cn["case"]) {
          cn["f"](e);

          break;
        }
      }
    },
  },
  {
    q_s: window,
    ev: "mousemove",
    f_: (e) => {
      let ln_ = qa_s(".ul_ li a").length;
      let btnH =
        q_s(".Open_File_1").offsetTop + q_s(".Open_File_1").clientHeight;

      if (e.clientY <= q_s(".ul_").clientHeight + btnH) {
        if (ln_ !== 0) {
          mouseOvered = 1;

          do_hidden_false();
        }
      } else {
        mouseOvered = 0;

        do_hidden_true();
      }
    },
  },
  {
    q_s: q_s(".Open_File_5"),
    ev: "click",
    f_: () => {
      let d_actv = q_s(".Open_File_5").dataset.active;
      let actv = Number(d_actv);

      if (actv === 0) {
        btnListShow();
      } else {
        btnListHide();
      }
    },
  },
  {
    q_s: q_s(".shortCutShow"),
    ev: "click",
    f_: () => {
      _css(q_s(".shortCutShow"), {
        visibility: "hidden",
      });
    },
  },
];
//initArr
EVhandlersARR.forEach((arr) => {
  on_(arr.q_s, arr.ev, arr.f_);
});

//init
ckeckID_Time(100);
shortCut_init(casesArr);
q_s(".Open_File_5").click();

let hl_ = q_s("html"),
  cn_ = q_s(".videoPlayerContainer"),
  _u = q_s(".ul_");

dropVideo_intoPlayer_plugIn(hl_, cn_, _u, do_hidden_false);

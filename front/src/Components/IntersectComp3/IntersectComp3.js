import Style from "./IntersectComp3.module.css";
import React, { useEffect, useState, useRef } from "react";

export default function IntersectComp3() {
  let cardOb = [{ img: "/static/calendar2.png", desc: "desc11" },
  { img: "/static/clipboard.png", desc: "desc12" },
  { img: "/static/data-assessment.png", desc: "desc13" }
  ]
  const [timerObj, setTimerObj] = useState({
    time1: 0,
    time2: 0,
    time3: 0,
  });

  const [truTimer, setTrueTimer] = useState({
    time1: null,
    time2: null,
    time3: null,
  });

  const ref = useRef(null);

  const opt = {
    threshold: 0.5,
  };

  function obstMain(time, total, unit, el1) {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!timerObj[time]) {
            setTimeout(() => {
              el1.classList.add("CardCon1")
              const interval = setInterval(() => {
                setTimerObj((prev) => {
                  if (prev[time] >= total) {
                    clearInterval(interval);
                    return prev;
                  } else {
                    return {
                      ...prev,
                      [time]: prev[time] + 1,
                    };
                  }
                });
              }, 10);

              setTrueTimer((prev) => ({
                ...prev,
                [time]: interval,
              }));
            }, unit);

            observer.unobserve(entry.target);
          }
        }
      });
    }, opt);
  }

  useEffect(() => {
    const children = ref.current.children;

    const obs1 = obstMain("time1", 130, 0, children[0]);
    const obs2 = obstMain("time2", 250, 500, children[1]);
    const obs3 = obstMain("time3", 70, 1500, children[2]);

    obs1.observe(children[0]);
    obs2.observe(children[1]);
    obs3.observe(children[2]);

    return () => {
      obs1.disconnect();
      obs2.disconnect();
      obs3.disconnect();
    };
  }, []);

  return (
    <div className={Style.IntersectComp3Container} ref={ref}>

      {Object.keys(timerObj).map((key, i) => (

        <div className={Style.CardCon} key={key}>

          <div className={Style.IconCard}>
            <img src={cardOb[i].img} alt="" />
          </div>

          <span className={Style.CardLabel}>
            {cardOb[i].title}
          </span>

          <p>{timerObj[key]}</p>

          <small>
            Impacto positivo gerado pela comunidade
          </small>

        </div>

      ))}

    </div>
  );
}
/*
import Style from "./IntersectComp3.module.css"
import React from "react"
import { useEffect, useState, useRef } from "react"
export default function IntersectComp3() {
    let [timerObj, setTimerObj] = useState({ time1: 0, time2: 0, time3: 0 })
    let [truTimer, setTrueTimer] = useState({ time1: null, time2: null, time3: null })
    let ref = useRef()
    let opt = {
        threshold: 0.5
    }
    let obf = (entry, observe) => {
        entry.forEach((el, i) => {
            if (el.isIntersecting) {
                observe.unobserve()
            }
        })
    }
    function obstMain(time, obj1, tot, unit) {
        return new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!timerObj[time]) {
                        setTimeout(() => {
                            let interval = setInterval(() => {
                                setTimerObj(prev => {
                                    if (prev[time] >= tot) {
                                        clearInterval(interval)
                                        return prev[time]
                                    } else {
                                        let obj = { ...prev }
                                        obj[time] += 1
                                        return obj
                                    }

                                })
                            }, 10)
                            let obj = truTimer
                            setTrueTimer(prev => ({ ...prev, obj[time]: interval }))
                        }, 500 * unit)
                    }
                }
            })
        })
    }
    useEffect(() => {
        let chil1 = ref.current.children[0]
        let chil2 = ref.current.children[1]
        let chil3 = ref.current.children[2]
        let obs = obstMain("time1", chil1, 20, 1)
        let obs = obstMain("time1", chil1, 20, 2)
        let obs = obstMain("time1", chil1, 20, 3)

        obs.observe(chil1);
        obs.observe(chil2);
        obs.observe(chil3);
        //let obs = new IntersectionObserver(obf,opt)
        //obs.observe(chil1);
    }, [])
    return (
        <div className={Style.IntersectComp3Container} ref={ref}>
            {timerObj.map((el, i) => {
                return <div className={Style.CardCon}>
                    <img src="/logo/biohazard-sign.png"></img>
                    <p>{timerObj[`time${i}`]}</p>
                </div>
            })

            }
        </div>
    )
}*/
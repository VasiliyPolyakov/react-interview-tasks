import React, {useEffect, useRef, useState} from "react";
import "./AgendaSession.css";
import {Types} from "../../App";

export interface AgendaSessionProps {
  content: {
    labels: string;
    type: keyof typeof Types;
    title: string;
    description: string;
    showDescription: boolean;
    showSpeakers: boolean;
    duration: number;
    relativeHeightOnGridView: number;
    enabled: boolean;
    index: number;
    speakers: {
      name: string;
      jobTitle: string;
      id: string;
    }[];
  };
  clickSessionHandler: (param: string) => void;
  sessionsIndexMap: Record<number, string>;
}

export default function AgendaSession({
                                        sessionsIndexMap,
                                        content,
                                        clickSessionHandler,
                                      }: AgendaSessionProps) {
  const mainItemRef = useRef<HTMLDivElement>(null);
  const [itemTruncated, setItemTruncated] = useState(false);
  const [itemHeight, setItemHeight] = useState(getItemHeight());
  const [specificItemClass, setSpecificItemClass] = useState("");

  useEffect(() => {
    getItemStyles();
    window.addEventListener("resize", getItemStyles);
  }, []);

  function getItemHeight(): number {
    const {duration, relativeHeightOnGridView, type} = content || {};
    const scaleFactor = duration < 5 ? 8 : 6;

    return type === "FULL" && relativeHeightOnGridView
        ? duration * scaleFactor - 5 + relativeHeightOnGridView
        : 55;
  }

  function getItemStyles() {
    const {type, duration} = content || {};
    const mainItemRefCurrent = mainItemRef.current;

    if (mainItemRefCurrent) {
      const itemContentWrapperHeight =
          mainItemRefCurrent.children[0].clientHeight;

      setItemHeight(getItemHeight());
      setItemTruncated(itemContentWrapperHeight > itemHeight);
      setSpecificItemClass(
          type === "FULL" && duration < 5 && itemTruncated
              ? `shortest-main-agenda-item shortest-main-agenda-item--${duration}`
              : ""
      );
    }
  }

  function sessionClick() {
    const {type, enabled, index} = content || {};
    const session = sessionsIndexMap[index];

    if (
        type !== "SHORT" &&
        enabled &&
        typeof clickSessionHandler === "function" &&
        session !== undefined
    ) {
      clickSessionHandler(session);
    }
  }

  const {
    labels = "",
    type,
    title,
    showDescription,
    description = "",
    showSpeakers,
    speakers = [],
  } = content || {};

  const isFreeItem = labels.indexOf("Free") >= 0;
  const sessionHeight = type === "DEFAULT" ? "auto" : itemHeight;
  const speakersToRender = speakers.filter(Boolean);

  return (
      <div
          className={`c-agenda-main-item c-agenda-main-item-${type} ${
              itemTruncated ? "truncated" : ""
          } ${specificItemClass}`}
          ref={mainItemRef}
          style={{height: sessionHeight}}
          onClick={sessionClick}
      >
        <div className="c-agenda-stream-item-inner">
          <div className="agenda-item-heading">
            <div>
              {type === "FULL" ? (
                  <div>Full session</div>
              ) : type === "SHORT" ? (
                  <div>Short Session</div>
              ) : (
                  <div>Session</div>
              )}
            </div>
            {isFreeItem && <span className="agenda-item-free-label">Free</span>}
            <div className="agenda-item-title">{title}</div>
          </div>

          {showDescription && description.length && (
              <div className="row agenda-item-description">{description}</div>
          )}

          <div className="agenda-item-speakers">
            <div>List of Speakers:</div>
            {showSpeakers &&
                speakersToRender.length &&
                speakersToRender.map(({name, jobTitle}, index) => {
                  return (
                      <div key={index} className="agenda-item-speakers__item">
                        <div>{name}</div>
                        <div>{jobTitle}</div>
                      </div>
                  );
                })}
          </div>
        </div>
      </div>
  );
}

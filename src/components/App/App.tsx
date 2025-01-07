import React from "react";
import AgendaSession from "../AgendaSessions/AgendaSession";
import "./App.css";

export enum Types {
  FULL = "FULL",
  SHORT = "SHORT",
  DEFAULT = "DEFAULT",
}

const content = {
  labels: "Session 1",
  type: Types.FULL,
  title: "Session to all",
  showDescription: true,
  description: "Lorem ipsum dolor sit amet.",
  showSpeakers: true,
  speakers: [
    {
      name: "Joe",
      jobTitle: "CEO of TTM",
      id: "CEO of TTM",
    },
    {
      name: "Rick",
      jobTitle: "CEO of TTM",
      id: "CEO of TTM",
    },
  ],
  duration: 11,
  relativeHeightOnGridView: 110,
  enabled: false,
  index: 1,
};

const sessionIndexMapStringType = {
  1: "1",
  2: "2",
};

const sessionIndexMapObjectType = {
  1: { id: "1" },
  2: { id: "2" },
};

const sessionIndexMapArrayType = {
  1: ['1'],
  2: ['2'],
};

function App() {
  return (
    <div className="App">
      <AgendaSession
        content={content}
        sessionsIndexMap={sessionIndexMapStringType}
        clickSessionHandler={() => {}}
      />
    </div>
  );
}

export default App;

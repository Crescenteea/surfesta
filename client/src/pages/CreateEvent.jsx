import React, { useState } from "react";
import "./createevent.scss";
import EventForm from "../components/template/createEvent/EventForm";
// import useAuth from '../utils/useAuth';
import RouteLeavingGuard from "../components/organism/createEvent/RouteLeavingGuard";
import { useEffect } from "react";

export default function CreateEvent({ history }) {
  // useAuth();
  const [whenState, updateWhenState] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <RouteLeavingGuard
        when={whenState}
        navigate={(path) => {
          history.push(path);
        }}
        shouldBlockNavigation={(location) => {
          if (whenState) {
            return true;
          }
          return false;
        }}
        yes="확인"
        no="취소"
        contentTop={"이 페이지를 벗어나면"}
        contentBottom={"정성스럽게 작성한 글이 날아가요."}
      />
      <div className="create-event-wrap">
        <div className="w1440-container">
          <EventForm />
        </div>
      </div>
    </>
  );
}

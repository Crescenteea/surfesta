import React, { useState } from "react";
import "./createevent.scss";
import EventForm from "../components/template/createEvent/EventForm";
// import useAuth from '../utils/useAuth';
import RouteLeavingGuard from "../components/organism/createEvent/RouteLeavingGuard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function CreateEvent({ history }) {
  const [whenState, updateWhenState] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useAuth()
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Redirect to="/" />;

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

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GoogleMapReact from "google-map-react";

import styles from "./styles.module.scss";

import { save_cords_AC } from "~/store/reducers/actions";

import Container from "@components/Container";
import SelectGeo from "./components/select";
import Dashboard from "./components/dashboard";
import LoadingGeo from "./components/loadingGeo";
import AcceptGeo from "./components/acceptGeo";

import wetherKey from "~/../weatherKey";

function FindGeo() {
  const [loading, setLoading] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [positionStatus, setPositionStatus] = useState(null);
  const [geoCoord, setGeoCoord] = useState({
    lat: null,
    lng: null,
    accept: null,
  });

  const positionStore = useSelector((state) => state.currentPossition);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    if (!positionStore.id) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoCoord({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accept: true,
          });
          setTimeout(() => {
            setLoading(null);
          }, 3000);
          setPositionStatus("accept");
        },
        (error) => {
          setPositionStatus("reject");
          setTimeout(() => {
            setLoading(null);
          }, 3000);
          console.log("ERROR GEOLOCATION: ", error);
        },
        {
          timeout: 5000,
          //   maximumAge: 30000,
          enableHighAccuracy: false,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (geoCoord.accept) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoCoord.lat}&lon=${geoCoord.lng}&appid=${wetherKey}`
      )
        .then((res) => res.json())
        .then((res) => dispatch(save_cords_AC(res)))
        .catch((error) => {
          setPositionStatus("reject");
          console.log("FETCH ERROR COORD: ", error);
        });
    }
  }, [geoCoord.accept]);

  function rejectCity() {
    setPositionStatus("reject");
  }

  function redirectTo(position = {}) {
    if (Object.keys(position).length > 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${position.id}&appid=${wetherKey}`
      )
        .then((res) => res.json())
        .then((res) => {
          dispatch(save_cords_AC(res));
          history.push("/home");
        })
        .catch((error) => {
          setErrorStatus(true);
          console.log("FETCH ERROR ID: ", error);
        });
    } else {
      history.push("/home");
    }
  }

  return (
    <div className={styles.bg}>
      <Container>
        <div className={styles.window}>
          <Dashboard />
          {loading && <LoadingGeo />}
          {!errorStatus &&
            !loading &&
            positionStatus === "accept" &&
            positionStore.id && (
              <AcceptGeo
                city={positionStore.name}
                reject={rejectCity}
                redirectTo={redirectTo}
              />
            )}
          {!errorStatus && !loading && positionStatus === "reject" && (
            <SelectGeo redirectTo={redirectTo} />
          )}
          {errorStatus && <div> Error </div>}
        </div>
      </Container>
    </div>
  );
}

export default FindGeo;

import axios from "axios";
import {
  GET_LOCATIONS,
  ADD_LOCATION,
  DELETE_LOCATION,
  LOCATIONS_LOADING,
} from "./types";

export const getLocations = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/locations")

    .then((res) =>
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data,
      })
    );
};

export const addLocation = (location) => (dispatch) => {
  axios.post("/api/locations", location).then((res) =>
    dispatch({
      type: ADD_LOCATION,
      payload: res.data,
    })
  );
};

export const deleteLocation = (id) => (dispatch) => {
  axios.delete(`/api/locations/${id}`).then((res) =>
    dispatch({
      type: DELETE_LOCATION,
      payload: id,
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: LOCATIONS_LOADING,
  };
};

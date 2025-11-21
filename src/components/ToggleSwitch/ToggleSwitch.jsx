import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { useLocation } from "react-router-dom";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <label
      className={`toggle-switch ${
        isProfilePage ? "toggle-switch--hidden" : ""
      }`}
    >
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTemperatureUnit === "C"}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          currentTemperatureUnit === "F"
            ? `toggle-switch__text_color-white`
            : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          currentTemperatureUnit === "C"
            ? `toggle-switch__text_color-white`
            : ""
        }`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;

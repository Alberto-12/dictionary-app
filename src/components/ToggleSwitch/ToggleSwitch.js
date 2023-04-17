import "./ToggleSwitch.css";
import MoonIcon from '../../assets/images/icon-moon.svg';

const ToggleSwitch = ({ darkMode, onToggle}) => {
  const toggleSwitch = () => {
    onToggle();  
  };

  return (
      <div id="toggle-container">
    <div className={`toggle-switch ${darkMode ? 'on' : 'off'}`} onClick={toggleSwitch}>
      <div className="toggle-switch-handle" />
    </div>
    <img src={MoonIcon} alt="Moon Icon"/>
    </div>
  );
};

export default ToggleSwitch;